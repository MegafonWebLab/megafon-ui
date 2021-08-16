import * as React from 'react';

export interface ITabProps {
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
export default Tab;
