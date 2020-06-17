import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCallback, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import SearchIcon from 'icons/Basic/16/Search_16.svg';
import SelectItem from '../Select/SelectItem';
import cnCreate from 'utils/cnCreate';
import './Search.less';

type HandleSearchFieldSubmit = (e?: React.MouseEvent<HTMLDivElement>) => void;
type HandleSelectSubmit = (e: React.MouseEvent | null, index: number) => void;
type HandleSelectSubmitWithEventOnly = (e: React.MouseEvent, index: number) => void;

export interface ISearchProps {
    /** Selected value. Should correlate with items.value */
    value?: string;
    /** Placeholder */
    placeholder?: string;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Submit handler */
    onSubmit?: (value: string) => void;
    /** Array of objects to be used for options rendering */
    items?: Array<{
        /** Header */
        title: string;
        /** Value */
        value: string;
    }>;
}

const cn = cnCreate('mfui-search');
const Search: React.FC<ISearchProps> = ({
        value = '',
        placeholder,
        onChange,
        onSubmit,
        items = [],
}) => {
    const [searchQuery, setSearchQuery] = useState(value);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isFocused, setFocus] = useState(false);
    const debouncedOnChange = useRef(debounce((inputValue) => onChange && onChange(inputValue), 500));

    const handleChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> =
        useCallback((e): void => {
            const { target: { value: inputValue = '' } = {} } = e;

            setSearchQuery(inputValue);
            setActiveIndex(-1);
            debouncedOnChange.current(inputValue);
        }, [setSearchQuery, setActiveIndex, debouncedOnChange]);

    const handleHoverItem = useCallback((_e: React.SyntheticEvent<EventTarget>, index: number) => {
        setActiveIndex(index);
    }, [activeIndex, setActiveIndex]);

    const handleSearchFieldSubmit: HandleSearchFieldSubmit = useCallback(() => {
             onSubmit && searchQuery && onSubmit(searchQuery);
        }, [searchQuery]);

    const handleSelectSubmit: HandleSelectSubmit =
        useCallback((_e, index) => {
            const chosenValue = items[index].value;

            onSubmit && onSubmit(chosenValue);
        }, [onSubmit, items]);

    const handleFieldFocus: React.EventHandler<React.FocusEvent<HTMLInputElement>> =
        useCallback(() => {
            setFocus(focus => !focus);
        }, [setFocus]);

    const handleClick: React.EventHandler<React.MouseEvent<HTMLInputElement>> =
        useCallback(() => {
            if (activeIndex >= 0) {
                setActiveIndex(-1);
            }
        }, [activeIndex, setActiveIndex]);

    const handleKeyDown: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> =
        useCallback(e => {
            if (e.key === 'ArrowDown' && activeIndex < items.length - 1) {
                setActiveIndex(index => index + 1);
                e.preventDefault();
            } else if (e.key === 'ArrowUp' && activeIndex > -1) {
                setActiveIndex(index => index - 1);
                e.preventDefault();
            } else if (e.key === 'Enter' && activeIndex > -1) {
                handleSelectSubmit(null, activeIndex);
            } else if (e.key === 'Enter' && activeIndex === -1) {
                handleSearchFieldSubmit();
            }

            return false;
        }, [activeIndex, setActiveIndex, handleSelectSubmit, handleSearchFieldSubmit]);

    return (
        <div className={cn('', { open: isFocused })}>
            <div
                className={cn('control')}
            >
                <input
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldFocus}
                    onKeyDown={handleKeyDown}
                    onClick={handleClick}
                    type="text"
                    maxLength={60}
                    autoComplete="off"
                    className={cn('search-field')}
                />
                <div
                    className={cn('icon-box')}
                    onClick={handleSearchFieldSubmit}
                >
                    <SearchIcon className={cn('icon')} />
                </div>
            </div>
            {items && !!items.length &&
                <div className={cn('list')}>
                    <div className={cn('list-inner')}>
                        {/* tslint:disable-next-line:no-shadowed-variable */}
                        {items.map(({ value, title }, i) =>
                            <SelectItem
                                title={title}
                                key={value + i}
                                index={i}
                                active={activeIndex === i}
                                onHover={handleHoverItem}
                                onSelect={handleSelectSubmit as HandleSelectSubmitWithEventOnly}
                            />
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

Search.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired
    ),
};

export default Search;
