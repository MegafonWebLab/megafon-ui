import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './RadioButton.less';

export interface IRadioButtonProps {
    /** Значение */
    value: string;
    /** Имя для тега form */
    name?: string;
    /** Размер текста лейбла */
    textSize?: 'small' | 'medium';
    /** Управление возможностью взаимодействия с компонентом */
    isDisabled?: boolean;
    /** Управление состоянием вкл/выкл компонента */
    isChecked?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string | string[];
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        label?: string;
        customInput?: string;
        labelText?: string;
    };
    children?: React.ReactNode;
    /** Обработчик изменения значения 'value' */
    onChange?: (value: string) => void;
    /** Ссылка на input */
    inputRef?: React.Ref<HTMLInputElement>;
}

const cn = cnCreate('mfui-beta-radio-button');
class RadioButton extends React.Component<IRadioButtonProps> {
    static propTypes = {
        value: PropTypes.string.isRequired,
        name: PropTypes.string,
        textSize: PropTypes.oneOf(['small', 'medium']),
        isDisabled: PropTypes.bool,
        isChecked: PropTypes.bool,
        className: PropTypes.string,
        classes: PropTypes.shape({
            root: PropTypes.string,
            label: PropTypes.string,
            customInput: PropTypes.string,
            labelText: PropTypes.string,
        }),
        children: PropTypes.node,
        onChange: PropTypes.func,
        inputRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
        ]),
    };

    static defaultProps: Partial<IRadioButtonProps> = {
        textSize: 'medium',
        isDisabled: false,
    };

    handleChange = () => {
        const { onChange, value } = this.props;

        onChange && onChange(value);
    };

    render() {
        const {
            isChecked,
            isDisabled,
            name,
            value,
            textSize,
            children,
            inputRef,
            className,
            classes = {},
        } = this.props;
        const checkedProp = isChecked !== undefined ? { checked: isChecked } : {};

        const rootClassNames = Array.isArray(className) ? [...className, classes.root] : [className, classes.root];

        return (
            <div className={cn(rootClassNames)}>
                <label
                    className={cn(
                        'label',
                        {
                            disabled: isDisabled,
                        },
                        classes.label,
                    )}
                >
                    <input
                        {...checkedProp}
                        className={cn('input')}
                        type="radio"
                        name={name}
                        value={value}
                        onChange={this.handleChange}
                        disabled={isDisabled}
                        ref={inputRef as React.Ref<HTMLInputElement>}
                    />
                    <div className={cn('custom-input', classes.customInput)} />
                    {children && <div className={cn('text', { size: textSize }, classes.labelText)}>{children}</div>}
                </label>
            </div>
        );
    }
}

export default RadioButton;
