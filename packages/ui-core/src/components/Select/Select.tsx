import * as React from 'react';
import * as PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './Select.less';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import InputLabel from 'components/InputLabel/InputLabel';
import Paragraph from 'components/Paragraph/Paragraph';
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

export type SelectItemValueType = number | string;

export interface ISelectItem {
    title: string;
    value: SelectItemValueType;
    view?: JSX.Element[] | Element[] | JSX.Element | string | Element;
}

interface ISelectClasses {
    control?: string;
    root?: string;
}

export interface ISelectProps extends IDataAttributes {
    /** Select type */
    type?: SelectTypesType;
    /** Field title */
    label?: string;
    /** Html id attribute for label */
    labelId?: string;
    /** Current selected item */
    currentValue?: SelectItemValueType;
    /** Verification */
    verification?: VerificationType;
    /** Notice text */
    noticeText?: string;
    /** isDisabled field */
    isDisabled?: boolean;
    /** Makes the field required. */
    required?: boolean;
    /** Placeholder */
    placeholder?: string;
    /** Text in the absence of search results */
    notFoundText?: string;
    /** Array of objects to be used for options rendering */
    items: ISelectItem[];
    /** Custom classname */
    className?: string;
    /** Object for the custom class */
    classes?: ISelectClasses;
    /** Select item handler */
    onSelect?: (e: React.MouseEvent<HTMLDivElement>, dataItem: ISelectItem) => void;
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
            control: PropTypes.string,
            root: PropTypes.string,
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
    };

    static defaultProps: Partial<ISelectProps> = {
        type: SelectTypes.CLASSIC,
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

        this.setState({ filteredItems, comparableInputValue: filterValue, isOpened: true });
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

    componentDidUpdate() {
        const { isOpened } = this.state;

        if (isOpened) {
            document.addEventListener('click', this.handleClickOutside);

            return;
        }

        document.removeEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (e: MouseEvent): void => {
        const { isOpened } = this.state;

        if (e.target instanceof Node && this.selectNode.contains(e.target) || !isOpened) {
            return;
        }

        this.setState({ isOpened: false });
    }

    handleOpenDropdown = (): void => {
        this.setState((state) => ({ isOpened: !state.isOpened }));
    }

    handleClickItem = (itemValue: SelectItemValueType) => (e: React.MouseEvent<HTMLDivElement>): void => {
        const { onSelect, items } = this.props;
        const item = items.find(elem => elem.value === itemValue);

        if (!item) {
            return;
        }

        const { title } = item;

        this.setState({isOpened: false, inputValue: title });

        onSelect && onSelect(e, item);
    }

    handleHoverItem = (index: number) => (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();

        this.setState({ activeIndex: index });
    }

    handleClickCombobox = (e: React.FormEvent<EventTarget>): void => {
        const { isOpened, filteredItems } = this.state;

        e.stopPropagation();

        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }

        if (!isOpened && filteredItems) {
            e.target.select();
        }

        this.setState((state) => ({ isOpened: !state.isOpened }));
    }

    handleChangeCombobox = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const filterValue = e.target.value;

        this.setState({ inputValue: filterValue });

        this.debouncedComboboxChange(filterValue);
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): boolean => {
        const { activeIndex, isOpened } = this.state;
        const { items } = this.props;

        if (items.length === 0) {
            return true;
        }

        if (e.key === 'ArrowDown' && activeIndex < items.length - 1) {
            this.setState({ activeIndex: activeIndex + 1 }, () => {
                this.scrollList(this.state.activeIndex);
            });

            e.preventDefault();

            return false;
        }
        if (e.key === 'ArrowUp' && activeIndex > 0) {
            this.setState((prevState) => ({ activeIndex: prevState.activeIndex - 1 }), () => {
                this.scrollList(this.state.activeIndex);
            });

            e.preventDefault();

            return false;
        }
        if (e.key === 'Enter' && isOpened) {
            this.itemsNodeList[activeIndex].click();

            return false;
        }
        if (e.key === 'Enter' && !isOpened) {
            this.setState({ isOpened: true });

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
            <Paragraph hasMargin={false}>
                {stringFragments.map((fragment, i) => (
                    <React.Fragment key={i}>
                        {(fragment.toLowerCase() === comparableInputValue.toLowerCase())
                            ? <span className={cn('highlighted-fragment')}>{fragment}</span>
                            : fragment
                        }
                    </React.Fragment>
                ))}
            </Paragraph>
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
                onClick={this.handleClickCombobox}
                onChange={this.handleChangeCombobox}
                type="text"
                value={inputValue}
                placeholder={placeholder}
            />
        );
    }

    renderChildren() {
        const { type, items, notFoundText } = this.props;
        const { filteredItems, activeIndex } = this.state;
        const currentItems = type === SelectTypes.COMBOBOX ? filteredItems : items;

        return (
            <div className={cn('list')}>
                <div className={cn('list-inner')} ref={this.getItemWrapper}>
                    {currentItems.map(({ title, value, view }, i) => (
                        <div
                            className={cn('list-item', {
                                active: activeIndex === i,
                            })}
                            key={`${i}_${value}`}
                            onClick={this.handleClickItem(value)}
                            onMouseEnter={this.handleHoverItem(i)}
                            ref={this.getNodeList}
                        >
                            <div className={cn('item-title')}>
                                {this.highlightString(title, view)}
                            </div>
                        </div>
                    ))}
                    {!currentItems.length && <div className={cn('not-found')}>{notFoundText}</div>}
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
