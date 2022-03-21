import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './RadioButton.less';

export interface IRadioButtonProps {
    /** Значение */
    value: string;
    /** Имя для тега form */
    name?: string;
    /** Размер текста лейбла */
    textSize?: 'small' | 'medium';
    /** Отключение радио-кнопки */
    disabled?: boolean;
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
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        input?: Record<string, string>;
        text?: Record<string, string>;
    };
    children?: React.ReactNode;
    /** Обработчик изменения значения 'value' */
    onChange?: (value: string) => void;
    /** Ссылка на input */
    inputRef?: React.Ref<HTMLInputElement>;
}

const cn = cnCreate('mfui-radio-button');
const RadioButton: React.FC<IRadioButtonProps> = ({
    isChecked,
    disabled = false,
    name,
    value,
    textSize = 'medium',
    children,
    inputRef,
    className,
    classes = {},
    dataAttrs,
    onChange,
}) => {
    const checkedProp = isChecked !== undefined ? { checked: isChecked } : {};
    const rootClassNames = Array.isArray(className) ? [...className, classes.root] : [className, classes.root];

    const handleChange = (): void => onChange?.(value);

    return (
        <div className={cn(rootClassNames)} {...filterDataAttrs(dataAttrs?.root)}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
                className={cn(
                    'label',
                    {
                        disabled,
                    },
                    classes.label,
                )}
            >
                <input
                    {...checkedProp}
                    {...filterDataAttrs(dataAttrs?.input)}
                    className={cn('input')}
                    type="radio"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    ref={inputRef as React.Ref<HTMLInputElement>}
                />
                <div className={cn('custom-input', classes.customInput)} />
                {children && (
                    <div
                        {...filterDataAttrs(dataAttrs?.text)}
                        className={cn('text', { size: textSize }, classes.labelText)}
                    >
                        {children}
                    </div>
                )}
            </label>
        </div>
    );
};

RadioButton.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    textSize: PropTypes.oneOf(['small', 'medium']),
    disabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        label: PropTypes.string,
        customInput: PropTypes.string,
        labelText: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        input: PropTypes.objectOf(PropTypes.string.isRequired),
        text: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    children: PropTypes.node,
    onChange: PropTypes.func,
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
};

export default RadioButton;
