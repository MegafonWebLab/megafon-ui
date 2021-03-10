import * as React from 'react';
import PropTypes from 'prop-types';
import { cnCreate, Header } from '@megafon/ui-core';
import './Steps.less';

export interface ISteps {
    /** Заголовок */
    title: string;
}

const cn = cnCreate('mfui-beta-steps');
const Steps: React.FC<ISteps> = ({ title, children }) => (
    <div className={cn()}>
        <Header as="h2" hAlign="center" className={cn('title')}>{title}</Header>
        <ul className={cn('list')}>
            {React.Children.map(children, (child) => (
                <li className={cn('item')}>
                    {child}
                </li>
            ))}
        </ul>
    </div>
);

Steps.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Steps;
