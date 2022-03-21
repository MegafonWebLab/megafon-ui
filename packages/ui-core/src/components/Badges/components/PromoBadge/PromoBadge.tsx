import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './PromoBadge.less';

export const PromoBadgeTypes = {
    HIT: 'hit',
    NEW: 'new',
    VIP: 'vip',
    POPULAR: 'popular',
    USER_CHOICE: 'user-choice',
} as const;

type PromoBadgeTypesType = typeof PromoBadgeTypes[keyof typeof PromoBadgeTypes];

export interface IPromoBadgeProps {
    /** Тип промо-бэйджа */
    type?: PromoBadgeTypesType;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные data-атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    children: JSX.Element[] | Element[] | JSX.Element | Element | string;
}

const cn = cnCreate('mfui-promo-badge');
const PromoBadge: React.FC<IPromoBadgeProps> = ({ type = 'hit', className, children, dataAttrs }) => (
    <div {...filterDataAttrs(dataAttrs?.root)} className={cn({ type }, className)}>
        <span className={cn('text')}>{children}</span>
    </div>
);

PromoBadge.propTypes = {
    type: PropTypes.oneOf(Object.values(PromoBadgeTypes)),
    className: PropTypes.string,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element.isRequired),
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
};

export default PromoBadge;
