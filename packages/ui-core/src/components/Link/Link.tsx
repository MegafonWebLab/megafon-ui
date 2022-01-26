import React from 'react';
import { filterDataAttrs, IFilterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';

export interface ILinkProps extends IFilterDataAttrs {
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

const Link: React.FC<ILinkProps> = ({ target, href, rel, onClick, className, download, children, dataAttrs }) => (
    <a
        className={className}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        download={download}
        {...filterDataAttrs(dataAttrs)}
    >
        {children}
    </a>
);
Link.propTypes = {
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

export default Link;
