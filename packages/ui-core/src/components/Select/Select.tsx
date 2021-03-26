import * as React from 'react';
import * as PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './Select.less';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import InputLabel from 'components/InputLabel/InputLabel';
import filterDataAttrs, { IDataAttributes } from './../../utils/dataAttrs';

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

export interface ISelectItem {
    title: string;
    value: SelectItemValueType;
    view?: JSX.Element[] | Element[] | JSX.Element | string | Element;
}

export interface ISelectProps extends IDataAttributes {
    /** Тип компонента */
    type?: SelectTypesType;
    /** Заголовок поля */
    label?: string;
    /** HTML идентификатор для заголовка поля */
    labelId?: string;
    /** Текущий выбранный элемент селекта */
    currentValue?: SelectItemValueType;
    /** Результат проверки данных */
    verification?: VerificationType;
    /** Дополнительный текст под полем. Свойство verification влияет на цвет текста. */
    noticeText?: string;
    /** Управление возможностью взаимодействия с компонентом */
    isDisabled?: boolean;
    /** Делает поле обязательным */
    required?: boolean;
    /** Текст внутри поля по умолчанию */
    placeholder?: string;
    /** Текст при отсутствии результатов поиска */
    notFoundText?: string;
    /** Массив элементов селекта */
    items: ISelectItem[];
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        root?: string;
        control?: string;
        list?: string;
        listItem?: string;
        listItemTitle?: string;
    };
    /** Обработчик выбора элемента селекта */
    onSelect?: (
        e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, dataItem: ISelectItem
    ) => void;
    /** Обработчик при отркытом селекте */
    onOpened?: () => void;
    /** Обработчик при закрытом селекте */
    onClosed?: () => void;
}

interface ISelectState {
    isOpened: boolean;
    activeIndex: number;
    filteredItems: ISelectItem[];
    comparableInputValue: string;
    inputValue: string;
}

const cn = cnCreate('mfui-beta-select');
class Select extends React.Component<ISelectProps, ISelectState> {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(SelectTypes)),
        label: PropTypes.string,
        id: PropTypes.string,
        currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        verification: PropTypes.oneOf(Object.values(Verification)),
        noticeText: PropTypes.string,
        isDisabled: PropTypes.bool,
        required: PropTypes.bool,
        placeholder: PropTypes.string,
        notFoundText: PropTypes.string,
        className: PropTypes.string,
        classes: PropTypes.shape({
            root: PropTypes.string,
            control: PropTypes.string,
            list: PropTypes.string,
            listItem: PropTypes.string,
            listItemTitle: PropTypes.string,
        }),
        items: PropTypes.arrayOf(
            PropTypes.shape({
                view: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.element,
                ]),
                title: PropTypes.node,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            })
        ),
        onSelect: PropTypes.func,
        dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
        onOpened: PropTypes.func,
        onClosed: PropTypes.func,
    };

    static defaultProps: Partial<ISelectProps> = {
        isDisabled: false,
        required: false,
        type: 'classic',
        notFoundText: 'Ничего не нашлось',
        items: [],
    };

    itemWrapperNode: HTMLDivElement;
    itemsNodeList: HTMLDivElement[];
    selectNode: HTMLDivElement;

    isTouch: boolean = detectTouch();

    debouncedComboboxChange = debounce((filterValue: string) => {
        const { items } = this.props;

        const filteredItems = items.filter(({ title }) => {
            if (filterValue.length <= title.length) {
                return RegExp(filterValue, 'ig').test(title);
            }

            return false;
        });

        this.setState({ filteredItems, comparableInputValue: filterValue, isOpened: true, activeIndex: 0 });
    }, 250);

    constructor(props: ISelectProps) {
        super(props);

        this.state = {
            isOpened: false,
            activeIndex: 0,
            filteredItems: props.items,
            comparableInputValue: '',
            inputValue: '',
        };
        this.itemsNodeList = [];
    }

    componentDidMount() {
        const { currentValue } = this.props;
        const { filteredItems } = this.state;
        const currentIndex = filteredItems.findIndex(elem => elem.value === currentValue);

        if (currentIndex !== -1) {
            this.setState({
                activeIndex: currentIndex,
                inputValue: filteredItems[currentIndex].title,
                comparableInputValue: filteredItems[currentIndex].title,
            });
        }
    }

    componentDidUpdate({ items: prevItems }: ISelectProps) {
        const { items } = this.props;
        const { isOpened } = this.state;

        if (!this.isEqualItems(items, prevItems)) {
            this.setState({ filteredItems: items });
        }

        if (isOpened) {
            document.addEventListener('click', this.handleClickOutside);

            return;
        }

        document.removeEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    isEqualItems = (items: ISelectItem[], prevItems: ISelectItem[]) => {
        if (items.length !== prevItems.length) {
            return false;
        }

        return items.every((item, i) => {
            const isEqualValue = item.value === prevItems[i].value;
            const isEqualTitle = item.title === prevItems[i].title;

            return isEqualValue && isEqualTitle;
        });
    }

    handleOpened = () => {
        const { onOpened } = this.props;

        onOpened && onOpened();
    }

    handleClosed = () => {
        const { onClosed } = this.props;

        onClosed && onClosed();
    }

    handleClickOutside = (e: MouseEvent): void => {
        const { isOpened } = this.state;

        if (e.target instanceof Node && this.selectNode.contains(e.target) || !isOpened) {
            return;
        }

        this.setState({ isOpened: false }, () => {
            if (!this.state.isOpened) {
                this.handleClosed();
            }
        });
    }

    handleOpenDropdown = (): void => {
        this.setState((state) => ({ isOpened: !state.isOpened }), () => {
            if (this.state.isOpened) {
                this.handleOpened();
            } else {
                this.handleClosed();
            }
        });
    }

    handleSelectItem = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
        const { onSelect, items } = this.props;
        const { activeIndex, filteredItems } = this.state;

        const currentItem = filteredItems[activeIndex].value;

        const item = filteredItems.find(elem => elem.value === currentItem);

        if (!item) {
            return;
        }

        const { title } = item;

        this.setState({isOpened: false, inputValue: title, comparableInputValue: title, filteredItems: items });

        onSelect && onSelect(e, item);
        this.handleClosed();
    }

    handleHoverItem = (index: number) => (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();

        this.setState({ activeIndex: index });
    }

    handleComboboxFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
        const { isOpened, filteredItems } = this.state;

        e.stopPropagation();

        this.setState((state) => ({ isOpened: !state.isOpened }));
        this.handleOpened();

        if (!isOpened && filteredItems) {
            e.target.select();
        }
    }

    handleChangeCombobox = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const filterValue = e.target.value;

        this.setState({ inputValue: filterValue });

        this.debouncedComboboxChange(filterValue);
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): boolean => {
        const { activeIndex, isOpened, filteredItems } = this.state;
        const { isDisabled } = this.props;

        if (filteredItems.length === 0 || isDisabled) {
            return true;
        }

        if (e.key === 'ArrowDown' && isOpened && activeIndex < filteredItems.length - 1) {
            this.setState({ activeIndex: activeIndex + 1 }, () => {
                this.scrollList(this.state.activeIndex);
            });

            e.preventDefault();

            return false;
        }
        if (e.key === 'ArrowUp' && isOpened && activeIndex > 0) {
            this.setState((prevState) => ({ activeIndex: prevState.activeIndex - 1 }), () => {
                this.scrollList(this.state.activeIndex);
            });

            e.preventDefault();

            return false;
        }
        if (e.key === 'Enter' && isOpened) {
            this.handleSelectItem(e);

            return false;
        }
        if (e.key === 'Enter' && !isOpened) {
            this.setState({ isOpened: true });
            this.handleOpened();

            return false;
        }
        if (e.key === 'Tab') {
            this.setState({ isOpened: false });

            return false;
        }

        return true;
    }

    scrollList(activeIndex: number): void {
        if (!this.itemsNodeList) {
            return;
        }

        const wrapper = this.itemWrapperNode;
        const wrapperScroll = wrapper.scrollTop;
        const wrapperHeight = wrapper.offsetHeight;

        const item = this.itemsNodeList[activeIndex];

        if (!item) {
            return;
        }

        const itemOffset = item.offsetTop;
        const itemHeight = item.offsetHeight;

        if (itemOffset + itemHeight > wrapperScroll + wrapperHeight) {
            wrapper.scrollTop = itemOffset + itemHeight - wrapperHeight;
        }

        if (itemOffset < wrapperScroll) {
            wrapper.scrollTop = itemOffset;
        }
    }

    highlightString = (title, view) => {
        const { type } = this.props;
        const { comparableInputValue } = this.state;

        if (type === SelectTypes.CLASSIC) {
            return view || title;
        }
        if (type === SelectTypes.COMBOBOX && view) {
            return view;
        }

        const stringFragments = title.split(RegExp(`(${comparableInputValue})`, 'ig'));

        return (
            <>
                {stringFragments.map((fragment, i) => (
                    <React.Fragment key={i}>
                        {(fragment.toLowerCase() === comparableInputValue.toLowerCase() && fragment !== '')
                            ? <span className={cn('highlighted-fragment')}>{fragment}</span>
                            : fragment
                        }
                    </React.Fragment>
                ))}
            </>
        );
    }

    getItemWrapper = node => this.itemWrapperNode = node;
    getSelectNode = node => this.selectNode = node;
    getNodeList = node => this.itemsNodeList.push(node);

    renderTitle() {
        const { placeholder, items, currentValue } = this.props;
        const item = items.find(elem => elem.value === currentValue);
        let inputTitle: string | undefined = placeholder;

        if (item && item.title) {
            inputTitle = item.title;
        }

        return (
            <div
                className={cn('title', {
                    placeholder: !!placeholder && !currentValue,
                })}
                tabIndex={0}
                onClick={this.handleOpenDropdown}
            >
                <div className={cn('title-inner')}>
                    {inputTitle}
                </div>
            </div>
        );
    }

    renderCombobox() {
        const { placeholder } = this.props;
        const { inputValue } = this.state;

        return (
            <input
                className={cn('combobox')}
                onFocus={this.handleComboboxFocus}
                onChange={this.handleChangeCombobox}
                type="text"
                value={inputValue}
                placeholder={placeholder}
            />
        );
    }

    renderChildren() {
        const { type, items, notFoundText, classes = {} } = this.props;
        const { filteredItems, activeIndex } = this.state;
        const currentItems = type === SelectTypes.COMBOBOX ? filteredItems : items;

        return (
            <div className={cn('list', [classes.list])}>
                <div className={cn('list-inner')} ref={this.getItemWrapper}>
                    {currentItems.map(({ title, value, view }, i) => (
                        <div
                            className={cn('list-item', {
                                active: activeIndex === i,
                            }, [classes.listItem])}
                            key={`${i}_${value}`}
                            onClick={this.handleSelectItem}
                            onMouseEnter={this.handleHoverItem(i)}
                            ref={this.getNodeList}
                        >
                            <div className={cn('item-title', [classes.listItemTitle])}>
                                {this.highlightString(title, view)}
                            </div>
                        </div>
                    ))}
                    {type === SelectTypes.COMBOBOX && !currentItems.length && (
                        <div className={cn('not-found')}>{notFoundText}</div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        const {
            type,
            isDisabled,
            verification,
            noticeText,
            label,
            labelId,
            required,
            className = '',
            classes = {},
            dataAttrs,
        } = this.props;
        const { isOpened } = this.state;

        return (
            <div
                {...filterDataAttrs(dataAttrs)}
                className={cn({
                    open: isOpened,
                    disabled: isDisabled,
                    'no-touch': !this.isTouch,
                    valid: verification === Verification.VALID,
                    error: verification === Verification.ERROR,
                }, [className, classes.root])}
                ref={this.getSelectNode}
            >
                <div className={cn('inner')}>
                    {label && (
                        <InputLabel htmlFor={labelId}>
                            {label}
                            {required && <span className={cn('require-mark')}>*</span>}
                        </InputLabel>
                    )}
                    <div
                        className={cn('control', classes.control)}
                        onKeyDown={this.handleKeyDown}
                    >
                        {(type === SelectTypes.COMBOBOX) && this.renderCombobox()}
                        {(type === SelectTypes.CLASSIC) && this.renderTitle()}
                        <div className={cn('arrow-wrap')} tabIndex={1} onClick={this.handleOpenDropdown}>
                            <span className={cn('arrow')} />
                        </div>
                    </div>
                    {this.renderChildren()}
                </div>
                {noticeText &&
                    <div className={cn('text', {
                        error: verification === Verification.ERROR,
                        success: verification === Verification.VALID,
                    })}>
                        {noticeText}
                    </div>
                }
            </div>
        );
    }
}

export default Select;
