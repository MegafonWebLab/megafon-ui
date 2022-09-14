import React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import SearchIcon from '@megafon/ui-icons/basic-24-search_24.svg';
import debounce from 'lodash.debounce';
import * as PropTypes from 'prop-types';
import './Search.less';

type HandleSearchSubmit = (e?: React.MouseEvent<HTMLDivElement>) => void;
type HandleSelectSubmit = (i: number) => (e: React.MouseEvent) => void;
type HandleItemSubmit = (index: number) => void;

export const Verification = {
    VALID: 'valid',
    ERROR: 'error',
} as const;

type VerificationType = typeof Verification[keyof typeof Verification];

type ElementOrString = JSX.Element[] | JSX.Element | Element[] | Element;

export const SearchItemsPaddings = {
    SMALL: 'small',
    LARGE: 'large',
} as const;

export type SearchItem = {
    /** Значение value элемента */
    value: string;
    /** Настраиваемое отображение элементов в выпадающем списке */
    searchView?: ElementOrString;
    /** Размер горизонтальных отступов элемента */
    paddings?: typeof SearchItemsPaddings[keyof typeof SearchItemsPaddings];
};

export interface ISearchProps {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        searchField?: Record<string, string>;
        submit?: Record<string, string>;
        item?: Record<string, string>;
    };
    /** Значение */
    value?: string;
    /** Заголовок поля */
    label?: string;
    /** HTML идентификатор поля поиска */
    searchId?: string;
    /** Текст внутри поля по умолчанию */
    placeholder?: string;
    /** Запрещает отрисовку иконки */
    hideIcon?: boolean;
    /** Элементы выпадающего списка */
    items?: SearchItem[];
    /** Использование функции debounce для onChange */
    changeDelay?: number;
    /** Результат проверки данных */
    verification?: VerificationType;
    /** Дополнительный текст под полем. Свойство verification влияет на цвет текста. */
    noticeText?: string;
    /** Отключение поля ввода */
    disabled?: boolean;
    /** Делает поле обязательным */
    required?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        listItemTitle?: string;
        control?: string;
        icon?: string;
    };
    /** Обработчик изменения поля */
    onChange?: (value: string) => void;
    /** Обработчик нажатия на enter */
    onSubmit?: (value: string) => void;
    /** Обработчик выхода из фокуса */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /** Обработчик входа в фокус */
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const cn = cnCreate('mfui-search');
const Search: React.FC<ISearchProps> = ({
    dataAttrs,
    value = '',
    label,
    searchId = 'mfuiSearchId',
    placeholder,
    hideIcon,
    items = [],
    changeDelay = 250,
    verification,
    disabled,
    required,
    noticeText,
    className,
    classes,
    onChange,
    onSubmit,
    onBlur,
    onFocus,
}) => {
    const [searchQuery, setSearchQuery] = React.useState<string>(value);
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    const [isFocused, setFocus] = React.useState<boolean>(false);
    const debouncedOnChange = React.useRef<React.MutableRefObject<(string) => void>>(
        debounce((inputValue: string) => onChange && onChange(inputValue), changeDelay),
    );
    const highlightedItem = React.useRef<HTMLDivElement>(null);

    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {
                target: { value: inputValue = '' },
            } = e;

            setSearchQuery(inputValue);
            setActiveIndex(-1);

            if (changeDelay === 0) {
                onChange?.(inputValue);
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                debouncedOnChange.current(inputValue);
            }
        },
        [changeDelay, onChange],
    );

    const handleHoverItem = React.useCallback(
        (index: number) => (): void => {
            setActiveIndex(index);
        },
        [],
    );

    const handleSearchSubmit: HandleSearchSubmit = React.useCallback((): void => {
        onSubmit && searchQuery && onSubmit(searchQuery);
    }, [searchQuery, onSubmit]);

    const handleItemSubmit: HandleItemSubmit = React.useCallback(
        (index: number): void => {
            if (disabled) {
                return;
            }

            const chosenValue = items[index].value;

            onSubmit?.(chosenValue);
        },
        [disabled, items, onSubmit],
    );

    const handleSelectSubmit: HandleSelectSubmit = React.useCallback(
        () => (): void => {
            handleItemSubmit(activeIndex);
        },
        [handleItemSubmit, activeIndex],
    );

    const handleFocus = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>): void => {
            setFocus(true);

            onFocus?.(e);
        },
        [onFocus],
    );

    const handleBlur = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>): void => {
            setFocus(false);

            onBlur?.(e);
        },
        [onBlur],
    );

    const handleClick = React.useCallback((): void => {
        if (activeIndex >= 0) {
            setActiveIndex(-1);
        }
    }, [activeIndex]);

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>): boolean => {
            if (e.key === 'ArrowDown' && activeIndex < items.length - 1) {
                setActiveIndex(index => index + 1);
                e.preventDefault();
            } else if (e.key === 'ArrowUp' && activeIndex > -1) {
                setActiveIndex(index => index - 1);
                e.preventDefault();
            } else if (e.key === 'Enter' && activeIndex > -1) {
                handleItemSubmit(activeIndex);
                e.preventDefault();
            } else if (e.key === 'Enter' && activeIndex === -1) {
                handleSearchSubmit();
            }

            return false;
        },
        [activeIndex, items, handleItemSubmit, handleSearchSubmit],
    );

    React.useEffect(() => setSearchQuery(value), [value]);

    React.useEffect(() => {
        debouncedOnChange.current = debounce((inputValue: string) => onChange && onChange(inputValue), changeDelay);
    }, [changeDelay, onChange]);

    React.useEffect(() => {
        if (isFocused && disabled) {
            setFocus(false);
        }
    }, [disabled, isFocused]);

    React.useEffect(() => {
        if (activeIndex !== -1) {
            highlightedItem.current?.scrollIntoView?.({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [activeIndex, items]);

    const highlightString = (title: string) => {
        const query = searchQuery.replace(/[^A-Z-a-zА-ЯЁа-яё0-9]/g, w => `\\${w}`);
        const stringFragments = title.split(RegExp(`(${query})`, 'ig'));

        return (
            <>
                {stringFragments.map((fragment, i) => (
                    <React.Fragment key={i}>
                        {fragment.toLowerCase() === searchQuery.toLowerCase() ? (
                            <span className={cn('highlighted-fragment')}>{fragment}</span>
                        ) : (
                            fragment
                        )}
                    </React.Fragment>
                ))}
            </>
        );
    };

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn({ open: isFocused, disabled }, [className])}>
            <div
                className={cn(
                    'control',
                    { error: verification === Verification.ERROR, success: verification === Verification.VALID },
                    [classes?.control],
                )}
            >
                <label className={cn('search-wrapper', { labeled: !!label })} htmlFor={searchId}>
                    <input
                        {...filterDataAttrs(dataAttrs?.searchField)}
                        id={searchId}
                        className={cn('search-field', { filled: !!searchQuery })}
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        onClick={handleClick}
                        disabled={disabled}
                        type="text"
                        autoComplete="off"
                    />
                    {label && (
                        <div className={cn('label')}>
                            {label}
                            {required && <span className={cn('require-mark')}>*</span>}
                        </div>
                    )}
                </label>
                {!hideIcon && (
                    <div
                        {...filterDataAttrs(dataAttrs?.submit)}
                        className={cn('icon-box')}
                        onClick={handleSearchSubmit}
                    >
                        <SearchIcon className={cn('icon', [classes?.icon])} />
                    </div>
                )}

                {!!items.length && (
                    <div className={cn('list')}>
                        <div className={cn('list-inner')}>
                            {items.map(
                                (
                                    { value: itemValue, searchView, paddings = SearchItemsPaddings.LARGE }: SearchItem,
                                    i,
                                ) => (
                                    <div
                                        {...filterDataAttrs(dataAttrs?.item, i + 1)}
                                        ref={activeIndex === i ? highlightedItem : null}
                                        className={cn('list-item', { active: activeIndex === i, paddings })}
                                        onMouseDown={handleSelectSubmit(i)}
                                        onMouseEnter={handleHoverItem(i)}
                                        key={i}
                                    >
                                        <div className={cn('item-title', [classes?.listItemTitle])}>
                                            {searchView || highlightString(itemValue)}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </div>

            {noticeText && (
                <div
                    className={cn('notice', {
                        error: verification === Verification.ERROR,
                        success: verification === Verification.VALID,
                    })}
                >
                    {noticeText}
                </div>
            )}
        </div>
    );
};

Search.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        searchField: PropTypes.objectOf(PropTypes.string.isRequired),
        submit: PropTypes.objectOf(PropTypes.string.isRequired),
        item: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    value: PropTypes.string,
    label: PropTypes.string,
    searchId: PropTypes.string,
    placeholder: PropTypes.string,
    hideIcon: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            searchView: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element,
                PropTypes.arrayOf(PropTypes.element),
            ]),
            paddings: PropTypes.oneOf(Object.values(SearchItemsPaddings)),
        }).isRequired,
    ),
    changeDelay: PropTypes.number,
    verification: PropTypes.oneOf(['valid', 'error']),
    noticeText: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.shape({
        listItemTitle: PropTypes.string,
        control: PropTypes.string,
        icon: PropTypes.string,
    }),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

export default Search;
