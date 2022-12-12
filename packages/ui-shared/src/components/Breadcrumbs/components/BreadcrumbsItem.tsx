import React from 'react';
import { TextLink } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './BreadcrumbsItem.less';

export const TextColor = {
    DEFAULT: 'default',
    BLACK: 'black',
    WHITE: 'white',
} as const;

type TextColorType = typeof TextColor[keyof typeof TextColor];

export type Props = {
    title?: string;
    href?: string;
    color?: TextColorType;
    index?: number;
    isLastItem?: boolean;
    hasMicrodata?: boolean;
    classes?: {
        link?: string;
        itemTitle?: string;
        lastItemTitle?: string;
    };
    dataAttrs?: {
        root?: Record<string, string>;
        link?: Record<string, string>;
        itemTitle?: Record<string, string>;
        meta?: Record<string, string>;
    };
};

const cn = cnCreate('mfui-breadcrumbs-item');
const BreadcrumbsItem: React.FC<Props> = ({
    title,
    href,
    color,
    index = 0,
    isLastItem = false,
    hasMicrodata = false,
    classes,
    dataAttrs,
}) => {
    if (isLastItem) {
        return (
            <div className={cn({ color })} {...filterDataAttrs(dataAttrs?.root, index + 1)}>
                <span className={classes?.lastItemTitle} {...filterDataAttrs(dataAttrs?.itemTitle, index + 1)}>
                    {title}
                </span>
            </div>
        );
    }

    return (
        <div
            className={cn()}
            {...filterDataAttrs(dataAttrs?.root, index + 1)}
            {...(hasMicrodata && {
                itemScope: true,
                itemProp: 'itemListElement',
                itemType: 'https://schema.org/ListItem',
            })}
        >
            <TextLink
                className={classes?.link}
                href={href}
                color={color}
                dataAttrs={{
                    root: dataAttrs?.link ? { ...filterDataAttrs(dataAttrs?.link, index + 1) } : undefined,
                }}
                itemProp={hasMicrodata ? 'item' : undefined}
            >
                <span
                    className={classes?.itemTitle}
                    {...filterDataAttrs(dataAttrs?.itemTitle, index + 1)}
                    {...(hasMicrodata && { itemProp: 'name' })}
                >
                    {title}
                </span>
            </TextLink>
            {hasMicrodata && (
                <meta
                    {...filterDataAttrs(dataAttrs?.meta, index + 1)}
                    itemProp="position"
                    content={String(index + 1)}
                />
            )}
        </div>
    );
};

BreadcrumbsItem.propTypes = {
    title: PropTypes.string,
    href: PropTypes.string,
    color: PropTypes.oneOf(Object.values(TextColor)),
    index: PropTypes.number,
    isLastItem: PropTypes.bool,
    hasMicrodata: PropTypes.bool,
    classes: PropTypes.shape({
        link: PropTypes.string,
        itemTitle: PropTypes.string,
        lastItemTitle: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string),
        link: PropTypes.objectOf(PropTypes.string),
        itemTitle: PropTypes.objectOf(PropTypes.string),
        meta: PropTypes.objectOf(PropTypes.string),
    }),
};

export default BreadcrumbsItem;
