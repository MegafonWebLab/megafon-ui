import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Select.less';
import SelectItem from './SelectItem';
import * as equal from 'deep-equal';
import { cnCreate } from '../../utils/cn';

interface ISelectProps {
    /** Header with the selected value */
    selectedTitle?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    /** Selected value */
    selectedValue?: string;
    /** Search field value */
    searchValue?: string;
    /** Attribute name */
    name?: string;
    /** Icon */
    icon?: JSX.Element;
    /** Validation passed */
    valid?: boolean;
    /** Validation error */
    error?: boolean;
    /** Size */
    size?: 'large';
    /** Color */
    color?: 'light';
    /** Required */
    required?: boolean;
    /** Navigation from the keyboard */
    keyNavigation?: boolean;
    /** Placeholder */
    placeholder?: string;
    /** Enable selector open */
    canOpen?: boolean;
    /** Text in the absence of search results */
    notFoundText?: string;
    /** Array of objects to be used for options rendering */
    items: Array<{
        /** Id */
        id?: string;
        /** Header */
        title?: JSX.Element[] | Element[] | JSX.Element | string | Element;
        /** Value */
        value?: string;
        data?: {};
        /** Left icon */
        leftIcon?: JSX.Element;
        /** Right icon */
        rightIcon?: JSX.Element;
    }>;
    /** Change handler */
    onChangeSearch?(value: string): void;
    /** Focus handler */
    onFocusSearch?(value: string): void;
    /** Click item handler */
    onSelectItem?(e: React.SyntheticEvent<EventTarget>, data: {
        title?: JSX.Element[] | Element[] | JSX.Element | string | Element;
        value?: string;
        index: number;
        data?: {};
    }): void;
    /** Click icon handler */
    onClickIcon?(e: React.SyntheticEvent<EventTarget>): void;
}

interface ISelectState {
    isOpen: boolean;
    focus: boolean;
    activeIndex: number;
    currentIndex: number;
}

const cn = cnCreate('select');
class Select extends React.Component<ISelectProps, ISelectState> {
    static propTypes = {
        selectedTitle: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.string,
            PropTypes.element,
            PropTypes.node,
        ]),
        selectedValue: PropTypes.string,
        searchValue: PropTypes.string,
        name: PropTypes.string,
        icon: PropTypes.element,
        valid: PropTypes.bool,
        error: PropTypes.bool,
        size: PropTypes.oneOf(['large']),
        color: PropTypes.oneOf(['light']),
        required: PropTypes.bool,
        keyNavigation: PropTypes.bool,
        placeholder: PropTypes.string,
        canOpen: PropTypes.bool,
        notFoundText: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                title: PropTypes.oneOfType([
                    PropTypes.arrayOf(PropTypes.element),
                    PropTypes.arrayOf(PropTypes.node),
                    PropTypes.element,
                    PropTypes.string,
                    PropTypes.node,
                ]),
                value: PropTypes.string,
                data: PropTypes.object,
                leftIcon: PropTypes.element,
                rightIcon: PropTypes.element,
            })
        ),
        onChangeSearch: PropTypes.func,
        onFocusSearch: PropTypes.func,
        onSelectItem: PropTypes.func,
        onClickIcon: PropTypes.func,
    };

    static defaultProps: Partial<ISelectProps> = {
        keyNavigation: true,
        canOpen: true,
        notFoundText: 'Ничего не нашлось',
        items: [],
    };

    itemWrapperNode: any = null;
    itemsNodeList: any = null;
    selectNode: any = null;
    search: any = null;

    constructor(props: ISelectProps) {
        super(props);

        this.state = {
            isOpen: false,
            focus: false,
            activeIndex: 0,
            currentIndex: props.placeholder ? -1 : 0,
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.onClickOutside);
    }

    shouldComponentUpdate(nextProps: ISelectProps, nextState: ISelectState) {
        return !(equal({ ...this.props, items: this.props.items.length },
            { ...nextProps, items: nextProps.items.length })
            && equal(this.state, nextState));
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickOutside);
    }

    handleClickTitle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleClickItem = (e, index: number) => {
        const { onSelectItem } = this.props;
        const { title, value, data } = this.props.items[index];

        this.setState({
            isOpen: false,
            currentIndex: index,
        });

        onSelectItem && onSelectItem(e, { title, value, index, data });
    }

    handleClickSearch = e => {
        if (!this.state.isOpen && this.props.searchValue) {
            e.target.select();
        }

        this.setState({ isOpen: true });
    }

    handleChangeSearch = e => {
        const { onChangeSearch } = this.props;
        onChangeSearch && onChangeSearch(e.target.value);

        this.setState({
            activeIndex: 0,
            currentIndex: -1,
            isOpen: true,
        });
    }

    handleFocusSearch = e => {
        const { onFocusSearch } = this.props;

        onFocusSearch && onFocusSearch(e.target.value);
    }

    handleKeyDown = e => {
        if (!this.props.keyNavigation) {
            return false;
        }

        const { activeIndex } = this.state;

        // key arrow down
        if (e.keyCode === 40 && activeIndex < this.props.items.length - 1) {
            this.setState({ activeIndex: activeIndex + 1 }, () => {
                this.scrollList(this.state.activeIndex);
            });
            e.preventDefault();
            return false;
        }
        // key arrow up
        if (e.keyCode === 38 && activeIndex > 0) {
            this.setState({ activeIndex: activeIndex - 1 }, () => {
                this.scrollList(this.state.activeIndex);
            });
            e.preventDefault();
            return false;
        }
        // key enter
        if (e.keyCode === 13 && this.state.isOpen) {
            this.itemsNodeList && this.itemsNodeList[this.state.activeIndex].click();
            return false;
        }
        // key enter
        if (e.keyCode === 13 && !this.state.isOpen) {
            this.setState({ isOpen: true });
            return false;
        }
        // key tab
        if (e.keyCode === 9) {
            this.setState({ isOpen: false });
            return false;
        }
    }

    handleHoverItem = (e, index: number) => {
        e.preventDefault();
        this.setState({ activeIndex: index });
    }

    onClickOutside = event => {
        if (this.selectNode.contains(event.target) || !this.state.isOpen) {
            return;
        }
        this.setState({ isOpen: false });
    }

    handleFocusControl = () => {
        this.setState({ focus: true });
    }

    handleBlurControl = () => {
        this.setState({ focus: false });
    }

    handleClickControl = () => {
        if (this.search) {
            this.search.click();
        }
    }

    scrollList(activeIndex: number) {
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

    renderHiddenInput() {
        return (
            <input
                type="hidden"
                required={this.props.required}
                name={this.props.name}
                value={this.props.selectedValue}
            />
        );
    }

    renderTitle() {
        const { placeholder, selectedTitle } = this.props;

        return (
            <div
                className={cn('title', {
                    placeholder: !!placeholder && !selectedTitle,
                })}
                tabIndex={0}
                onClick={this.handleClickTitle}
            >
                <div className={cn('title-inner')}>
                    {selectedTitle || placeholder}
                </div>
            </div>
        );
    }

    renderSearchField() {
        return (
            <input
                className={cn('search-field')}
                onClick={this.handleClickSearch}
                onChange={this.handleChangeSearch}
                onFocus={this.handleFocusSearch}
                ref={node => { this.search = node; }}
                type="text"
                name={this.props.name}
                value={this.props.searchValue}
                required={this.props.required}
                placeholder={this.props.placeholder}
                maxLength={60}
                autoComplete="off"
            />
        );
    }

    renderArrow() {
        return (
            <span className={cn('arrow')}>
                <span className={cn('arrow-inner')} />
            </span>
        );
    }

    renderIcon() {
        return (
            <div className={cn('icon-box')} onClick={this.props.onClickIcon}>
                {this.props.icon}
            </div>
        );
    }

    getItemWrapper = node => this.itemWrapperNode = node;
    getSelectNode = node => this.selectNode = node;

    renderChildren() {
        this.itemsNodeList = [];

        return (
            <div className={cn('list')}>
                <div className={cn('list-inner')} ref={node => this.getItemWrapper(node)}>
                    {this.props.items.map(({ id, ...rest }, i) =>
                        <SelectItem
                            title={rest.title}
                            leftIcon={rest.leftIcon}
                            rightIcon={rest.rightIcon}
                            key={id}
                            index={i}
                            current={this.state.currentIndex === i}
                            active={this.state.activeIndex === i}
                            onHover={this.handleHoverItem}
                            onSelect={this.handleClickItem}
                            ref={node => { node && this.itemsNodeList.push(node.itemNode); }}
                        />
                    )}
                    {!this.props.items.length && <div className={cn('not-found')}>{this.props.notFoundText}</div>}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div
                className={cn('', {
                    open: this.state.isOpen && this.props.canOpen,
                    size: this.props.size,
                    color: this.props.color,
                    valid: this.props.valid,
                    error: this.props.error,
                    focus: this.state.focus,
                    search: !!this.props.onChangeSearch,
                })}
                ref={node => this.getSelectNode(node)}
            >
                {!this.props.onChangeSearch && this.props.name && this.renderHiddenInput()}
                <div
                    className={cn('control')}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.handleFocusControl}
                    onBlur={this.handleBlurControl}
                    onClick={this.handleClickControl}
                >
                    {!this.props.onChangeSearch && this.renderTitle()}
                    {this.props.onChangeSearch && this.renderSearchField()}
                    {!this.props.icon && this.renderArrow()}
                    {this.props.icon && this.renderIcon()}
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}

export default Select;
