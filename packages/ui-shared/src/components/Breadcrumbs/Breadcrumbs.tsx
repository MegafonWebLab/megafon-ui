import React from 'react';
import PropTypes from 'prop-types';
import { cnCreate , TextLink } from '@megafon/ui-core';
import './Breadcrumbs.less';
import Color, { ColorType } from '../../constants/colors';

type ItemType = {
    title: string;
    href: string;
};

export type Props = {
    className?: string;
    items: ItemType[];
    color?: ColorType;
};

const getColorForLink = (color: ColorType) => {
    switch (color) {
        case Color.CLEAR_WHITE: {
            return 'white';
        }

        case Color.FRESH_ASPHALT:
        default: {
            return 'black';
        }
    }
};

const cn = cnCreate('mfui-beta-breadcrumbs');
const Breadcrumbs: React.FC<Props> = ({ items, color = Color.FRESH_ASPHALT, className }) => (
    <div className={cn({ color }, className)}>
        {items.map(({ title, href }) => (
            <div className={cn('item')} key={title}>
                <TextLink href={href} color={getColorForLink(color)}>
                    {title}
                </TextLink>
            </div>
        ))}
    </div>
);

Breadcrumbs.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    color: PropTypes.oneOf(Object.values(Color)),
};

export default Breadcrumbs;
