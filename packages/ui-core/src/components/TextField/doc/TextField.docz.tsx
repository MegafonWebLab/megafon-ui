import React, { useState } from 'react';

const commonStyle = { display: 'flex', justifyContent: 'space-between' };

export const wrapperDefaultWidthStyle = { ...commonStyle, width: '250px' };
export const wrapperWideWidthStyle = { ...commonStyle, width: '550px' };

export const DemoTextFieldWithControlledValue = ({ children }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = ({ target: { value } }) => {
        const valueDigits = value.replace(/[^0-9]/g, '');

        setInputValue(valueDigits);
    };

    return <>{children({ value: inputValue, onChange: handleChange })}</>;
};

export const DemoTextFieldWithBeforeMaskChangeValue = ({ children }) => {
    const handleBeforeMaskChange = (value, newState) => {
        const { value: newMaskedValue } = newState;
        const isValuePasted = value && value.length > 1;

        return { ...newState, value: isValuePasted ? value : newMaskedValue };
    };

    return <>{children({ handleBeforeMaskChange })}</>;
};
