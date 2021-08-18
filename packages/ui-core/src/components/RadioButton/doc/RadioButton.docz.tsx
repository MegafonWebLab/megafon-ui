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

export const DemoRadioButtonWrapper = ({ children }: IRadioButtonProps): JSX.Element => {
    const [selectedOption, setSelectedOption] = React.useState('');

    const handleChange = (value: string): void => {
        setSelectedOption(value);
    };

    return (
        <>
            <p
                style={{
                    textAlign: 'center',
                    marginTop: 0,
                }}
            >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <b>Value:</b> "{selectedOption || undefined}"
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
