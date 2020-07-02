import * as React from 'react';
import { ISelectCallbackItem } from './Select';

export const items = [
    {
        value: 1,
        view: 'Ватнайокюдль',
        title: 'Ватнайокюдль',
    },
    {
        value: 2,
        view: 'Хваннадальсхнукюр',
        title: 'Хваннадальсхнукюр',
    },
    {
        value: 3,
        view: 'Киркьюбайрклёйстюр',
        title: 'Киркьюбайклёйстюр',
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
    onSelect: (_e: React.SyntheticEvent<EventTarget>, data: ISelectCallbackItem) => void;
    currentValue: number | undefined;
}

interface ISelectWrapperProps {
    children: (data: ISelectChildrenProps) => JSX.Element;
}

export const SelectWrapper: React.FC<ISelectWrapperProps> = (props) => {
    const [currentValue, setCurrentValue] = React.useState<CurrentValue>(undefined);

    const handleSelect = (_e: React.SyntheticEvent<EventTarget>, data: ISelectCallbackItem) => {
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
