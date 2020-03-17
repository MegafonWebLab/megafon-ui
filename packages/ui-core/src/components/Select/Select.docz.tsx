import * as React from 'react';
import { ISelectItem } from './Select';

export const items = [
    {
        id: "1",
        value: "eat",
        title: "Eat"
    },
    {
        id: "2",
        value: "sleep",
        title: "Sleep"
    },
    {
        id: "3",
        value: "traing",
        title: "Traing"
    }
];

type TitleType = string | JSX.Element | JSX.Element[] | Element | Element[] | undefined;

interface ISelectChildrenProps {
    selectedTitle: TitleType;
    searchValue: TitleType;
    canOpen: boolean;
    onChangeSearch: (value: string) => void,
    onSelectItem: (_e: React.SyntheticEvent<EventTarget>, data: ISelectItem) => void;
}

interface ISelectWrapperProps {
    children: (data: ISelectChildrenProps) => JSX.Element;
}

export const SelectWrapper: React.FC<ISelectWrapperProps> = (props) => {
    const [selectedTitle, setSelectedTitle] = React.useState<TitleType>("");
    const [searchValue, setSearchValue] = React.useState<TitleType>("");
    const [canOpen, setCanOpen] = React.useState<boolean>(false);

    const handleSelectItem = (_e: React.SyntheticEvent<EventTarget>, data: ISelectItem) => {
        setSelectedTitle(data.title);
        setSearchValue(data.title);
    };

    const handleChangeSearch = (value: string) => {
        setSearchValue(value);
        setCanOpen(!!value);
    };

    return (
        <div style={{ height: "200px" }}>
            {props.children({
                onSelectItem: handleSelectItem,
                onChangeSearch: handleChangeSearch,
                selectedTitle,
                searchValue,
                canOpen
            })}
        </div>
    );
}
