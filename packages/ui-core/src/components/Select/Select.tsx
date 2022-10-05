import * as React from 'react';
import { Fragment, Reducer, useEffect, useReducer, useCallback } from 'react';
import { cnCreate, detectTouch, filterDataAttrs } from '@megafon/ui-helpers';
import debounce from 'lodash.debounce';
import * as PropTypes from 'prop-types';
import InputLabel from 'components/InputLabel/InputLabel';
import './Select.less';
import selectReducer, { initialState, ISelectAction, ISelectState, SelectActions } from './reducer/selectReducer';

const {
    UPDATE_ITEMS_LIST,
    UPDATE_VALUE_FROM_PROPS,
    COMBOBOX_VALUE_DEBOUNCE,
    COMBOBOX_INPUT_CHANGE,
    TOGGLE_DROPDOWN,
    UPDATE_SELECT_VALUE,
    SET_HOVERED_ITEM_INDEX,
} = SelectActions;

export const Verification = {
    VALID: 'valid',
    ERROR: 'error',
} as const;

type VerificationType = typeof Verification[keyof typeof Verification];

export const SelectTypes = {
    CLASSIC: 'classic',
    COMBOBOX: 'combobox',
} as const;

type SelectTypesType = typeof SelectTypes[keyof typeof SelectTypes];

export type SelectItemValueType = number | string | undefined;

type ElementOrString = JSX.Element[] | JSX.Element | Element[] | Element | string;
type ViewCallbackArguments = { filterValue: string; isItemActive: boolean };

export interface ISelectItem<T extends SelectItemValueType> {
    /** Заголовок элемента в выпадающем списке  */
    title: string;
    /** Значение value элемента */
    value: T;
    /** Настраиваемое отображение элементов в выпадающем списке  */
    view?: ElementOrString | ((data: ViewCallbackArguments) => ElementOrString);
    /** Настраиваемое отображение выбранного элемента в поле селекта  */
    selectedView?: JSX.Element | Element | React.ReactElement;
}

export interface ISelectProps<T extends SelectItemValueType> {
    /** Тип компонента */
    type?: SelectTypesType;
    /** Заголовок поля */
    label?: string;
    /** HTML идентификатор для заголовка поля */
    labelId?: string;
    /** Текущий выбранный элемент селекта (extends SelectItemValueType) */
    currentValue?: T;
    /** Результат проверки данных */
    verification?: VerificationType;
    /** Дополнительный текст под полем. Свойство verification влияет на цвет текста. */
    noticeText?: string;
    /** Отключение селекта */
    disabled?: boolean;
    /** Делает поле обязательным */
    required?: boolean;
    /** Текст внутри поля по умолчанию */
    placeholder?: string;
    /** Текст при отсутствии результатов поиска */
    notFoundText?: string;
    /** Массив элементов селекта */
    items: Array<ISelectItem<T>>;
    /** Отображать короткий выпадающий список */
    shortList?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        root?: string;
        control?: string;
        title?: string;
        titleInner?: string;
        list?: string;
        listInner?: string;
        listItem?: string;
        listItemTitle?: string;
    };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        label?: Record<string, string>;
        title?: Record<string, string>;
        input?: Record<string, string>;
        noticeText?: Record<string, string>;
        listItem?: Record<string, string>;
        listItemTitle?: Record<string, string>;
        notFound?: Record<string, string>;
    };
    /** Обработчик выбора элемента селекта */
    onSelect?: (
        e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | null,
        dataItem?: ISelectItem<T>,
    ) => void;
    /** Обработчик при открытом селекте */
    onOpened?: () => void;
    /** Обработчик при закрытом селекте */
    onClosed?: () => void;
}

// List of cases to check on component change:

// - Should correctly choose value and trigger callbacks with correct arguments on click or touch.
// - Should correctly choose value and trigger callbacks with correct arguments on choose via filtration in combobox.
// - Should highlight chosen item with bold only in cases without view
// - Should scroll to chosen element (to make it visible), highlight it with bold and set hovered on dropdown open.
// - Should scroll (to make hovered element visible) and highlight next/previous element on arrow up and arrow down presses when dropdown is opened.
// - Should correctly set value on enter press while some element hovered.
// - If select dropdown is closed and select focused, dropdown should toggle open on Enter press.
// - Opened dropdown could be closed only via value choose, click outside of select and on TAB press.
// - Should add event listener for outside of dropdown click on list open and remove it on list close.
// - onClose callback shouldn't fire multiple times on outside click if dropdown was opened multiple times.

const cn = cnCreate('mfui-select');
const Select = <T extends SelectItemValueType>({
    type = 'classic',
    disabled = false,
    verification,
    noticeText,
    label,
    labelId,
    required = false,
    className = '',
    classes = {},
    dataAttrs,
    notFoundText = 'Ничего не нашлось',
    items,
    placeholder,
    currentValue,
    shortList = false,
    onClosed,
    onOpened,
    onSelect,
}: ISelectProps<T>): JSX.Element => {
    const [selectState, changeSelectState] = useReducer<Reducer<ISelectState<T>, ISelectAction<T>>>(
        selectReducer,
        initialState,
    );

    const itemWrapperNode = React.useRef<HTMLDivElement | null>(null);
    const itemsNodeList = React.useRef<HTMLDivElement[]>([]);
    const selectNode = React.useRef<HTMLDivElement | null>(null);

    const { itemsList, comparableInputValue: filterValue, isOpened, hoveredItemIndex, inputValue } = selectState;

    const isTouch: boolean = detectTouch();
    const currentIndex = itemsList.findIndex(elem => elem.value === currentValue);

    const handleClickOutside = useCallback(
        (e: MouseEvent): void => {
            if ((e.target instanceof Node && selectNode.current?.contains(e.target)) || !isOpened) {
                return;
            }

            onClosed?.();
            changeSelectState({ type: TOGGLE_DROPDOWN, isOpened: false });
        },
        [onClosed, isOpened],
    );

    const scrollList = (itemIndex: number): void => {
        itemsNodeList.current[itemIndex]?.scrollIntoView?.({
            behavior: 'smooth',
            block: 'nearest',
        });
    };

    useEffect(() => {
        if (!isOpened) {
            // Changes hovered item on dropdown close to currently chosen to hover it on dropdown open
            changeSelectState({
                type: SET_HOVERED_ITEM_INDEX,
                hoveredItemIndex: currentIndex === -1 ? 0 : currentIndex,
            });

            return undefined;
        }

        onOpened?.();
        scrollList(currentIndex);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpened, currentIndex, onOpened, handleClickOutside]);

    useEffect(() => {
        changeSelectState({ type: UPDATE_ITEMS_LIST, items });
    }, [items]);

    useEffect(() => {
        if (currentIndex === -1) {
            return;
        }

        changeSelectState({
            type: UPDATE_VALUE_FROM_PROPS,
            hoveredItemIndex: currentIndex,
            inputValue: itemsList[currentIndex].title,
            comparableInputValue: itemsList[currentIndex].title,
        });
    }, [currentIndex, itemsList]);

    const debouncedComboboxChange = debounce((debounceFilterValue: string): void => {
        const query = debounceFilterValue.replace(/[^A-Z-a-zА-ЯЁа-яё0-9]/g, w => `\\${w}`);
        const debounceItemsList = items.filter(({ title }) => {
            if (debounceFilterValue.length <= title.length) {
                return RegExp(query, 'ig').test(title);
            }

            return false;
        });

        changeSelectState({
            type: COMBOBOX_VALUE_DEBOUNCE,
            items: debounceItemsList,
            comparableInputValue: debounceFilterValue,
        });
    }, 250);

    const handleSelectClick = (): void => {
        const isCurrentlyOpened = isOpened;

        changeSelectState({ type: TOGGLE_DROPDOWN, isOpened: !isCurrentlyOpened });
        isCurrentlyOpened && onClosed?.();
    };

    const handleSelectItem = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
        const currentItem = itemsList[hoveredItemIndex].value;

        const item = itemsList.find(elem => elem.value === currentItem);

        if (!item) {
            return;
        }

        const { title } = item;

        changeSelectState({
            type: UPDATE_SELECT_VALUE,
            inputValue: title,
            comparableInputValue: title,
            items,
        });

        onSelect?.(e, item);
        onClosed?.();
    };

    const handleHoverItem =
        (index: number) =>
        (e: React.MouseEvent<HTMLDivElement>): void => {
            e.preventDefault();

            changeSelectState({ type: SET_HOVERED_ITEM_INDEX, hoveredItemIndex: index });
        };

    const handleComboboxFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
        e.stopPropagation();

        changeSelectState({ type: TOGGLE_DROPDOWN, isOpened: !isOpened });

        if (!isOpened && itemsList) {
            e.target.select();
        }
    };

    const handleChangeCombobox = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const comboboxValue = e.target.value;

        onSelect && onSelect(null);
        changeSelectState({ type: COMBOBOX_INPUT_CHANGE, inputValue: comboboxValue });
        debouncedComboboxChange(comboboxValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): boolean => {
        if (itemsList.length === 0 || disabled) {
            return true;
        }

        if (e.key === 'ArrowDown' && isOpened && hoveredItemIndex < itemsList.length - 1) {
            const nextIndex = hoveredItemIndex + 1;

            e.preventDefault();

            changeSelectState({ type: SET_HOVERED_ITEM_INDEX, hoveredItemIndex: nextIndex });
            scrollList(nextIndex);

            return false;
        }

        if (e.key === 'ArrowUp' && isOpened && hoveredItemIndex > 0) {
            const nextIndex = hoveredItemIndex - 1;

            e.preventDefault();

            changeSelectState({ type: SET_HOVERED_ITEM_INDEX, hoveredItemIndex: nextIndex });
            scrollList(nextIndex);

            return false;
        }

        if (e.key === 'Enter' && isOpened) {
            handleSelectItem(e);

            return false;
        }

        if (e.key === 'Enter' && !isOpened) {
            changeSelectState({ type: TOGGLE_DROPDOWN, isOpened: true });
            onOpened?.();

            return false;
        }

        if (e.key === 'Tab') {
            changeSelectState({ type: TOGGLE_DROPDOWN, isOpened: false });

            return false;
        }

        return true;
    };

    const highlightString = (
        title: string,
        isItemActive: boolean,
        view?: ElementOrString | ((data: ViewCallbackArguments) => ElementOrString),
    ) => {
        if (type === SelectTypes.CLASSIC) {
            if (typeof view === 'function' && !React.isValidElement(view)) {
                return view({ filterValue: inputValue, isItemActive });
            }

            return view || title;
        }

        if (type === SelectTypes.COMBOBOX && view) {
            if (typeof view === 'function' && !React.isValidElement(view)) {
                return view({ filterValue: inputValue, isItemActive });
            }

            return view;
        }

        const stringFragments = title.split(RegExp(`(${filterValue})`, 'ig'));

        return (
            <>
                {stringFragments.map((fragment, i) => (
                    <Fragment key={i}>
                        {fragment.toLowerCase() === filterValue.toLowerCase() && fragment !== '' ? (
                            <span className={cn('highlighted-fragment')}>{fragment}</span>
                        ) : (
                            fragment
                        )}
                    </Fragment>
                ))}
            </>
        );
    };

    const getNodeList = useCallback(
        (node: HTMLDivElement) => {
            if (filterValue.trim()) {
                itemsNodeList.current = [];

                return;
            }

            !filterValue && node && itemsNodeList.current.push(node);
        },
        [filterValue],
    );

    const renderTitle = (): JSX.Element => {
        const item = items.find(elem => elem.value === currentValue);
        let inputTitle: string | JSX.Element | Element | undefined = placeholder;

        if (item && item.title) {
            inputTitle = item.selectedView ? item.selectedView : item.title;
        }

        return (
            <div
                {...filterDataAttrs(dataAttrs?.title)}
                className={cn(
                    'title',
                    {
                        placeholder: !!placeholder && currentValue === undefined,
                    },
                    [classes?.title],
                )}
                role="button"
                tabIndex={0}
                onClick={handleSelectClick}
            >
                <div className={cn('title-inner', [classes?.titleInner])}>{inputTitle}</div>
            </div>
        );
    };

    const renderCombobox = (): JSX.Element => (
        <input
            {...filterDataAttrs(dataAttrs?.input)}
            className={cn('combobox')}
            onFocus={handleComboboxFocus}
            onChange={handleChangeCombobox}
            type="text"
            value={inputValue}
            placeholder={placeholder}
        />
    );

    const renderChildren = (): JSX.Element => {
        const currentItems = type === SelectTypes.COMBOBOX ? itemsList : items;

        return (
            <div className={cn('list', [classes.list])}>
                <div className={cn('list-inner', { short: shortList }, [classes.listInner])} ref={itemWrapperNode}>
                    {currentItems.map(({ title, value, view }, i) => {
                        const isItemActive = currentValue === value;

                        return (
                            <div
                                {...filterDataAttrs(dataAttrs?.listItem, i + 1)}
                                className={cn(
                                    'list-item',
                                    {
                                        hovered: hoveredItemIndex === i,
                                    },
                                    [classes.listItem],
                                )}
                                key={`${i}_${value}`}
                                onClick={handleSelectItem}
                                onMouseEnter={handleHoverItem(i)}
                                ref={getNodeList}
                            >
                                <div
                                    {...filterDataAttrs(dataAttrs?.listItemTitle, i + 1)}
                                    className={cn('item-title', { active: isItemActive && !view }, [
                                        classes.listItemTitle,
                                    ])}
                                >
                                    {highlightString(title, isItemActive, view)}
                                </div>
                            </div>
                        );
                    })}
                    {type === SelectTypes.COMBOBOX && !currentItems.length && (
                        <div {...filterDataAttrs(dataAttrs?.notFound)} className={cn('not-found')}>
                            {notFoundText}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn(
                {
                    open: isOpened,
                    disabled,
                    'no-touch': !isTouch,
                    valid: verification === Verification.VALID,
                    error: verification === Verification.ERROR,
                },
                [className, classes.root],
            )}
            ref={selectNode}
        >
            <div className={cn('inner')}>
                {label && (
                    <InputLabel dataAttrs={{ root: dataAttrs?.label }} htmlFor={labelId}>
                        {label}
                        {required && <span className={cn('require-mark')}>*</span>}
                    </InputLabel>
                )}
                <div className={cn('control', classes.control)} onKeyDown={handleKeyDown}>
                    {type === SelectTypes.COMBOBOX && renderCombobox()}
                    {type === SelectTypes.CLASSIC && renderTitle()}
                </div>
                {renderChildren()}
            </div>
            {noticeText && (
                <div
                    {...filterDataAttrs(dataAttrs?.noticeText)}
                    className={cn('text', {
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

Select.propTypes = {
    type: PropTypes.oneOf(Object.values(SelectTypes)),
    label: PropTypes.string,
    id: PropTypes.string,
    currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    verification: PropTypes.oneOf(Object.values(Verification)),
    noticeText: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    notFoundText: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        control: PropTypes.string,
        title: PropTypes.string,
        titleInner: PropTypes.string,
        list: PropTypes.string,
        listInner: PropTypes.string,
        listItem: PropTypes.string,
        listItemTitle: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        label: PropTypes.objectOf(PropTypes.string.isRequired),
        title: PropTypes.objectOf(PropTypes.string.isRequired),
        input: PropTypes.objectOf(PropTypes.string.isRequired),
        noticeText: PropTypes.objectOf(PropTypes.string.isRequired),
        listItem: PropTypes.objectOf(PropTypes.string.isRequired),
        listItemTitle: PropTypes.objectOf(PropTypes.string.isRequired),
        notFound: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    items: PropTypes.arrayOf(
        PropTypes.exact({
            view: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
            selectedView: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
            title: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }),
    ).isRequired,
    shortList: PropTypes.bool,
    onSelect: PropTypes.func,
    onOpened: PropTypes.func,
    onClosed: PropTypes.func,
};

export default Select;
