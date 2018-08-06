import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from 'utils/cn';
import './Button.less';
import Spinner from 'icons/spinner.svg';

interface Props {
    /** Spicial view */
    customView?: 'arrow-back' | 'two-lines';
    /** Link */
    href?: string | null;
    /** target - property tag <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Functional */
    type?: 'button' | 'reset' | 'submit';
    /** Size for all devices */
    sizeAll?: 'small' | 'medium' | 'large';
    /** Size for wide devices */
    sizeWide?: 'small' | 'medium' | 'large';
    /** Size for desktop */
    sizeDesktop?: 'small' | 'medium' | 'large';
    /** Size for tablet */
    sizeTablet?: 'small' | 'medium' | 'large';
    /** Size for mobile */
    sizeMobile?: 'small' | 'medium' | 'large';
    /** Current color */
    passiveColor?: 'green' | 'purple' | 'transparent' | 'transparent-green' | 'white';
    /** Hover color */
    hoverColor?: 'green' | 'purple' | 'transparent';
    /** Click/press color */
    downColor?: 'dark' | 'transparent';
    /** Disabled color */
    disabledColor?: 'gray' | 'white' | 'transparent';
    /** Width */
    width?: 'full' | 'auto';
    /** margin(outer indentation) */
    margin?: boolean;
    /** Disabled */
    disabled?: boolean;
    /** Padding(inner indentation) */
    padding?: boolean;
    /** Show spinner */
    showSpinner?: boolean;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    /** Svg icon */
    svgIcon?: JSX.Element;
    /** Click event handler */
    onClick?(e: React.SyntheticEvent<EventTarget>): void;
}

/**
 * Компонент кнопки
 */
const cn = cnCreate('button');
class Button extends React.Component<Props, {}> {
    static propTypes = {
        /** Кастомный внешний вид */
        customView: PropTypes.oneOf(['arrow-back', 'two-lines']),
        /** Адрес ссылки */
        href: PropTypes.string,
        target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
        /** Тип */
        type: PropTypes.oneOf(['button', 'reset', 'submit']),
        /** Заблокировать кнопку */
        disabled: PropTypes.bool,
        /** Размер кнопки на всех разрешениях */
        sizeAll: PropTypes.oneOf(['small', 'medium', 'large']),
        /** Размер кнопки на разрешении 1280+ */
        sizeWide: PropTypes.oneOf(['small', 'medium', 'large']),
        /** Размер кнопки на разрешении 1020+ */
        sizeDesktop: PropTypes.oneOf(['small', 'medium', 'large']),
        /** Размер кнопки на разрешении 730-1020 */
        sizeTablet: PropTypes.oneOf(['small', 'medium', 'large']),
        /** Размер кнопки на разрешении 320-730 */
        sizeMobile: PropTypes.oneOf(['small', 'medium', 'large']),
        /** Цвет кнопки в пасивном состоянии */
        passiveColor: PropTypes.oneOf([
            'green',
            'purple',
            'transparent',
            'transparent-green',
            'white',
        ]),
        /** Цвет кнопки в наведенном состоянии */
        hoverColor: PropTypes.oneOf([
            'green',
            'purple',
            'transparent',
        ]),
        /** Цвет кнопки в нажатом состоянии */
        downColor: PropTypes.oneOf([
            'dark',
            'transparent',
        ]),
        /** Цвет кнопки в отключенном состоянии */
        disabledColor: PropTypes.oneOf([
            'gray',
            'white',
            'transparent',
        ]),
        /** Использовать внешний правый и нижний отступы */
        margin: PropTypes.bool,
        /** Использовать внутренний правый и левый отступы */
        padding: PropTypes.bool,
        /** Растянуть на всю ширину */
        width: PropTypes.oneOf(['full', 'auto']),
        /** Показать спиннер */
        showSpinner: PropTypes.bool,
        /**
         * Обработчик события onClick
         *
         * @param {SyntheticEvent} event - синтетическое React событие.
         */
        onClick: PropTypes.func,
        /** Svgicon */
        svgIcon: PropTypes.element,
        /** Дочерние элементы */
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
    };

    static defaultProps = {
        passiveColor: 'green',
        hoverColor: 'green',
        downColor: 'dark',
        disabledColor: 'gray',
        width: 'auto',
        type: 'button',
        sizeAll: 'medium',
        padding: true,
        showSpinner: false,
    };

    renderSvgIcon() {
        return (
            <div className={cn('icon-box')}>
                <div className={cn('icon')}>
                    {this.props.svgIcon}
                </div>
            </div>
        );
    }

    renderChildrenElem() {
        return (
            <div className={cn('content', { icon: !!this.props.svgIcon })}>
                {this.props.children}
            </div>
        );
    }

    renderSpinner() {
        return (
            <div className={cn('spinner')}>
                <Spinner />
            </div>
        );
    }

    render() {
        const ElementType = this.props.href ? 'a' : 'button';

        return (
            <ElementType
                className={cn('', {
                    'size-all': this.props.sizeAll,
                    'size-wide': this.props.sizeWide,
                    'size-desktop': this.props.sizeDesktop,
                    'size-tablet': this.props.sizeTablet,
                    'size-mobile': this.props.sizeMobile,
                    'custom-view': this.props.customView,
                    'passive-color': !this.props.customView && this.props.passiveColor,
                    'hover-color': !this.props.customView && this.props.hoverColor,
                    'down-color': !this.props.customView && this.props.downColor,
                    'disabled-color': !this.props.customView && this.props.disabledColor,
                    padding: this.props.padding,
                    width: this.props.width,
                    margin: this.props.margin,
                    loading: this.props.showSpinner,
                })}
                href={this.props.href}
                target={this.props.target}
                type={this.props.href ? '' : this.props.type}
                onClick={this.props.onClick}
                disabled={this.props.disabled}>
                <div className={cn('inner')}>
                    {!this.props.showSpinner && this.props.svgIcon && this.renderSvgIcon()}
                    {!this.props.showSpinner && this.props.children && this.renderChildrenElem()}
                    {this.props.showSpinner && this.renderSpinner()}
                </div>
            </ElementType>
        );
    }
}

export default Button;
