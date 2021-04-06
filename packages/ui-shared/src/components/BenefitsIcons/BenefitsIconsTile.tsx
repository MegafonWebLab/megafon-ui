import * as React from 'react';
import PropTypes from 'prop-types';
import convert from 'htmr';
import './style/BenefitsIconsTile.less';
import {
    List,
    Header,
    cnCreate,
    TextLink,
    ListItem,
    Paragraph,
    convert as htmlToReactComponent
} from '@megafon/ui-core';
import { IBenefit, IconPositionEnum, IconPosition } from './types';

export interface IBenefitsIconsTile extends IBenefit {
    iconPosition?: IconPosition;
}

const cn = cnCreate('mfui-beta-benefits-icons-tile');

const typographyConfig = {
    ul: {
        component: List,
        props: ['as', 'weight', 'color'],
    },
    li: {
        component: ListItem,
    },
    p: {
        component: Paragraph,
        props: ['color'],
        className: cn('text'),
    },
    a: {
        component: TextLink,
        props: ['href', 'target'],
    },
    b: {
        component: ({ children, className }) => <b className={className}>{children}</b>,
    },
    span: {
        component: ({ children, className }) => <span className={className}>{children}</span>,
    },
};

const BenefitsIconsTile: React.FC<IBenefitsIconsTile> = ({
    title,
    text,
    icon,
    iconPosition = IconPositionEnum.LEFT_TOP,
}) => (
    <div className={cn('', { 'icon-position': iconPosition })}>
        <div className={cn('svg-icon')}>{icon}</div>
        <div className={cn('content-wrapper')}>
            {title && (
                <Header className={cn('title')} as="h5">
                    {convert(title)}
                </Header>
            )}
            {text && (
                <div className={cn('content')}>
                    {htmlToReactComponent(text, typographyConfig)}
                </div>
            )}
        </div>
    </div>
);

BenefitsIconsTile.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    iconPosition: PropTypes.oneOf(Object.values(IconPositionEnum)),
    icon: PropTypes.node,
};

export default BenefitsIconsTile;
