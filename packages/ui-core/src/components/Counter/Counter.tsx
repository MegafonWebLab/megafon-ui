import * as React from 'react';
import cnCreate from 'utils/cnCreate';
import './Counter.less';

export interface ICounterProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
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
}

const cn = cnCreate('mfui-beta-counter');
const Counter: React.FC<ICounterProps> = ({
    className,
    initialValue,
    max = 999999,
    min = 0,
    isDisabled = false,
    onChange,
}) => {
    const currentInitialValue = initialValue || min;
    const [counter, setCounter] = React.useState(currentInitialValue);

    React.useEffect(() => {
        setCounter(currentInitialValue);
    }, [currentInitialValue]);

    function handleValueChange(value: number) {
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
    }

    function handleMinusClick(): void {
        handleValueChange(counter - 1);
    }

    function handlePlusClick(): void {
        handleValueChange(counter + 1);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const pattern = /^[0-9\b]+$/;
        const { value } = e.target;

        if (value !== '' && !pattern.test(value)) {
            return;
        }

        handleValueChange(Number(value));
    }

    function handleInputBlur(e: React.FocusEvent<HTMLInputElement>): void {
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
    }

    return (
        <div className={cn({ disabled: isDisabled }, className)}>
            <button
                className={cn('btn', { left: true })}
                type="button"
                disabled={isDisabled || counter <= min}
                onClick={handleMinusClick}
            >
                <span className={cn('minus')}>–</span>
            </button>
            <div className={cn('input-box')}>
                <input
                    className={cn('input')}
                    value={counter}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    disabled={isDisabled}
                />
            </div>
            <button
                className={cn('btn', { right: true })}
                type="button"
                disabled={isDisabled || counter >= max}
                onClick={handlePlusClick}
            >
                <span className={cn('plus')}>+</span>
            </button>
        </div>
    );
};

export default Counter;
