import * as PropTypes from 'prop-types';
import * as React from 'react';
import cnCreate from 'utils/cnCreate';
import './Checkbox.less';
import CheckedIcon from 'icons/System/16/Checked_16.svg';
import detectTouch from 'utils/detectTouch';
import filterDataAttrs, { IDataAttributes } from '../../utils/dataAttrs';

export interface ICheckboxProps extends IDataAttributes {
    /** Цвет чекбокса */
    color?: 'dark' | 'light';
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Размер текста */
    fontSize?: 'regular' | 'small';
    /** Имя компонента в DOM */
    name?: string;
    /** Значение чекбокса */
    value?: string;
    /** Управление состоянием вкл/выкл компонента */
    checked?: boolean;
    /** Управление возможности взаимодействия с компонентом */
    disabled?: boolean;
    /** Отобразить компонент в состоянии ошибки */
    error?: boolean;
    /** Дополнительный контент справа */
    extraContent?: JSX.Element[] | Element[] | JSX.Element | Element | string;
    children: JSX.Element[] | Element[] | JSX.Element | Element | string;
    /** Обработчик изменения значения 'value' */
    onChange?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-beta-checkbox');
class Checkbox extends React.Component<ICheckboxProps, {}> {
    static propTypes = {
        className: PropTypes.string,
        fontSize: PropTypes.oneOf(['regular', 'small']),
        color: PropTypes.oneOf(['dark', 'light']),
        name: PropTypes.string,
        value: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        error: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
        ]),
        extraContent: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
        ]),
        dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
        onChange: PropTypes.func,
    };

    static defaultProps: Partial<ICheckboxProps> = {
        color: 'dark',
        fontSize: 'regular',
        checked: false,
    };

    isTouch: boolean = detectTouch();

    handleChange = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onChange } = this.props;
        onChange && onChange(e);
    }

    render() {
        const {
            className,
            fontSize,
            name,
            color,
            value,
            checked,
            disabled,
            error,
            children,
            extraContent,
            dataAttrs,
        } = this.props;

        return (
            <div
                className={cn(
                    '',
                    {
                        'font-size': fontSize,
                        color,
                        checked,
                        disabled,
                        error,
                    },
                    className
                )}
                {...filterDataAttrs(dataAttrs)}
            >
                <div className={cn('inner')}>
                    <label className={cn('label', { 'no-touch': !this.isTouch })}>
                        <input
                            className={cn('input')}
                            type="checkbox"
                            name={name}
                            value={value}
                            checked={checked}
                            onChange={this.handleChange}
                            disabled={disabled}
                        />
                        <div className={cn('custom-input')}>
                            <CheckedIcon className={cn('icon')} />
                        </div>
                        {children}
                    </label>
                    {extraContent && <span className={cn('extra-content')}>{extraContent}</span>}
                </div>
            </div>
        );
    }
}

export default Checkbox;
