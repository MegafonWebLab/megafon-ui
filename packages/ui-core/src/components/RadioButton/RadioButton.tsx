import * as React from 'react';
import { cnCreate, filterDataAttrs, IFilterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './RadioButton.less';

export interface IRadioButtonProps extends IFilterDataAttrs {
    /** Значение */
    value: string;
    /** Имя для тега form */
    name?: string;
    /** Размер текста лейбла */
    textSize?: 'small' | 'medium';
    /** Управление возможностью взаимодействия с компонентом */
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

    const handleChange = (): void => onChange && onChange(value);

    return (
        <div className={cn(rootClassNames)} {...filterDataAttrs(dataAttrs)}>
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
                    className={cn('input')}
                    type="radio"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    ref={inputRef as React.Ref<HTMLInputElement>}
                />
                <div className={cn('custom-input', classes.customInput)} />
                {children && <div className={cn('text', { size: textSize }, classes.labelText)}>{children}</div>}
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
    children: PropTypes.node,
    onChange: PropTypes.func,
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
};

export default RadioButton;
