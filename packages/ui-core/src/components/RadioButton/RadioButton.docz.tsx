import * as React from 'react';

export const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
};

const textPosition = {
    textAlign: 'center',
} as React.CSSProperties;

export interface IRadioButtonProps {
    children: (prop: { selectedOption?: string; onChange: (value: string) => void }) => JSX.Element;
}

export interface IRadioButtonState {
    selectedOption?: string;
}

export class DemoRadioButtonWrapper extends React.Component<IRadioButtonProps, IRadioButtonState> {
    constructor(props: IRadioButtonProps) {
        super(props);
        this.state = {
            selectedOption: '',
        };
    }
    handleChange = (value: string): void => {
        this.setState({ selectedOption: value });
    }
    render() {
        const { selectedOption } = this.state;
        const { children } = this.props;
        return (
            <>
                <p style={textPosition}><b>Value:</b> "{selectedOption || undefined}"</p><br />
                {children({
                    onChange: this.handleChange,
                    selectedOption: selectedOption,
                })}
            </>
        );
    }
}
