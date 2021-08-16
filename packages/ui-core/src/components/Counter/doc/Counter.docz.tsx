import * as React from 'react';

export const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
};

interface IDemoCounterWrapperProps {
    children: (prop: { onChange: (value: number) => void; initialValue: number }) => JSX.Element;
    initialValue: number;
}

export const DemoCounterWrapper: React.FC<IDemoCounterWrapperProps> = ({ initialValue = 0, children }) => {
    const [value, setValue] = React.useState(initialValue);

    return (
        <div>
            <p style={{ marginTop: 0 }}>Value: {value}</p>
            {children({
                onChange: setValue,
                initialValue,
            })}
        </div>
    );
};
