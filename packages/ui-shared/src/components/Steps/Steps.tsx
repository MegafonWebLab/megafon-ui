/* eslint-disable import/no-unresolved */
import { Header } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import * as React from 'react';
import './Steps.less';

export interface ISteps {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Заголовок */
    title: string;
}

const cn: (param1?: string) => string = cnCreate('mfui-beta-steps');
const Steps: React.FC<ISteps> = ({ title, rootRef, children }) => (
    <div className={cn()} ref={rootRef}>
        <Header as="h2" hAlign="center" className={cn('title')}>
            {title}
        </Header>
        <ul className={cn('list')}>
            {React.Children.map(children, child => (
                <li className={cn('item')}>{child}</li>
            ))}
        </ul>
    </div>
);

Steps.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    title: PropTypes.string.isRequired,
};

export default Steps;
