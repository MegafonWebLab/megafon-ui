/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import { IFilterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';

export interface ITabProps extends IFilterDataAttrs {
    /** Заголовок таба */
    title?: string;
    /** Иконка таба */
    icon?: React.ReactNode;
    /** Ссылка */
    href?: string;
    /** Функция рендера компонента-обертки для заголовка и иконки */
    renderTabWrapper?: (tab: React.ReactNode) => React.ReactNode;
}

const Tab: React.FC<ITabProps> = ({ children }) => <>{children}</>;

Tab.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    href: PropTypes.string,
    renderTabWrapper: PropTypes.func,
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
};

export default Tab;
