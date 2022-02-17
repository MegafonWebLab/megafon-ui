import React from 'react';
import { TextLink } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
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
const Breadcrumbs: React.FC<Props> = ({ items, color = 'black', className, classes = {} }) => (
    <div className={cn({ color }, className)}>
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
                            <TextLink href={item.href} color={color}>
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
