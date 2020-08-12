import * as React from 'react';
import { ISelectItem } from './Select';

export const items = [
    {
        value: 1,
        title: 'Авиамоторная',
    },
    {
        value: 2,
        title: 'Академическая',
    },
    {
        value: 3,
        title: 'Бабушкинская',
    },
    {
        value: 4,
        title: 'Багратионовская',
    },
    {
        value: 5,
        title: 'ВДНХ',
    },
    {
        value: 6,
        title: 'Варшавская',
    },
    {
        value: 7,
        title: 'Деловой центр',
    },
    {
        value: 8,
        title: 'Дмитровская',
    },
    {
        value: 9,
        title: 'Калужская',
    },
    {
        value: 10,
        title: 'Кантемировская',
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
    currentValue: number | undefined;
    onSelect: (_e: React.SyntheticEvent<EventTarget>, data: ISelectItem) => void;
}

interface ISelectWrapperProps {
    children: (data: ISelectChildrenProps) => JSX.Element;
}

export const DemoSelectWrapper: React.FC<ISelectWrapperProps> = (props) => {
    const [currentValue, setCurrentValue] = React.useState<CurrentValue>(undefined);

    const handleSelect = (_e: React.SyntheticEvent<EventTarget>, data: ISelectItem) => {
        setCurrentValue(Number(data.value));
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
