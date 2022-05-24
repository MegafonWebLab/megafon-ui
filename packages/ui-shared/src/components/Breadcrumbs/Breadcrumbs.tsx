import React from 'react';
import { TextLink } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './Breadcrumbs.less';

type ItemObjectType = {
    title?: string;
    href?: string;
    /* @deprecated */
    component?: React.ReactElement;
};

type ItemType = JSX.Element | ItemObjectType;

export const TextColor = {
    DEFAULT: 'default',
    BLACK: 'black',
    WHITE: 'white',
} as const;

type TextColorType = typeof TextColor[keyof typeof TextColor];

export type Props = {
    dataAttrs?: {
        root?: Record<string, string>;
        link?: Record<string, string>;
    };
    className?: string;
    classes?: { item?: string };
    items: ItemType[];
    color?: TextColorType;
};

function isObjectElement(item: ItemType): item is ItemObjectType {
    return !React.isValidElement(item);
}

function isJSXElement(item: ItemType): item is JSX.Element {
    return React.isValidElement(item);
}

const cn = cnCreate('mfui-breadcrumbs');
const Breadcrumbs: React.FC<Props> = ({ items, color = 'default', className, classes = {}, dataAttrs }) => (
    <div {...filterDataAttrs(dataAttrs?.root)} className={cn({ color }, className)}>
        {items.map((item: ItemType, i: number): JSX.Element | null => {
            if (isJSXElement(item)) {
                return (
                    <div className={cn('item', classes.item)} key={i}>
                        {item}
                    </div>
                );
            }

            if (isObjectElement(item)) {
                return (
                    <div className={cn('item', classes.item)} key={item.component ? i : item.title}>
                        {item.component || (
                            <TextLink
                                href={item.href}
                                color={color}
                                dataAttrs={{
                                    root: dataAttrs?.link ? { ...filterDataAttrs(dataAttrs?.link, i + 1) } : undefined,
                                }}
                            >
                                {item.title}
                            </TextLink>
                        )}
                    </div>
                );
            }

            return null;
        })}
    </div>
);

Breadcrumbs.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        link: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
    classes: PropTypes.shape({
        item: PropTypes.string,
    }),
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element.isRequired),
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                href: PropTypes.string,
                /* @deprecated */
                component: PropTypes.element,
            }).isRequired,
        ),
    ]).isRequired,
    color: PropTypes.oneOf(Object.values(TextColor)),
};

export default Breadcrumbs;
