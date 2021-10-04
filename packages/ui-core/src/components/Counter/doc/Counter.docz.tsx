import * as React from 'react';

export const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
};

type childrenPropTypes = {
    onChange: (value: number) => void;
    initialValue: number;
    value?: number;
};

interface IDemoCounterWrapperProps {
    children: (prop: childrenPropTypes) => JSX.Element;
    initialValue: number;
    isControlled?: boolean;
}

export const DemoCounterWrapper: React.FC<IDemoCounterWrapperProps> = ({
    isControlled,
    initialValue = 0,
    children,
}) => {
    const [value, setValue] = React.useState(initialValue);

    const childrenProps: childrenPropTypes = {
        onChange: setValue,
        initialValue,
    };

    if (isControlled) {
        childrenProps.value = value;
    }

    return (
        <div>
            <p style={{ marginTop: 0 }}>Value: {value}</p>
            {children(childrenProps)}
        </div>
    );
};
