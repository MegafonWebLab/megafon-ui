import * as React from 'react';
import PropTypes from 'prop-types';
import convert from 'htmr';
import './style/BenefitsIconsTile.less';
import { Header, Paragraph, cnCreate } from '@megafon/ui-core';
import { IBenefit, IconPositionEnum, IconPosition } from './types';

export interface IBenefitsIconsTile extends IBenefit {
    iconPosition?: IconPosition;
}

const cn = cnCreate('mfui-beta-benefits-icons-tile');
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
                <Paragraph className={cn('text')} hasMargin={false}>
                    {convert(text)}
                </Paragraph>
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
