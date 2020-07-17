import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Select.less';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import InputLabel from 'components/InputLabel/InputLabel';
import Paragraph from 'components/Paragraph/Paragraph';

export interface ISelectItem {
    title: string;
    value: number | string;
    view?: JSX.Element[] | Element[] | JSX.Element | string | Element;
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
    isOpened: boolean;
    activeIndex: number;
    filteredItems: ISelectItem[];
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
            isOpened: false,
            activeIndex: 0,
            filteredItems: props.items,
            inputValue: '',
        };
        this.itemsNodeList = [];
    }

    componentDidMount() {
        document.addEventListener('click', this.onClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickOutside);
    }

    onClickOutside = (e: MouseEvent): void => {
        const { isOpened } = this.state;

        if (e.target instanceof Node && this.selectNode.contains(e.target) || !isOpened) {
            return;
        }

        this.setState({ isOpened: false });
    }

    handleOpenDropdown = (): void => {
        this.setState((state) => ({ isOpened: !state.isOpened }));
    }

    handleClickItem = (itemValue: number | string) => (e: React.SyntheticEvent<EventTarget>): void => {
        const { onSelect, items } = this.props;
        const item = items.find(elem => elem.value === itemValue);

        if (!item) {
            return;
        }

        const { title } = item;

        this.setState({
            isOpened: false,
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
        const { items } = this.props;
        const filterValue = e.target.value;

        const filteredItems = items.filter(({ title }) => {
            if (filterValue.length <= title.length) {
                return RegExp(filterValue, 'ig').test(title);
            }

            return false;
        });

        this.setState({
            isOpened: true,
            filteredItems,
            inputValue: filterValue,
        });
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): boolean => {
        const { activeIndex, isOpened } = this.state;
        const { items } = this.props;

        if (items.length === 0) {
            return true;
        }

        if (e.key === 'ArrowDown' && activeIndex < items.length - 1) {
            this.setState({ activeIndex: activeIndex + 1 }, () => {
                this.scrollList(activeIndex);
            });
            e.preventDefault();

            return false;
        }
        if (e.key === 'ArrowUp' && activeIndex > 0) {
            this.setState((prevState) => ({ activeIndex: prevState.activeIndex - 1 }), () => {
                this.scrollList(activeIndex);
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
        const currentItems = type === Types.COMBOBOX ? filteredItems : items;

        return (
            <div className={cn('list')}>
                <div className={cn('list-inner')} ref={this.getItemWrapper}>
                    {currentItems.map(({ title, value, view }, i) => (
                        <div
                            className={cn('list-item', {
                                active: activeIndex === i,
                            })}
                            key={Number(value) + i}
                            onClick={this.handleClickItem(value)}
                            onMouseEnter={this.handleHoverItem(i)}
                            ref={node => { node && this.itemsNodeList.push(node); }}
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
        } = this.props;
        const { isOpened } = this.state;

        return (
            <div
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
                        {(type === Types.COMBOBOX) && this.renderCombobox()}
                        {(type === Types.CLASSIC) && this.renderTitle()}
                        <div className={cn('arrow-wrap')} onClick={this.handleOpenDropdown}>
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
