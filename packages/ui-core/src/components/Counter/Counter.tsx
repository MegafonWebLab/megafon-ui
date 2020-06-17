import * as React from 'react';
import cnCreate from 'utils/cnCreate';
import './Counter.less';
import IconMinus from './i/Minus.svg';
import IconPlus from './i/Plus.svg';

type Props = {
    /** Custom class name */
    className?: string;
    /** Initial number in counter */
    initialValue?: number;
    /** Minimal allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Disabled state of counter */
    isDisabled?: boolean;
    /** onChange handler */
    onChange?: (value: number) => void;
};

const MIN_VALUE = 0;

const cn = cnCreate('counter');
const Counter: React.FC<Props> = ({ className, initialValue, max, min = MIN_VALUE, isDisabled, onChange }) => {
    const currentInitialValue = initialValue || min;
    const [counter, setCounter] = React.useState(currentInitialValue);

    React.useEffect(() => {
        setCounter(currentInitialValue);
    }, [currentInitialValue]);

    function handleValueChange(value: number) {
        setCounter(value);

        if (Number(value) >= min && (max === undefined || Number(value) <= max)) {
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

        if (Number(value) < min) {
            handleValueChange(min);

            return;
        }
        if (max === undefined) {
            return;
        }
        if (Number(value) > max) {
            handleValueChange(max);

            return;
        }
    }

    return (
        <div className={cn('', { disabled: isDisabled }, className)}>
            <button
                className={cn('btn', { left: true })}
                type="button"
                disabled={isDisabled || counter === min}
                onClick={handleMinusClick}
            >
                <span className={cn('minus')}>–</span>
            </button>
            <div className={cn('input-box')}>
                <input
                    className={cn('input')}
                    value={counter}
                    min={min}
                    max={max}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    disabled={isDisabled}
                />
            </div>
            <button
                className={cn('btn', { right: true })}
                type="button"
                disabled={isDisabled || counter === max}
                onClick={handlePlusClick}
            >
                <span className={cn('plus')}>+</span>
            </button>
        </div>
    );
};

export default Counter;
