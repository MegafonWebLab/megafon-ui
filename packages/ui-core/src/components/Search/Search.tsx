import * as React from 'react';
import * as PropTypes from 'prop-types';
import {useCallback, useState, useRef, useEffect} from 'react';
import SearchIcon from 'icons/Basic/16/Search_16.svg';
import debounce from 'lodash.debounce';
import SelectItem from '../Select/SelectItem';
import cnCreate from 'utils/cnCreate';
import './Search.less';

type HandleSearchSubmit = (e?: React.MouseEvent<HTMLDivElement>) => void;
type HandleSelectSubmit = (e: React.MouseEvent, index: number) => void;
type HandleItemSubmit = (index: number) => void;

export interface ISearchProps {
    /** Selected value. Should correlate with items.value */
    value?: string;
    /** Placeholder */
    placeholder?: string;
    /** Forcefully prohibits icon's render */
    hideIcon?: boolean;
    /** Array of objects to be used for options rendering */
    items?: Array<{
        /** Header */
        title: string;
        /** Value */
        value: string;
    }>;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Submit handler */
    onSubmit?: (value: string) => void;
}

const cn = cnCreate('mfui-search');
const Search: React.FC<ISearchProps> = ({
        value = '',
        placeholder,
        hideIcon,
        items = [],
        onChange,
        onSubmit,
}) => {
    const [searchQuery, setSearchQuery] = useState(value);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isFocused, setFocus] = useState(false);
    const debouncedOnChange = useRef(debounce((inputValue) => onChange && onChange(inputValue), 500));

    useEffect(() => setSearchQuery(value), [value, setSearchQuery]);

    const handleChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> =
        useCallback((e): void => {
            const { target: { value: inputValue = '' } } = e;

            setSearchQuery(inputValue);
            setActiveIndex(-1);
            debouncedOnChange.current(inputValue);
        }, [setSearchQuery, setActiveIndex, debouncedOnChange]);

    const handleHoverItem = useCallback((_e: React.SyntheticEvent<EventTarget>, index: number) => {
        setActiveIndex(index);
    }, [activeIndex, setActiveIndex]);

    const handleSearchSubmit: HandleSearchSubmit = useCallback(() => {
         onSubmit && searchQuery && onSubmit(searchQuery);
    }, [searchQuery]);

    const handleItemSubmit: HandleItemSubmit = useCallback((index: number) => {
        const chosenValue = items[index].value;
        onSubmit && onSubmit(chosenValue);
    }, [onSubmit, items]);

    const handleSelectSubmit: HandleSelectSubmit =
        useCallback((_e, index) => {
            handleItemSubmit(index);
        }, [handleItemSubmit]);

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
                handleItemSubmit(activeIndex);
            } else if (e.key === 'Enter' && activeIndex === -1) {
                handleSearchSubmit();
            }

            return false;
        }, [activeIndex, setActiveIndex, handleSearchSubmit]);

    return (
        <div className={cn({ open: isFocused })}>
            <div
                className={cn('control')}
            >
                <input
                    className={cn('search-field')}
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldFocus}
                    onKeyDown={handleKeyDown}
                    onClick={handleClick}
                    type="text"
                    autoComplete="off"
                />
                {!hideIcon && <div
                    className={cn('icon-box')}
                    onClick={handleSearchSubmit}
                >
                    <SearchIcon className={cn('icon')} />
                </div>}
            </div>
            {items && !!items.length &&
                <div className={cn('list')}>
                    <div className={cn('list-inner')}>
                        {items.map(({ value: iValue, title }, i) =>
                            <SelectItem
                                title={title}
                                key={iValue + i}
                                index={i}
                                active={activeIndex === i}
                                onHover={handleHoverItem}
                                onSelect={handleSelectSubmit}
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
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired
    ),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default Search;
