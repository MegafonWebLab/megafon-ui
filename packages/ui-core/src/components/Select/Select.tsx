import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Select.less';
import SelectItem from './SelectItem';
import equal from 'deep-equal';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import InputLabel from 'components/InputLabel/InputLabel';
import Paragraph from 'components/Paragraph/Paragraph';

export interface ISelectCallbackItem {
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

interface ISelectProps {
    /** Select type */
    type?: 'classic' | 'combobox';
    /** Field title */
    label?: string;
    /** Html id attribute for label */
    id?: string;
    /** Current selected item */
    currentValue?: number;
    /** Verification */
    verification: Verification;
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
    items: ISelectCallbackItem[];
    /** Custom classname */
    className?: string;
    /** Object for the custom class */
    classes?: ISelectClasses;
    /** Focus handler of combobox type */
    onFocusCombobox?: (value: string) => void;
    /** Select item handler */
    onSelect?: (e: React.SyntheticEvent<EventTarget>, data: ISelectCallbackItem) => void;
}

interface ISelectState {
    isOpen: boolean;
    focus: boolean;
    activeIndex: number;
    comboboxItems: ISelectCallbackItem[];
    inputValue: string;
}

const cn = cnCreate('mfui-select');
class Select extends React.Component<ISelectProps, ISelectState> {
    static propTypes = {
        type: PropTypes.oneOf(['classic', 'combobox']),
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
        type: 'classic',
        notFoundText: 'Ничего не нашлось',
        items: [],
    };

    itemWrapperNode: any = null;
    itemsNodeList: any = null;
    selectNode: any = null;
    combobox: any = null;
    isTouch: boolean = detectTouch();

    constructor(props: ISelectProps) {
        super(props);

        this.state = {
            isOpen: false,
            focus: false,
            activeIndex: 0,
            comboboxItems: props.items,
            inputValue: '',
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.onClickOutside);
    }

    shouldComponentUpdate(nextProps: ISelectProps, nextState: ISelectState) {
        const { items } = this.props;

        return !(equal({ ...this.props, items: items.length },
            { ...nextProps, items: nextProps.items.length })
            && equal(this.state, nextState));
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickOutside);
    }

    handleClickTitle = (): void => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleClickItem = (e: React.SyntheticEvent<EventTarget>, itemValue: number): void => {
        const { onSelect, items } = this.props;
        const item = items.find(elem => elem.value === itemValue);

        if (!item) {
            return;
        }

        const {value, title, view} = item;

        this.setState({
            isOpen: false,
            inputValue: title,
        });

        onSelect && onSelect(e, { title, value, view });
    }

    handleClickCombobox = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        const { isOpen, comboboxItems } = this.state;

        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }

        if (!isOpen && comboboxItems) {
            e.target.select();
        }

        this.setState({ isOpen: !this.state.isOpen });
    }

    handleChangeCombobox = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { items } = this.props;

        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }

        const currentItems = items.filter(item => {
            if ( e.target.value.length <= item.title.length) {
                return RegExp(e.target.value, 'ig').test(item.title);
            }

            return;
        });

        this.setState({
            activeIndex: 0,
            isOpen: true,
            comboboxItems: currentItems,
            inputValue: e.target.value,
        });
    }

    handleFocusCombobox = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }

        const { onFocusCombobox } = this.props;

        onFocusCombobox && onFocusCombobox(e.target.value);
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): boolean => {
        const { activeIndex, isOpen } = this.state;
        const { items } = this.props;

        // key arrow down
        if (e.keyCode === 40 && activeIndex < items.length - 1) {
            this.setState({ activeIndex: activeIndex + 1 }, () => {
                this.scrollList(activeIndex);
            });
            e.preventDefault();

            return false;
        }
        // key arrow up
        if (e.keyCode === 38 && activeIndex > 0) {
            this.setState({ activeIndex: activeIndex - 1 }, () => {
                this.scrollList(activeIndex);
            });
            e.preventDefault();

            return false;
        }
        // key enter
        if (e.keyCode === 13 && isOpen) {
            this.itemsNodeList && this.itemsNodeList[activeIndex].click();
            return false;
        }
        // key enter
        if (e.keyCode === 13 && !isOpen) {
            this.setState({ isOpen: true });

            return false;
        }
        // key tab
        if (e.keyCode === 9) {
            this.setState({ isOpen: false });

            return false;
        }

        return true;
    }

    handleHoverItem = (e: React.SyntheticEvent<EventTarget>, index: number): void => {
        e.preventDefault();
        this.setState({ activeIndex: index });
    }

    onClickOutside = (event: MouseEvent): void => {
        const { isOpen } = this.state;

        if (this.selectNode.contains(event.target) || !isOpen) {
            return;
        }
        this.setState({ isOpen: false });
    }

    handleFocusControl = (): void => {
        this.setState({ focus: true });
    }

    handleBlurControl = (): void => {
        this.setState({ focus: false });
    }

    handleClickControl = (): void => {
        if (this.combobox) {
            this.combobox.click();
        }
    }

    scrollList(activeIndex: number): void {
        const wrapper = this.itemWrapperNode;
        const wrapperScroll = wrapper.scrollTop;
        const wrapperHeight = wrapper.offsetHeight;

        const item = this.itemsNodeList[activeIndex];
        const itemOffset = item.offsetTop;
        const itemHeight = item.offsetHeight;

        if (itemOffset + itemHeight > wrapperScroll + wrapperHeight) {
            wrapper.scrollTop = wrapperScroll + itemOffset + itemHeight - wrapperScroll - wrapperHeight;
        }

        if (itemOffset < wrapperScroll) {
            wrapper.scrollTop = wrapperScroll - wrapperScroll + itemOffset;
        }
    }

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

    renderCombox() {
        const { placeholder } = this.props;
        const { inputValue } = this.state;

        return (
            <input
                className={cn('combobox')}
                onClick={this.handleClickCombobox}
                onChange={this.handleChangeCombobox}
                onFocus={this.handleFocusCombobox}
                ref={node => { this.combobox = node; }}
                type="text"
                value={inputValue}
                placeholder={placeholder}
            />
        );
    }

    getItemWrapper = node => this.itemWrapperNode = node;
    getSelectNode = node => this.selectNode = node;

    highlightString = (title, view) => {
        const { type } = this.props;
        const { inputValue } = this.state;

        if (type === 'classic') {
            return view || title;
        } else if (type === 'combobox' && view) {
            return view;
        }

        const strFragmentsArr = title.split(RegExp(`(${inputValue})`, 'ig'));

        return (
            <Paragraph hasMargin={false}>
                {strFragmentsArr.map((fragment, i) => (
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

    renderChildren() {
        const { type, items, notFoundText, currentValue } = this.props;
        const { comboboxItems } = this.state;
        this.itemsNodeList = [];
        const currentItems = type === 'combobox' ? comboboxItems : items;

        return (
            <div className={cn('list')}>
                <div className={cn('list-inner')} ref={node => this.getItemWrapper(node)}>
                    {currentItems.map(({ title, value, view }, i) =>
                        <SelectItem
                            content={this.highlightString(title, view)}
                            key={value + i}
                            index={i}
                            value={value}
                            isActive={this.state.activeIndex === i}
                            isCurrent={currentValue === value}
                            onHover={this.handleHoverItem}
                            onSelect={this.handleClickItem}
                            ref={node => { node && this.itemsNodeList.push(node.itemNode); }}
                        />
                    )}
                    {!currentItems.length && <div className={cn('not-found')}>{notFoundText}</div>}
                </div>
            </div>
        );
    }

    render() {
        const { type, isDisabled, verification, noticeText, label, id, required } = this.props;
        const { focus, isOpen } = this.state;
        const { className = '', classes = {} } = this.props;
        const propsClassName = `${className} ${classes.root || ''}`.trim();

        return (
            <div
                className={cn('', {
                    open: isOpen,
                    disabled: isDisabled,
                    focus: focus,
                    'no-touch': !this.isTouch,
                    valid: verification === Verification.VALID,
                    error: verification === Verification.ERROR,
                }, propsClassName)}
                ref={this.getSelectNode}
            >
                <div className={cn('inner')}>
                    {label && (
                        <InputLabel htmlFor={id}>
                            {label}
                            {required && <span className={cn('require-mark')}>*</span>}
                        </InputLabel>
                    )}
                    <div
                        className={cn('control', {}, classes.control)}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.handleFocusControl}
                        onBlur={this.handleBlurControl}
                        onClick={this.handleClickControl}
                    >
                        {(type === 'combobox') && this.renderCombox()}
                        {(type === 'classic') && this.renderTitle()}
                        <span className={cn('arrow')}>
                            <span className={cn('arrow-inner')} />
                        </span>
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
