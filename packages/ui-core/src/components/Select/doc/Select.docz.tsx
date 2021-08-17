/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { ISelectItem, SelectItemValueType } from '../Select';

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
        view: (filterValue: string): JSX.Element => {
            // eslint-disable-next-line react/destructuring-assignment
            const query = filterValue.replace(/[^A-Z-a-zА-ЯЁа-яё0-9]/g, w => `\\${w}`);
            const stringFragments = 'Кантемировская'.split(RegExp(`(${query})`, 'ig'));

            return (
                <>
                    {stringFragments.map((fragment, i) => (
                        <React.Fragment key={i}>
                            {fragment.toLowerCase() === filterValue.toLowerCase() && fragment !== '' ? (
                                <b>{fragment}</b>
                            ) : (
                                fragment
                            )}
                        </React.Fragment>
                    ))}
                </>
            );
        },
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
    boxSizing: 'border-box' as const,
    minWidth: '300px',
};

interface ISelectChildrenProps {
    currentValue: SelectItemValueType;
    onSelect: (
        e: React.SyntheticEvent<EventTarget> | React.KeyboardEvent<HTMLDivElement>,
        data: ISelectItem<number>,
    ) => void;
}

interface ISelectWrapperProps {
    children: (data: ISelectChildrenProps) => JSX.Element;
}

export const DemoSelectWrapper: React.FC<ISelectWrapperProps> = props => {
    const [currentValue, setCurrentValue] = React.useState<SelectItemValueType>();

    const handleSelect = (
        _e: React.SyntheticEvent<EventTarget> | React.KeyboardEvent<HTMLDivElement>,
        data: ISelectItem<number>,
    ) => {
        if (!data) {
            setCurrentValue('');

            return;
        }

        setCurrentValue(data.value);
    };

    const { children } = props;

    return (
        <div style={selectWrapperStyle}>
            {children({
                onSelect: handleSelect,
                currentValue,
            })}
        </div>
    );
};
