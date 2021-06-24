import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-helpers';
import './Counter.less';
import IconMinus from 'icons/System/16/Minus_16.svg';
import IconPlus from 'icons/System/16/Plus_16.svg';

export interface ICounterProps {
    /** Начальное значение */
    initialValue?: number;
    /** Минимальное доступное значение */
    min?: number;
    /** Максимальное доступное значение */
    max?: number;
    /** Запретить взаимодействие с компонентом */
    isDisabled?: boolean;
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

const cn = cnCreate('mfui-beta-counter');
const Counter: React.FC<ICounterProps> = ({
    initialValue,
    max = 999999,
    min = 0,
    isDisabled = false,
    onChange,
    className,
    classes = {},
}) => {
    const currentInitialValue = initialValue || min;
    const [counter, setCounter] = React.useState(currentInitialValue);

    React.useEffect(() => {
        setCounter(currentInitialValue);
    }, [currentInitialValue]);

    const handleValueChange = React.useCallback((value: number) => {
        setCounter(value);

        if (value < min) {
            onChange && onChange(min);
        }

        if (value > max) {
            onChange && onChange(max);
        }

        if (value >= min && value <= max) {
            onChange && onChange(value);
        }
    }, [min, max, onChange]);

    const handleMinusClick = React.useCallback((): void => {
        handleValueChange(counter - 1);
    }, [handleValueChange, counter]);

    const handlePlusClick = React.useCallback((): void => {
        handleValueChange(counter + 1);
    }, [handleValueChange, counter]);

    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const pattern = /^[0-9\b]+$/;
        const { value } = e.target;

        if (value !== '' && !pattern.test(value)) {
            return;
        }

        handleValueChange(Number(value));
    }, [handleValueChange]);

    const handleInputBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        const numberValue = Number(value);

        if (numberValue < min) {
            handleValueChange(min);

            return;
        }

        if (numberValue > max) {
            handleValueChange(max);

            return;
        }
    }, [handleValueChange, min, max]);

    return (
        <div className={cn({ disabled: isDisabled }, [className, classes.root])}>
            <button
                className={cn('btn', { left: true }, classes.buttonMinus)}
                type="button"
                disabled={isDisabled || counter <= min}
                onClick={handleMinusClick}
            >
                <IconMinus className={cn('icon')} />
            </button>
            <div className={cn('input-box')}>
                <input
                    className={cn('input', classes.input)}
                    value={counter}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    disabled={isDisabled}
                />
            </div>
            <button
                className={cn('btn', { right: true }, classes.buttonPlus)}
                type="button"
                disabled={isDisabled || counter >= max}
                onClick={handlePlusClick}
            >
                <IconPlus className={cn('icon')} />
            </button>
        </div>
    );
};

Counter.propTypes = {
    initialValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
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
