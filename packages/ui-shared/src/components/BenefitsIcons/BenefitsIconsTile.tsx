import * as React from 'react';
import { Header } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import { IBenefit, IconPositionEnum, IconPosition } from './types';
import './style/BenefitsIconsTile.less';

export interface IBenefitsIconsTile extends IBenefit {
    iconPosition?: IconPosition;
    className?: string;
}

const cn = cnCreate('mfui-benefits-icons-tile');
const BenefitsIconsTile: React.FC<IBenefitsIconsTile> = ({
    title,
    text,
    icon,
    iconPosition = IconPositionEnum.LEFT_TOP,
    className,
}) => (
    <div className={cn({ 'icon-position': iconPosition }, [className])}>
        <div className={cn('svg-icon')}>{icon}</div>
        <div className={cn('content-wrapper')}>
            {title && (
                <Header className={cn('title')} as="h5">
                    {title}
                </Header>
            )}
            {text && <div className={cn('content')}>{text}</div>}
        </div>
    </div>
);

BenefitsIconsTile.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    iconPosition: PropTypes.oneOf(Object.values(IconPositionEnum)),
    icon: PropTypes.node.isRequired,
};

export default BenefitsIconsTile;
