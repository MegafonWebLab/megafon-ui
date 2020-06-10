import * as React from 'react';
import cnCreate from 'utils/cnCreate';
import './Counter.less';

type Props = {
    /** Custom class name */
    className?: string;
    /** Initial number in counter */
    initialNumber?: number;
    /** Minimal allowed amount */
    minLimitedAmount?: number;
    /** Maximum allowed amount */
    maxLimitedAmount?: number;
    /** onChange handler */
    onChange?: (amount: number) => void;
};

const MIN_AMOUNT = 0;

const cn = cnCreate('counter');
const Counter = (props: Props): React.ReactElement => {
    const {
        className,
        maxLimitedAmount,
        onChange,
    } = props;
    const minLimitedAmount = props.minLimitedAmount || MIN_AMOUNT;
    const initialNumber = props.initialNumber || 0;
    const [counter, setCounter] = React.useState(initialNumber);

    function handleValueChange(value: number) {
        setCounter(value);
        onChange && onChange(value);
    }

    function handleChange(e: React.SyntheticEvent<EventTarget>): void {
        switch ((e.target as Element).className ) {
            case 'counter__minus':
                handleValueChange(counter - 1);
                break;
            case 'counter__plus':
                handleValueChange(counter + 1);
                break;
            case 'counter__input':
                const pattern = /^[0-9\b]+$/;
                const { value } = e.target as  HTMLInputElement;

                if (value !== '' && !pattern.test(value)) {
                    return;
                }
                handleValueChange(Number(value));
                break;
            default:
                return;
        }
    }

    function handleBlur(e: React.SyntheticEvent<EventTarget>): void {
        const { value } = e.target as  HTMLInputElement;

        if (maxLimitedAmount === undefined) {
            return;
        }
        if (Number(value) < minLimitedAmount) {
            handleValueChange(minLimitedAmount);

            return;
        }
        if (Number(value) > maxLimitedAmount) {
            handleValueChange(maxLimitedAmount);

            return;
        }
    }

    React.useEffect(() => {
        setCounter(initialNumber);
    }, [initialNumber]);

    return (
        <div className={cn(className)}>
            <button
                className={cn('btn', { left: true })}
                type="button"
                disabled={counter === minLimitedAmount}
                onClick={handleChange}
            >
                <span className={cn('minus')}>–</span>
            </button>
            <div className={cn('input-box')}>
                <input
                    className={cn('input')}
                    value={counter}
                    min={minLimitedAmount}
                    max={maxLimitedAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            <button
                className={cn('btn', { right: true })}
                type="button"
                disabled={counter === maxLimitedAmount}
                onClick={handleChange}
            >
                <span className={cn('plus')}>+</span>
            </button>
        </div>
    );
};

export default Counter;
