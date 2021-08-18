import * as React from 'react';

interface IDemoSearchWrapperProps {
    children: (prop: {
        onSubmit: (value: string) => void;
        onChange: (query: string) => void;
        chosenValue: string;
        items: string[];
    }) => JSX.Element;
}

export const DemoSearchWrapper: React.FC<IDemoSearchWrapperProps> = ({ children }) => {
    const [value, setValue] = React.useState('');
    const [items, setItems] = React.useState<string[]>([]);

    const handleChange = React.useCallback(
        (query: string) => {
            if (!query) {
                return;
            }

            setItems(oldItems => [...oldItems, query]);
        },
        [setItems],
    );

    return (
        <div>
            <p style={{ marginTop: 0 }}>Value: {value}</p>
            {children({ onChange: handleChange, onSubmit: setValue, items, chosenValue: value })}
        </div>
    );
};
export default DemoSearchWrapper;
