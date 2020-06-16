import * as React from 'react';
import {useCallback, useState} from 'react';
import Search from './Search';

const SearchContainer: React.FC = () => {
    const [items, setItems] = useState([]);

    const onChange = useCallback((query: string) => {
        setItems((oldItems): any => [...oldItems, { title: query, value: query }]);
    }, [items, setItems]);

    return (
        <Search onChange={onChange} items={items} placeholder="Type and wait for results" />
    );
};

export default SearchContainer;
