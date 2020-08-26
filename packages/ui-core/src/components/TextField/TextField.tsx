import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCallback, useState, useMemo } from 'react';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import './TextField.less';
import InputLabel from '../InputLabel/InputLabel';
import CheckedIcon from 'icons/System/24/Checked_24.svg';
import ErrorIcon from 'icons/System/24/Cancel_24.svg';
import Hide from 'icons/Basic/24/Hide_24.svg';
import Show from 'icons/Basic/24/Show_24.svg';

const InputMask = require('react-input-mask');

enum Verification {
    VALID = 'valid',
    ERROR = 'error',
}

export interface ITextFieldProps {
    /** Toggle to textarea */
    multiline?: boolean;
    /** Field label */
    label?: string;
    /** HTML-attribute "type" of input element. Doesn't work with **multiline=true** */
    type?: 'text' | 'password' | 'tel' | 'email';
    /** Field color scheme */
    theme?: 'default' | 'white';
    /** Forcefully prohibits icon's render */
    hideIcon?: boolean;
    /** The result of external field's validation */
    verification?: Verification;
    /** Text message. Could be a validation message or a simple hint to user */
    noticeText?: string;
    /** Disables field. The value of this prop is also passed through to attribute with the same name */
    disabled?: boolean;
    /** Makes the field required. The value of this prop is also passed through to attribute with the same name */
    required?: boolean;
    /** Ref-callback */
    inputRef?: (node: HTMLInputElement | HTMLTextAreaElement) => void;
    /** Field name. The value of this prop is passed through to attribute with the same name */
    name?: string;
    /** Initial Placeholder */
    placeholder?: string;
    /** Html id attribute, also automatically allows to focus on input while clicking on the label */
    id?: string;
    /** Externally set value */
    value?: string;
    /** Max length of the text */
    maxLength?: number;
    /** Custom icon */
    customIcon?: JSX.Element;
    /** Mask for the input-field. Doesn't work with **multiline=true**. */
    /** You may find additional info on https://github.com/sanniassin/react-input-mask */
    mask?: string;
    /** Split symbol for a mask. Doesn't work with **multiline=true** */
    maskChar?: string;
    /** Custom classname */
    className?: string;
    /** Change handler */
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Blur handler */
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Focus handler */
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** KeyUp handler */
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Custom icon click handler */
    onCustomIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/* Method for defining internet explorer */
const detectIE11 = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }
    const userAgent: string = window.navigator.userAgent.toLowerCase();
    return userAgent.indexOf('trident/') !== -1;
};

const cn = cnCreate('mfui-text-field');
const TextField: React.FC<ITextFieldProps> = ({
        className,
        customIcon,
        disabled,
        hideIcon,
        id,
        label,
        mask,
        maskChar,
        maxLength,
        multiline,
        name,
        placeholder,
        required,
        onBlur,
        onChange,
        onCustomIconClick,
        onFocus,
        onKeyUp,
        theme,
        type,
        value,
        verification,
        noticeText,
        inputRef,
    }) => {

    const [isPasswordHidden, setPasswordHidden] = useState<boolean>(true);
    const [inputValue, setInputValue] = React.useState(value);
    const fieldNode = React.useRef<HTMLInputElement | HTMLTextAreaElement>();

    const isPasswordType: boolean = useMemo(() => type === 'password', [type]);
    const isVisiblePassword: boolean = useMemo(
        () => isPasswordType && !isPasswordHidden,
        [isPasswordHidden, isPasswordType]
    );
    const isTouch: boolean = useMemo(() => detectTouch(), []);
    const isIE11: boolean = useMemo(() => detectIE11(), []);

    const renderPlaceholderForIe = (classes: string): React.ReactNode => {
        return <span className={cn(classes)}>{placeholder}</span>;
    };

    React.useEffect(() => {
        setInputValue(value);
    }, [value]);

    const togglePasswordHiding = useCallback(
        () => setPasswordHidden(prevPassState => !prevPassState),
        [isPasswordHidden]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setInputValue(e.target.value);

        onChange && onChange(e);
    };

    const handleIconClick = useCallback(e => {
        const isClearFuncAvailable = !customIcon && !onCustomIconClick && verification === Verification.ERROR;
        const { current: field } = fieldNode;

        isPasswordType && togglePasswordHiding();
        onCustomIconClick && onCustomIconClick(e);
        isClearFuncAvailable && setInputValue('');
        field && field.focus();
    }, [isPasswordType, togglePasswordHiding, onCustomIconClick, verification, setInputValue]);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFocus && onFocus(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onBlur && onBlur(e);
    }, [onBlur]);

    const commonParams = {
        disabled,
        id,
        name,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onKeyUp,
        placeholder,
        required,
        maxLength,
    };

    const inputParams = {
        ...commonParams,
        className: cn('field'),
        value: inputValue,
        mask,
        maskChar,
        onChange: handleInputChange,
        type: isVisiblePassword ? 'text' : type,
    };

    const textareaParams = {
        ...commonParams,
        value,
        onChange: handleInputChange,
        className: cn('field', { multiline }),
    };

    const getFieldNode = (node: HTMLInputElement | HTMLTextAreaElement | null) => {
        if (!node) {
            return;
        }

        fieldNode.current = node;
        inputRef && inputRef(node);
    };

    const renderField = (): React.ReactNode => {
        if (multiline) {
            return renderTextarea();
        }

        return renderInput();
    };

    const renderInput = (): React.ReactNode => {
        if (!inputValue && inputParams.placeholder && isIE11) {
            inputParams.placeholder = '';
        }
        return (
            <>
                {!inputValue && placeholder && isIE11 && renderPlaceholderForIe('placeholder-input')}
                {mask
                    ? <InputMask {...inputParams} inputRef={getFieldNode} />
                    : <input {...inputParams} ref={getFieldNode} />
                }
                {!hideIcon && renderIconBlock()}
            </>
        );
    };

    const renderTextarea = (): React.ReactNode => {
        if (!inputValue && textareaParams.placeholder && isIE11) {
            textareaParams.placeholder = '';
        }
        return (
            <>
                {!inputValue && placeholder && isIE11 && renderPlaceholderForIe('placeholder-textarea')}
                <textarea {...textareaParams} ref={getFieldNode} />
            </>
        );
    };

    const getIcon = (): React.ReactNode | null => {
        switch (true) {
            case !!customIcon:
                return customIcon;
            case verification === Verification.ERROR:
                return <ErrorIcon className={cn('icon')} />;
            case verification === Verification.VALID:
                return <CheckedIcon className={cn('icon')} />;
            case isPasswordType && isPasswordHidden:
                return <Hide className={cn('icon')} />;
            case isPasswordType && !isPasswordHidden:
                return <Show className={cn('icon')} />;
        }
        return null;
    };

    const renderIconBlock = () => {
        const icon: React.ReactNode | null = getIcon();

        return icon && (
            <div
                className={cn('icon-box', {
                    error: verification === Verification.ERROR,
                    password: isPasswordType,
                    'no-handler': !!customIcon && !onCustomIconClick })}
                onClick={handleIconClick}
            >
                {icon}
            </div>
        );
    };

    const isPlaceholderShowed = isPasswordType && isPasswordHidden && !!inputValue;

    return (
        <div className={cn({
            disabled,
            theme,
            valid: verification === Verification.VALID,
            error: verification === Verification.ERROR,
            icon: !hideIcon && (!!verification || !!customIcon),
            password: isPlaceholderShowed,
        }, className)}>
            {label && <InputLabel htmlFor={id}>
                {label}
                {required && <span className={cn('require-mark')}>*</span>}
            </InputLabel>}
            <div
                className={cn('field-wrapper', { 'no-touch': !isTouch })}
            >
                {renderField()}
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
};

TextField.defaultProps = {
    multiline: false,
    theme: 'default',
    type: 'text',
    hideIcon: false,
};

TextField.propTypes = {
    multiline: PropTypes.bool,
    label: PropTypes.string,
    theme: PropTypes.oneOf(['default', 'white']),
    hideIcon: PropTypes.bool,
    verification: PropTypes.oneOf(Object.values(Verification)),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.oneOf(['text', 'password', 'tel', 'email']),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    customIcon: PropTypes.element,
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    noticeText: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyUp: PropTypes.func,
    onCustomIconClick: PropTypes.func,
    inputRef: PropTypes.func,
};

export default TextField;
