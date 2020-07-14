import * as React from 'react';
import { ISelectItem } from './Select';

export const items = [
    {
        value: 1,
        view: 'Uporovka village',
        title: 'Uporovka village',
    },
    {
        value: 2,
        view: 'Palevo village',
        title: 'Palevo village',
    },
    {
        value: 3,
        view: 'Chuvaki village',
        title: 'Chuvaki village',
    },
];

export const flexStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-15px',
};

const selectWrapperStyle = {
    height: '200px',
    width: '50%',
    paddingLeft: '15px',
    boxSizing: 'border-box' as 'border-box',
    minWidth: '300px',
};

type CurrentValue = number | undefined;

interface ISelectChildrenProps {
    onSelect: (_e: React.SyntheticEvent<EventTarget>, data: ISelectItem) => void;
    currentValue: number | undefined;
}

interface ISelectWrapperProps {
    children: (data: ISelectChildrenProps) => JSX.Element;
}

export const DemoSelectWrapper: React.FC<ISelectWrapperProps> = (props) => {
    const [currentValue, setCurrentValue] = React.useState<CurrentValue>(undefined);

    const handleSelect = (_e: React.SyntheticEvent<EventTarget>, data: ISelectItem) => {
        setCurrentValue(data.value);
    };

    return (
        <div style={selectWrapperStyle}>
            {props.children({
                onSelect: handleSelect,
                currentValue: currentValue,
            })}
        </div>
    );
};
