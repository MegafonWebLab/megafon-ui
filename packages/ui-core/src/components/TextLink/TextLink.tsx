import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './TextLink.less';
import Link, { ILinkProps } from '../Link/Link';

export interface ITextLinkProps extends ILinkProps {
    /** Цвет */
    color?: 'default' | 'white' | 'black' | 'gray' | 'green' | 'blue' | 'inherit';
    /** Отображение подчеркивания */
    underlineVisibility?: 'hover' | 'always';
    /** Стиль подчеркивания */
    underlineStyle?: 'solid' | 'dashed' | 'border' | 'none';
    /** Атрибут itemprop для микроразметки */
    itemProp?: string;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element | React.ReactNode;
}

const cn = cnCreate('mfui-text-link');
const TextLink: React.FC<ITextLinkProps> = ({
    underlineVisibility = 'hover',
    underlineStyle = 'solid',
    color = 'blue',
    className,
    target,
    href,
    rel,
    onClick,
    children,
    download,
    dataAttrs,
    itemProp,
}) => (
    <Link
        dataAttrs={dataAttrs}
        target={target}
        href={href}
        rel={rel}
        itemProp={itemProp}
        onClick={onClick}
        className={cn(
            '',
            {
                'underline-visibility': underlineVisibility,
                'underline-style': underlineStyle,
                color,
            },
            className,
        )}
        download={download}
    >
        {children}
    </Link>
);

TextLink.propTypes = {
    color: PropTypes.oneOf(['default', 'white', 'black', 'gray', 'green', 'blue', 'inherit']),
    underlineVisibility: PropTypes.oneOf(['hover', 'always']),
    underlineStyle: PropTypes.oneOf(['solid', 'dashed', 'border', 'none']),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    itemProp: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
        PropTypes.node,
    ]),
};

export default TextLink;
