/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';

export interface ITabProps {
    /** Заголовок таба */
    title?: string;
    /** Иконка таба */
    icon?: React.ReactNode;
    /** Ссылка */
    href?: string;
    /** Rel - атрибут тега <a> */
    rel?: string;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        inner?: Record<string, string>;
    };
    /** Дочерние элементы */
    children?: React.ReactNode;
    /** Функция рендера компонента-обертки для заголовка и иконки */
    renderTabWrapper?: (tab: React.ReactNode) => React.ReactNode;
}

const Tab: React.FC<ITabProps> = ({ children }) => <>{children}</>;

Tab.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        inner: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    title: PropTypes.string,
    icon: PropTypes.node,
    href: PropTypes.string,
    rel: PropTypes.string,
    renderTabWrapper: PropTypes.func,
};

export default Tab;
