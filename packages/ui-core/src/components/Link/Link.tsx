import React from 'react';
import { filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';

export interface ILinkProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Ссылка */
    href?: string;
    /** target - аргумент тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** rel - аргумент тега <a> */
    rel?: string;
    /** Добавление атрибута download */
    download?: boolean;
    /** Дата атрибуты для элемента */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    /** Обработчик клика */
    onClick?: (e: React.MouseEvent<EventTarget>) => void;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element | React.ReactNode;
}

const Link: React.FC<ILinkProps> = ({ target, href, rel, onClick, className, download, children, dataAttrs }) => (
    <a
        className={className}
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
        {...filterDataAttrs(dataAttrs?.root)}
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
