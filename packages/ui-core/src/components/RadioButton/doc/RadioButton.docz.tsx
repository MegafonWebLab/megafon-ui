import * as React from 'react';

export const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
};

export interface IRadioButtonProps {
    children: (prop: { selectedOption?: string; onChange: (value: string) => void }) => JSX.Element;
}

export interface IRadioButtonState {
    selectedOption?: string;
}

export const DemoRadioButtonWrapper = ({ children }: IRadioButtonProps) => {
    const [selectedOption, setSelectedOption] = React.useState('');

    const handleChange = (value: string): void => {
        setSelectedOption(value);
    };

    return (
        <>
            <p style={{ textAlign: 'center', marginTop: 0 }}>
                <b>Value:</b> &quot;{selectedOption || undefined}&quot;
            </p>
            <div style={flexStyle}>
                {children({
                    onChange: handleChange,
                    selectedOption,
                })}
            </div>
        </>
    );
};
