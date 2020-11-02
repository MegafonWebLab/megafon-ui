import * as React from 'react';
import * as PropTypes from 'prop-types';
import './TextLink.less';
import Link from '../Link/Link';
import cnCreate from 'utils/cnCreate';

export interface ITextLinkProps {
    /** Цвет */
    color: 'white' | 'black' | 'gray' | 'blue' | 'green' | 'inherit';
    /** Отображение подчеркивания */
    underlineVisibility: 'hover' | 'always';
    /** Стиль подчеркивания */
    underlineStyle: 'solid' | 'dashed' | 'border' | 'none';
    /** Target - аргумент тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Ссылка */
    href?: string;
    /** Реакт rel аттрибут */
    rel?: string;
    /** Дополнительный класс корневого элемента */
    className?: string;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    /** Обработчик клика */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-beta-text-link');
class TextLink extends React.Component<Partial<ITextLinkProps>, {}> {
    static propTypes = {
        color: PropTypes.oneOf(['white', 'black', 'gray', 'blue', 'green', 'inherit']),
        underlineVisibility: PropTypes.oneOf(['hover', 'always']),
        underlineStyle: PropTypes.oneOf(['solid', 'dashed', 'border', 'none']),
        href: PropTypes.string,
        target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
        onClick: PropTypes.func,
    };

    static defaultProps: Partial<ITextLinkProps> = {
        underlineVisibility: 'hover',
        underlineStyle: 'solid',
        color: 'blue',
    };

    render() {
        const {
            underlineVisibility,
            underlineStyle,
            color,
            className,
            target,
            href,
            onClick,
            children,
        } = this.props;

        return (
            <Link
                target={target}
                href={href}
                onClick={onClick}
                children={children}
                className={cn('', {
                    'underline-visibility': underlineVisibility,
                    'underline-style': underlineStyle, color,
                }, className)}
            />
        );
    }
}

export default TextLink;
