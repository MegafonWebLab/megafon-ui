import React, { useState } from 'react';

const commonStyle = { display: 'flex', justifyContent: 'space-between' };

export const wrapperDefaultWidthStyle = { ...commonStyle, width: '250px' };
export const wrapperWideWidthStyle = { ...commonStyle, width: '550px' };

export const DemoTextFieldWithControlledValue = ({
    children,
}: Record<string, ({ value, onChange }: Record<string, unknown>) => void>): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = ({ target: { value } }) => {
        const valueDigits = value.replace(/[^0-9]/g, '');

        setInputValue(valueDigits);
    };

    return <>{children({ value: inputValue, onChange: handleChange })}</>;
};
