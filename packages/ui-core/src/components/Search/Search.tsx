import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCallback, useState, useRef, useEffect } from 'react';
import SearchIcon from 'icons/Basic/16/Search_16.svg';
import debounce from 'lodash.debounce';
import cnCreate from 'utils/cnCreate';
import './Search.less';

type HandleSearchSubmit = (e?: React.MouseEvent<HTMLDivElement>) => void;
type HandleSelectSubmit = (i: number) => (e: React.MouseEvent) => void;
type HandleItemSubmit = (index: number) => void;

export interface ISearchProps {
    /** Selected value. Should correlate with items.value */
    value?: string;
    /** Placeholder */
    placeholder?: string;
    /** Forcefully prohibits icon's render */
    hideIcon?: boolean;
    /** Array of strings to be used for options rendering */
    items?: string[];
    /** Debounce delay */
    changeDelay?: number;
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
        changeDelay = 250,
        onChange,
        onSubmit,
}) => {
    const [searchQuery, setSearchQuery] = useState(value);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isFocused, setFocus] = useState(false);
    const debouncedOnChange = useRef(debounce((inputValue) => onChange && onChange(inputValue), changeDelay));

    useEffect(() => setSearchQuery(value), [value, setSearchQuery]);

    const handleChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
        const { target: { value: inputValue = '' } } = e;

        setSearchQuery(inputValue);
        setActiveIndex(-1);

        changeDelay === 0 ? onChange && onChange(inputValue) : debouncedOnChange.current(inputValue);
    };

    const handleHoverItem = useCallback((index: number) => (_e: React.SyntheticEvent<EventTarget>): void => {
        setActiveIndex(index);
    }, [setActiveIndex]);

    const handleSearchSubmit: HandleSearchSubmit = useCallback((): void => {
        onSubmit && searchQuery && onSubmit(searchQuery);
    }, [searchQuery, onSubmit]);

    const handleItemSubmit: HandleItemSubmit = useCallback((index: number): void => {
        const chosenValue = items[index];

        onSubmit && onSubmit(chosenValue);
    }, [onSubmit, items]);

    const handleSelectSubmit: HandleSelectSubmit =
        useCallback(() => (_e): void => {
            handleItemSubmit(activeIndex);
        }, [handleItemSubmit, activeIndex]);

    const handleFieldFocusToggle = useCallback((): void => {
        setFocus(focus => !focus);
    }, [setFocus]);

    const handleClick = useCallback((): void => {
        if (activeIndex >= 0) {
            setActiveIndex(-1);
        }
    }, [activeIndex, setActiveIndex]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>): boolean => {
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
    }, [activeIndex, setActiveIndex, handleSearchSubmit, handleItemSubmit]);

    const highlightString = (title) => {
        const stringFragments = title.split(RegExp(`(${searchQuery})`, 'ig'));

        return (
            <div>
                {stringFragments.map((fragment, i) => (
                    <React.Fragment key={i}>
                        {(fragment.toLowerCase() === searchQuery.toLowerCase())
                            ? <span className={cn('highlighted-fragment')}>{fragment}</span>
                            : fragment
                        }
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className={cn({ open: isFocused })}>
            <div className={cn('control')}>
                <input
                    className={cn('search-field')}
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={handleFieldFocusToggle}
                    onBlur={handleFieldFocusToggle}
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
                        {items.map((title, i) =>
                            <div
                                className={cn('list-item', { active: activeIndex === i })}
                                onMouseDown={handleSelectSubmit(i)}
                                onMouseEnter={handleHoverItem(i)}
                                key={i}
                            >
                                <div className={cn('item-title')}>
                                    {highlightString(title)}
                                </div>
                            </div>
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
    hideIcon: PropTypes.bool,
    changeDelay: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string.isRequired),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default Search;
