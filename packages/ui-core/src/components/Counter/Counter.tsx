import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import IconMinus from '@megafon/ui-icons/system-16-minus_16.svg';
import IconPlus from '@megafon/ui-icons/system-16-plus_16.svg';
import * as PropTypes from 'prop-types';
import './Counter.less';

export interface ICounterProps {
    /** Переводит компонент в контролируемое состояние */
    isControlled?: boolean;
    /** Внешнее значение для контролируемого компонента */
    value?: number;
    /** Начальное значение */
    initialValue?: number;
    /** Минимальное доступное значение */
    min?: number;
    /** Максимальное доступное значение */
    max?: number;
    /** Запретить взаимодействие с компонентом */
    disabled?: boolean;
    /** Обработчик изменения значения 'value' */
    onChange?: (value: number) => void;
    /** Дополнительный класс для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        buttonMinus?: string;
        buttonPlus?: string;
        input?: string;
    };
}

const cn = cnCreate('mfui-counter');
const Counter: React.FC<ICounterProps> = ({
    isControlled = false,
    value = 0,
    initialValue,
    max = 999999,
    min = 0,
    disabled = false,
    onChange,
    className,
    classes = {},
}) => {
    const currentInitialValue = initialValue || min;
    const [counter, setCounter] = React.useState(currentInitialValue);

    React.useEffect(() => {
        setCounter(currentInitialValue);
    }, [currentInitialValue]);

    const handleValueChange = React.useCallback(
        (inputValue: number) => {
            if (!isControlled) {
                setCounter(inputValue);
            }

            if (inputValue < min) {
                onChange && onChange(min);
            }

            if (inputValue > max) {
                onChange && onChange(max);
            }

            if (inputValue >= min && inputValue <= max) {
                onChange && onChange(inputValue);
            }
        },
        [min, max, onChange, isControlled],
    );

    const handleMinusClick = React.useCallback((): void => {
        handleValueChange(isControlled ? value - 1 : counter - 1);
    }, [handleValueChange, counter, isControlled, value]);

    const handlePlusClick = React.useCallback((): void => {
        handleValueChange(isControlled ? value + 1 : counter + 1);
    }, [handleValueChange, counter, isControlled, value]);

    const handleInputChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            const pattern = /^[0-9\b]+$/;
            const { value: inputValue } = e.target;

            if (inputValue !== '' && !pattern.test(inputValue)) {
                return;
            }

            handleValueChange(Number(inputValue));
        },
        [handleValueChange],
    );

    const handleInputBlur = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>): void => {
            const { value: inputValue } = e.target;
            const numberValue = Number(inputValue);

            if (numberValue < min) {
                handleValueChange(min);

                return;
            }

            if (numberValue > max) {
                handleValueChange(max);
            }
        },
        [handleValueChange, min, max],
    );

    return (
        <div className={cn({ disabled }, [className, classes.root])}>
            <button
                className={cn('btn', { left: true }, classes.buttonMinus)}
                type="button"
                disabled={disabled || (isControlled ? value : counter) <= min}
                onClick={handleMinusClick}
            >
                <IconMinus className={cn('icon')} />
            </button>
            <div className={cn('input-box')}>
                <input
                    className={cn('input', classes.input)}
                    value={isControlled ? value : counter}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    disabled={disabled}
                />
            </div>
            <button
                className={cn('btn', { right: true }, classes.buttonPlus)}
                type="button"
                disabled={disabled || counter >= max || value >= max}
                onClick={handlePlusClick}
            >
                <IconPlus className={cn('icon')} />
            </button>
        </div>
    );
};

Counter.propTypes = {
    isControlled: PropTypes.bool,
    value: PropTypes.number,
    initialValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        buttonMinus: PropTypes.string,
        buttonPlus: PropTypes.string,
        input: PropTypes.string,
    }),
};

export default Counter;
