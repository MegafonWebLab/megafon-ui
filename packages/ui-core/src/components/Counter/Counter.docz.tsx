import * as React from 'react';

interface IDemoCounterWrapperProps {
    children: (prop: {
        onChange: (amount: number) => void;
        initialNumber: number;
        minLimitedAmount: number;
        maxLimitedAmount: number;
    }) => JSX.Element;
}

const initialNumber = 10;

export const DemoCounterWrapper: React.FC<IDemoCounterWrapperProps> = (props) => {
    const [amount, setAmount] = React.useState(initialNumber);

    const handleChange = (value) => {
        setAmount(value);
    };

    return (
        <div>
            <p>amount: {amount}</p>
            {props.children({
                onChange: handleChange,
                initialNumber: initialNumber,
                minLimitedAmount: 3,
                maxLimitedAmount: 33,
            })}
        </div>
    );
};
