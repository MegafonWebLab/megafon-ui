import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Textarea.less';
import cnCreate from 'utils/cn';
import equal from 'deep-equal';
import detectTouch from 'utils/detectTouch';
import InputLabel from '../InputLabel/InputLabel';

interface ITextareaClasses {
    wrapper?: string;
    field?: string;
}

interface ITextareaProps {
    /** Field title */
    label?: React.ReactNode;
    /** Field color scheme */
    color?: 'default' | 'white';
    /** Error/Notice text */
    noticeText?: string;
    /** Comment text */
    commentText?: string;
    /** Success text */
    successText?: string;
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
    /** Custom wrapper classname */
    className?: string;
    /** Custom classnames */
    classes?: ITextareaClasses;
    /** Change handler */
    onChange?(e: React.SyntheticEvent<EventTarget>): void;
    /** Blur handler */
    onBlur?(e: React.SyntheticEvent<EventTarget>): void;
    /** Focus handler */
    onFocus?(e: React.SyntheticEvent<EventTarget>): void;
    /** KeyUp handler */
    onKeyUp?(e: React.SyntheticEvent<EventTarget>): void;
}

const cn = cnCreate('mfui-textarea');
class Textarea extends React.Component<ITextareaProps, {}> {
    static propTypes = {
        label: PropTypes.node,
        noticeText: PropTypes.string,
        commentText: PropTypes.string,
        successText: PropTypes.string,
        autoFocus: PropTypes.bool,
        autocomplete: PropTypes.oneOf(['on', 'off']),
        valid: PropTypes.bool,
        error: PropTypes.bool,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.string,
        maxLength: PropTypes.number,
        defaultValue: PropTypes.string,
        className: PropTypes.string,
        classes: PropTypes.shape({
            wrapper: PropTypes.string,
            field: PropTypes.string,
        }),
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onKeyUp: PropTypes.func,
    };

    static defaultProps: Partial<ITextareaProps> = {
        autocomplete: 'off',
        color: 'default',
    };

    inputNode: any = React.createRef();
    isTouch: boolean = detectTouch();

    shouldComponentUpdate(nextProps: ITextareaProps) {
        return !equal(this.props, nextProps);
    }

    blur = () => {
        this.inputNode.current.blur();
    }

    focus = () => {
        this.inputNode.current.focus();
    }

    renderElem() {
        const classes = this.props.classes || {};
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
            value: this.props.value,
            required: this.props.required,
            autoComplete: this.props.autocomplete,
            className: cn('field', classes.field),
        };

        return <textarea ref={this.inputNode} {...params} />;
    }

    render() {
        const {
            error, color, valid, disabled,
            className, commentText, successText,
            noticeText, label, id, classes = {},
        } = this.props;

        return (
            <div
                className={cn('', {
                    valid: valid,
                    error: error,
                    disabled,
                    color,
                }, [className, classes.wrapper])}
            >
                {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
                <div className={cn('field-wrapper', { 'no-touch': !this.isTouch })}>
                    <div>{this.renderElem()}</div>
                </div>
                {(error || valid) && noticeText &&
                    <div className={cn('text', { error: true })}>{noticeText}</div>}
                {commentText &&
                    <div className={cn('text', { comment: true })}>{commentText}</div>}
                {successText &&
                    <div className={cn('text', { success: true })}>{successText}</div>}
            </div>
        );
    }
}

export default Textarea;
