import * as React from 'react';
import PropTypes from 'prop-types';
import { cnCreate } from 'utils/cn';
import './Button.less';
import SvgIcon from 'shared/ui/components/SvgIcon/SvgIcon';
import spinnerGif from './i/spinner.gif';

interface Props {
    customView?: 'arrow-back' | 'two-lines';
    iconId?: string;
    href?: string | null;
    target?: '_self' | '_blank' | '_parent' | '_top';
    type?: 'button' | 'reset' | 'submit';
    sizeAll?: 'small' | 'medium' | 'large';
    sizeWide?: 'small' | 'medium' | 'large';
    sizeDesktop?: 'small' | 'medium' | 'large';
    sizeTablet?: 'small' | 'medium' | 'large';
    sizeMobile?: 'small' | 'medium' | 'large';
    passiveColor?: 'green' | 'purple' | 'transparent' | 'transparent-green' | 'white';
    hoverColor?: 'green' | 'purple' | 'transparent';
    downColor?: 'dark' | 'transparent';
    disabledColor?: 'gray' | 'white' | 'transparent';
    width?: 'full' | 'auto',
    margin?: boolean;
    disabled?: boolean;
    padding?: boolean;
    showSpinner?: boolean;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
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
        /** ID svg иконки из спрайта */
        iconId: PropTypes.string,
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
        /** Дочерние элементы */
        children: PropTypes.node,
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

    renderIconElem() {
        return (
            <div className={cn('icon-box')}>
                <SvgIcon className={cn('icon')} iconId={this.props.iconId} />
            </div>
        );
    }

    renderChildrenElem() {
        return (
            <div className={cn('content', { icon: !!this.props.iconId })}>
                {this.props.children}
            </div>
        );
    }

    renderSpinner() {
        return (
            <img className={cn('spinner')} src={spinnerGif} alt="" />
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
                    {!this.props.showSpinner && this.props.iconId && this.renderIconElem()}
                    {!this.props.showSpinner && this.props.children && this.renderChildrenElem()}
                    {this.props.showSpinner && this.renderSpinner()}
                </div>
            </ElementType>
        );
    }
}

export default Button;
