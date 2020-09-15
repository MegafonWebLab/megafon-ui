import * as React from 'react';

interface IDemoSearchWrapperProps {
    children: (prop: {
        onSubmit: (value: string) => void;
    }) => JSX.Element;
}

export const DemoSearchWrapper: React.FC<IDemoSearchWrapperProps> = ({ children }) => {
    const [value, setValue] = React.useState('');

    return (
        <div>
            <p style={{ marginTop: 0 }}>Value: {value}</p>
            {children({ onSubmit: setValue })}
        </div>
    );
};
