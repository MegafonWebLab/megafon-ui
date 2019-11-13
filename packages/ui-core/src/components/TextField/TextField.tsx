import * as React from 'react';
import * as PropTypes from 'prop-types';
import './TextField.less';
import InputMask from 'react-input-mask';
import cnCreate from 'utils/cn';
import * as equal from 'deep-equal';
import CheckedIcon from 'icons/System/24/Checked_24.svg';
import ErrorIcon from 'icons/System/24/Cancel_24.svg';
import Hide from 'icons/Basic/24/Hide_24.svg';
import Show from 'icons/Basic/24/Show_24.svg';
import detectTouch from 'utils/detectTouch';

interface ITextFieldProps {
    /** Field color scheme */
    color?: 'default' | 'white';
    /** Field size */
    size?: 'large';
    /** Error/Notice text */
    noticeText?: string;
    /** Comment text */
    commentText?: string;
    /** Success text */
    successText?: string;
    /** Not show icon of state */
    isHideIcon?: boolean;
    /** Autofocus */
    autoFocus?: boolean;
    /** Autocomplete */
    autocomplete?: 'on' | 'off';
    /** Validation passed */
    valid?: boolean;
    /** Validation error */
    error?: boolean;
    /** Disable field */
    disabled?: boolean;
    /** Required field */
    required?: boolean;
    /** Type - property tag <input> */
    type?: 'text' | 'password' | 'tel' | 'email';
    /** Field name */
    name?: string;
    /** Placeholder */
    placeholder?: string;
    /** Html id attribute */
    id?: string;
    /** Field value */
    value?: string;
    /** Max length  */
    maxLength?: number;
    /** Default value */
    defaultValue?: string;
    /** Custom icon */
    customIcon?: JSX.Element;
    /** Mask */
    mask?: string;
    /** Split symbol for mask */
    maskChar?: string;
    /** Increased size of space between words in the text box */
    bigSpace?: boolean;
    /** Custom classname */
    className?: string;
    /** Change handler */
    onChange?(e: React.SyntheticEvent<EventTarget>): void;
    /** Blur handler */
    onBlur?(e: React.SyntheticEvent<EventTarget>): void;
    /** Focus handler */
    onFocus?(e: React.SyntheticEvent<EventTarget>): void;
    /** KeyUp handler */
    onKeyUp?(e: React.SyntheticEvent<EventTarget>): void;
}

interface ITextFieldState {
    isTouch: boolean;
    isPasswordHidden: boolean;
}

const cn = cnCreate('mfui-text-field');
class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
    static propTypes = {
        color: PropTypes.oneOf(['default', 'white']),
        size: PropTypes.oneOf(['large']),
        noticeText: PropTypes.string,
        commentText: PropTypes.string,
        successText: PropTypes.string,
        isHideIcon: PropTypes.bool,
        autoFocus: PropTypes.bool,
        autocomplete: PropTypes.oneOf(['on', 'off']),
        valid: PropTypes.bool,
        error: PropTypes.bool,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        type: PropTypes.oneOf(['text', 'password', 'tel', 'email']),
        name: PropTypes.string,
        placeholder: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.string,
        maxLength: PropTypes.number,
        defaultValue: PropTypes.string,
        customIcon: PropTypes.element,
        mask: PropTypes.string,
        maskChar: PropTypes.string,
        bigSpace: PropTypes.bool,
        className: PropTypes.string,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onKeyUp: PropTypes.func,
    };

    static defaultProps: Partial<ITextFieldProps> = {
        autocomplete: 'off',
        type: 'text',
        color: 'default',
        isHideIcon: false,
    };

    inputNode: any;

    constructor(props: ITextFieldProps) {
        super(props);

        this.state = {
            isTouch: false,
            isPasswordHidden: true,
        };
    }

    componentDidMount() {
        this.setState({ isTouch: detectTouch() });
    }

    shouldComponentUpdate(nextProps: ITextFieldProps, nextState: ITextFieldState) {
        return !equal(this.props, nextProps) || !equal(this.state, nextState);
    }

    blur = () => {
        return this.inputNode.blur();
    }

    focus = () => {
        return this.inputNode.focus();
    }

    handleEyeToggle = () => {
        this.setState(
            (prevState: ITextFieldState) => {
                return { isPasswordHidden: !prevState.isPasswordHidden };
            }
        );
    }

    renderValidIcon() {
        return (
            <div
                className={cn('icon-box')}
            >
                <CheckedIcon className={cn('icon')} />
            </div>
        );
    }

    renderErrorIcon() {
        return (
            <div
                className={cn('icon-box')}
            >
                <ErrorIcon className={cn('icon')} />
            </div>
        );
    }

    renderCustomIcon() {
        return (
            <div
                className={cn('icon-box', { custom: !!this.props.customIcon })}>
                {this.props.customIcon}
            </div>
        );
    }

    renderPasswordFieldIcon() {
        const { isPasswordHidden } = this.state;

        return (
            <div
                className={cn('icon-box', { 'password': true })}
                onClick={this.handleEyeToggle}
            >
                {isPasswordHidden
                    ? <Hide className={cn('icon')} />
                    : <Show className={cn('icon')} />
                }
            </div>
        );
    }

    addInputNode = (node: HTMLInputElement ) => this.inputNode = node;

    renderInputElem(isPasswordType: boolean) {
        const { isPasswordHidden } = this.state;
        const params = {
            disabled: this.props.disabled,
            name: this.props.name,
            id: this.props.id,
            placeholder: this.props.placeholder,
            onChange: this.props.onChange,
            onBlur: this.props.onBlur,
            onFocus: this.props.onFocus,
            onKeyUp: this.props.onKeyUp,
            autoFocus: this.props.autoFocus,
            defaultValue: this.props.defaultValue,
            maxLength: this.props.maxLength,
            value: this.props.value,
            type: isPasswordType && !isPasswordHidden ? 'text' : this.props.type,
            required: this.props.required,
            autoComplete: this.props.autocomplete,
            className: cn('field', {
                'big-space': this.props.bigSpace,
            }),
        };

        if (this.props.mask) {
            return (
                <InputMask
                    {...params}
                    inputRef={this.addInputNode}
                    mask={this.props.mask}
                    maskChar={this.props.maskChar}
                />
            );
        }

        return <input ref={this.addInputNode} {...params} />;
    }

    render() {
        const {
            isHideIcon, customIcon, error, color,
            valid, disabled, size, className,
            commentText, successText, noticeText, type,
        } = this.props;
        const { isTouch } = this.state;

        const isAnyIcon = !isHideIcon && (!!customIcon || error || valid);
        const isStatusIcon = !isHideIcon && !customIcon;
        const isPasswordType = type === 'password';

        return (
            <div
                className={cn('', {
                    valid: valid,
                    error: error,
                    icon: isAnyIcon,
                    password: isPasswordType,
                    disabled,
                    color,
                    size,
                }, className)}
            >
                <div
                    className={cn('field-wrapper', { 'no-touch': !isTouch })}
                >
                    <div>{this.renderInputElem(isPasswordType)}</div>
                    {customIcon && this.renderCustomIcon()}
                    {isStatusIcon && valid && this.renderValidIcon()}
                    {isStatusIcon && error && this.renderErrorIcon()}
                    {isPasswordType && this.renderPasswordFieldIcon()}
                </div>
                {(error || valid) && noticeText &&
                    <div className={cn('text', { error: true })} dangerouslySetInnerHTML={{ __html: noticeText }} />}
                {commentText &&
                    <div className={cn('text', { comment: true })}>{commentText}</div>}
                {successText &&
                    <div className={cn('text', { success: true })}>{successText}</div>}
            </div>
        );
    }
}

export default TextField;
