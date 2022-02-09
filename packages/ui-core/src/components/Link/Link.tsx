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
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element | React.ReactNode;
    /** Обработчик клика */
    onClick?: (e: React.MouseEvent<EventTarget>) => void;
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
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    rel: PropTypes.string,
    download: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Link;
