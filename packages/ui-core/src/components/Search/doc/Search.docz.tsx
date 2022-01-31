import * as React from 'react';
import { SearchItem } from '../Search';

interface IDemoSearchWrapperProps {
    children: (prop: {
        onSubmit: (value: string) => void;
        onChange: (query: string) => void;
        chosenValue: string;
        items: SearchItem[];
    }) => JSX.Element;
}

interface IDemoSearchCustomItemsWrapper {
    children: (prop: { value: string; onSubmit: (value: string) => void; items: SearchItem[] }) => JSX.Element;
}

export const DemoSearchWrapper: React.FC<IDemoSearchWrapperProps> = ({ children }) => {
    const [value, setValue] = React.useState<string>('');
    const [items, setItems] = React.useState<SearchItem[]>([]);

    const handleChange = React.useCallback((query: string) => {
        if (!query) {
            return;
        }

        setItems(oldItems => [...oldItems, { value: query }]);
    }, []);

    return (
        <div>
            <p style={{ marginTop: 0 }}>Value: {value}</p>
            {children({ onChange: handleChange, onSubmit: setValue, items, chosenValue: value })}
        </div>
    );
};

export const DemoSearchCustomItemsWrapper: React.FC<IDemoSearchCustomItemsWrapper> = ({ children }) => {
    const [value, setValue] = React.useState<string>('');

    const getContent = React.useCallback(
        (index: number) => (
            <div>
                <div>
                    <b>ИП Баранник Александр Николаевич {index + 1}</b>
                </div>
                <div>
                    <b>ИНН: 503209463031</b>
                </div>
                <div>Московская обл, Одинцовский р-н, г Одинцово</div>
            </div>
        ),
        [],
    );

    const items = React.useMemo(
        () =>
            new Array(5).fill('').map((_, i) => ({
                value: `ИП Баранник Александр Николаевич ${i + 1}`,
                searchView: getContent(i),
            })),
        [getContent],
    );

    return <div>{children({ value, onSubmit: setValue, items })}</div>;
};
