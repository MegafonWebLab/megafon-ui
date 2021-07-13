import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCallback, useState, useRef, useEffect } from 'react';
import SearchIcon from 'icons/Basic/24/Search_24.svg';
import debounce from 'lodash.debounce';
import { cnCreate } from '@megafon/ui-helpers';
import './Search.less';

type HandleSearchSubmit = (e?: React.MouseEvent<HTMLDivElement>) => void;
type HandleSelectSubmit = (i: number) => (e: React.MouseEvent) => void;
type HandleItemSubmit = (index: number) => void;

export interface ISearchProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        listItemTitle?: string;
        control?: string;
    };
    /** Значение */
    value?: string;
    /** Текст внутри поля по умолчанию */
    placeholder?: string;
    /** Запрещает отрисовку иконки */
    hideIcon?: boolean;
    /** Список строк выпадающего списка */
    items?: string[];
    /** Использование функции debounce для onChange */
    changeDelay?: number;
    /** Обработчик изменения поля */
    onChange?: (value: string) => void;
    /** Обработчик нажатия на enter */
    onSubmit?: (value: string) => void;
}

const cn = cnCreate('mfui-beta-search');
const Search: React.FC<ISearchProps> = ({
        value = '',
        placeholder,
        hideIcon,
        items = [],
        changeDelay = 250,
        className,
        classes,
        onChange,
        onSubmit,
}) => {
    const [searchQuery, setSearchQuery] = useState(value);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isFocused, setFocus] = useState(false);
    const debouncedOnChange = useRef(debounce((inputValue: string) => onChange && onChange(inputValue), changeDelay));

    React.useEffect(() => {
        debouncedOnChange.current = debounce((inputValue: string) => onChange && onChange(inputValue), changeDelay);
    }, [onChange]);

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
            <>
                {stringFragments.map((fragment, i) => (
                    <React.Fragment key={i}>
                        {(fragment.toLowerCase() === searchQuery.toLowerCase())
                            ? <span className={cn('highlighted-fragment')}>{fragment}</span>
                            : fragment
                        }
                    </React.Fragment>
                ))}
            </>
        );
    };

    return (
        <div className={cn({ open: isFocused }, [className])}>
            <div className={cn('control', [classes?.control])}>
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
                                <div className={cn('item-title', [classes?.listItemTitle])}>
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
