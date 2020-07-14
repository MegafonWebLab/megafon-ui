import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Select.less';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import InputLabel from 'components/InputLabel/InputLabel';
import Paragraph from 'components/Paragraph/Paragraph';

export interface ISelectItem {
    title: string;
    view?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    value: number;
}

interface ISelectClasses {
    control?: string;
    root?: string;
}

enum Verification {
    VALID = 'valid',
    ERROR = 'error',
}

enum Types {
    CLASSIC = 'classic',
    COMBOBOX = 'combobox',
}

interface ISelectProps {
    /** Select type */
    type?: Types;
    /** Field title */
    label?: string;
    /** Html id attribute for label */
    labelId?: string;
    /** Current selected item */
    currentValue?: number;
    /** Verification */
    verification?: Verification;
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
    onSelect?: (e: React.SyntheticEvent<EventTarget>, dataItem: ISelectItem) => void;
}

interface ISelectState {
    isOpen: boolean;
    activeIndex: number;
    comboboxItems: ISelectItem[];
    inputValue: string;
}

const cn = cnCreate('mfui-select');
class Select extends React.Component<ISelectProps, ISelectState> {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(Types)),
        label: PropTypes.string,
        id: PropTypes.string,
        currentValue: PropTypes.number,
        verification: PropTypes.oneOf(Object.values(Verification)),
        noticeText: PropTypes.string,
        isDisabled: PropTypes.bool,
        required: PropTypes.bool,
        placeholder: PropTypes.string,
        notFoundText: PropTypes.string,
        className: PropTypes.string,
        classes: PropTypes.shape({ control: PropTypes.string }),
        items: PropTypes.arrayOf(
            PropTypes.shape({
                view: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.element,
                ]),
                title: PropTypes.node,
                value: PropTypes.number,
            })
        ),
        onSelect: PropTypes.func,
    };

    static defaultProps: Partial<ISelectProps> = {
        type: Types.CLASSIC,
        notFoundText: 'Ничего не нашлось',
        items: [],
    };

    itemWrapperNode: HTMLDivElement;
    itemsNodeList: HTMLDivElement[];
    selectNode: HTMLDivElement;

    isTouch: boolean = detectTouch();

    constructor(props: ISelectProps) {
        super(props);

        this.state = {
            isOpen: false,
            activeIndex: 0,
            comboboxItems: props.items,
            inputValue: '',
        };
        this.itemsNodeList = [];
    }

    onEventListener = () => {
        const { isOpen } = this.state;

        if (!isOpen) {
            document.addEventListener('click', this.onClickOutside);
        }
        if (isOpen) {
            document.removeEventListener('click', this.onClickOutside);
        }
    }

    onClickOutside = (e: MouseEvent): void => {
        const { isOpen } = this.state;

        if (e.target instanceof Node && this.selectNode.contains(e.target) || !isOpen) {
            return;
        }

        this.setState({ isOpen: false });
    }

    handleClickTitle = (): void => {
        this.setState((state) => ({ isOpen: !state.isOpen }));

        this.onEventListener();
    }

    handleArrowClick = (): void => {
        this.setState((state) => ({ isOpen: !state.isOpen }));
        this.onEventListener();
    }

    handleClickItem = (itemValue: number) => (e: React.SyntheticEvent<EventTarget>): void => {
        const { onSelect, items } = this.props;
        const item = items.find(elem => elem.value === itemValue);

        if (!item) {
            return;
        }

        const { title } = item;

        this.setState({
            isOpen: false,
            inputValue: title,
        });

        document.removeEventListener('click', this.onClickOutside);

        onSelect && onSelect(e, item);
    }

    handleHoverItem = (index: number) => (e: React.SyntheticEvent<EventTarget>): void => {
        e.preventDefault();

        this.setState({ activeIndex: index });
    }

    handleClickCombobox = (e: React.FormEvent<EventTarget>): void => {
        const { isOpen, comboboxItems } = this.state;

        e.stopPropagation();

        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }

        if (!isOpen && comboboxItems) {
            e.target.select();
        }

        this.setState((state) => ({ isOpen: !state.isOpen }));
        this.onEventListener();
    }

    handleChangeCombobox = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { items } = this.props;
        const filterValue = e.target.value;

        const filteredItems = items.filter(({ title }) => {
            if (filterValue.length <= title.length) {
                return RegExp(filterValue, 'ig').test(title);
            }

            return false;
        });

        this.setState({
            activeIndex: 0,
            isOpen: true,
            comboboxItems: filteredItems,
            inputValue: filterValue,
        });
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): boolean => {
        const { activeIndex, isOpen } = this.state;
        const { items } = this.props;

        // key arrow down
        if (e.key === 'ArrowDown' && activeIndex < items.length - 1) {
            this.setState({ activeIndex: activeIndex + 1 }, () => {
                this.scrollList(activeIndex);
            });
            e.preventDefault();

            return false;
        }
        // key arrow up
        if (e.key === 'ArrowUp' && activeIndex > 0) {
            this.setState((prevState) => ({ activeIndex: prevState.activeIndex - 1 }), () => {
                this.scrollList(activeIndex);
            });
            e.preventDefault();

            return false;
        }
        // key enter
        if (e.key === 'Enter' && isOpen) {
            this.itemsNodeList[activeIndex].click();

            return false;
        }
        // key enter
        if (e.key === 'Enter' && !isOpen) {
            this.setState({ isOpen: true });

            return false;
        }
        // key tab
        if (e.key === 'Tab') {
            this.setState({ isOpen: false });

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
            wrapper.scrollTop = wrapperScroll + itemOffset + itemHeight - wrapperScroll - wrapperHeight;
        }

        if (itemOffset < wrapperScroll) {
            wrapper.scrollTop = wrapperScroll - wrapperScroll + itemOffset;
        }
    }

    highlightString = (title, view) => {
        const { type } = this.props;
        const { inputValue } = this.state;

        if (type === Types.CLASSIC) {
            return view || title;
        }
        if (type === Types.COMBOBOX && view) {
            return view;
        }

        const stringFragments = title.split(RegExp(`(${inputValue})`, 'ig'));

        return (
            <Paragraph hasMargin={false}>
                {stringFragments.map((fragment, i) => (
                    <React.Fragment key={i}>
                        {(fragment.toLowerCase() === inputValue.toLowerCase())
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
                onClick={this.handleClickTitle}
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
        const { comboboxItems, activeIndex } = this.state;
        const currentItems = type === 'combobox' ? comboboxItems : items;

        return (
            <div className={cn('list')}>
                <div className={cn('list-inner')} ref={this.getItemWrapper}>
                    {currentItems.map(({ title, value, view }, i) =>
                        <div
                            className={cn('list-item', {
                                active: activeIndex === i,
                            })}
                            key={value + i}
                            onClick={this.handleClickItem(value)}
                            onMouseEnter={this.handleHoverItem(i)}
                            ref={node => { node && this.itemsNodeList.push(node); }}
                        >
                            <div className={cn('item-title')}>
                                {this.highlightString(title, view)}
                            </div>
                        </div>
                    )}
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
        } = this.props;
        const { isOpen } = this.state;

        return (
            <div
                className={cn({
                    open: isOpen,
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
                        {(type === Types.COMBOBOX) && this.renderCombobox()}
                        {(type === Types.CLASSIC) && this.renderTitle()}
                        <div className={cn('arrow-wrap')} onClick={this.handleArrowClick}>
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
