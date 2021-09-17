import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ILinkProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Ссылка */
    href?: string;
    /** target - аргумент тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** rel - аргумент тега <a> */
    rel?: string;
    /** Обработчик клика */
    onClick?: (e: React.MouseEvent<EventTarget>) => void;
    /** Добавление атрибута download */
    download?: boolean;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element | React.ReactNode;
}

class Link extends React.Component<ILinkProps, {}> {
    static propTypes = {
        href: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
        target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
        className: PropTypes.string,
        rel: PropTypes.string,
        onClick: PropTypes.func,
        download: PropTypes.bool,
    };

    render() {
        return <a {...this.props} />;
    }
}

export default Link;
