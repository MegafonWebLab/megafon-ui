import React from 'react';
import PropTypes from 'prop-types';
import { cnCreate , TextLink } from '@megafon/ui-core';
import './Breadcrumbs.less';

type ItemType = {
    title: string;
    href?: string;
};

export const TextColor = {
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

const cn = cnCreate('mfui-beta-breadcrumbs');
const Breadcrumbs: React.FC<Props> = ({ items, color = 'black', className, classes = {} }) => (
    <div className={cn({ color }, className)}>
        {items.map(({ title, href }) => (
            <div className={cn('item', classes.item)} key={title}>
                <TextLink href={href} color={color}>
                    {title}
                </TextLink>
            </div>
        ))}
    </div>
);

Breadcrumbs.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.shape({
        item: PropTypes.string,
    }),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            href: PropTypes.string,
        }).isRequired
    ).isRequired,
    color: PropTypes.oneOf(Object.values(TextColor)),
};

export default Breadcrumbs;
