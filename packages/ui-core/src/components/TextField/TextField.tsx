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
    verification?: 'valid' | 'error';
    /** Text message. Could be a validation message or a simple hint to user */
    noticeText?: string;
    /** Disables field. The value of this prop is also passed through to attribute with the same name */
    disabled?: boolean;
    /** Makes the field required. The value of this prop is also passed through to attribute with the same name */
    required?: boolean;
    /** Custom ref-object or ref-callback. Note: if you use **mask**, you have to use ref-callback to get instance */
    inputRef?: React.Ref<any>;
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

    const isPasswordType: boolean = useMemo(() => type === 'password', [type]);
    const isVisiblePassword: boolean = useMemo(
        () => isPasswordType && !isPasswordHidden,
        [isPasswordHidden, isPasswordType]
    );
    const isTouch: boolean = useMemo(() => detectTouch(), []);

    const togglePasswordHiding = useCallback(
        () => setPasswordHidden(prevPassState => !prevPassState),
        [isPasswordHidden]
    );
    const handleIconClick = useCallback(e => {
        isPasswordType && togglePasswordHiding();
        onCustomIconClick && onCustomIconClick(e);
    }, [isPasswordType, togglePasswordHiding, onCustomIconClick]);

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
        onChange,
        onFocus: handleFocus,
        onKeyUp,
        placeholder,
        required,
        value,
        maxLength,
    };

    const inputParams = {
        ...commonParams,
        className: cn('field'),
        mask,
        maskChar,
        type: isVisiblePassword ? 'text' : type,
    };

    const textareaParams = {
        ...commonParams,
        className: cn('field', { multiline }),
    };

    const renderField = (): React.ReactNode => {
        if (multiline) {
            return renderTextarea();
        }
        return renderInput();
    };

    const renderInput = (): React.ReactNode => (
        <>
            {mask
                ? <InputMask {...inputParams} inputRef={inputRef} />
                : <input {...inputParams} ref={inputRef} />
            }
            {!hideIcon && renderIconBlock()}
        </>
    );

    const renderTextarea = (): React.ReactNode => <textarea {...textareaParams} ref={inputRef} />;

    const getIcon = (): React.ReactNode | null => {
        switch (true) {
            case !!customIcon:
                return customIcon;
            case verification === 'error':
                return <ErrorIcon className={cn('icon')} />;
            case verification === 'valid':
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
                className={cn('icon-box', { password: isPasswordType, custom: !!customIcon })}
                onClick={handleIconClick}
            >
                {icon}
            </div>
        );
    };

    return (
        <div className={cn({
            disabled,
            theme,
            valid: verification === 'valid',
            error: verification === 'error',
            icon: !hideIcon && (!!verification || !!customIcon),
            password: isPasswordType,
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
                    error: verification === 'error',
                    success: verification === 'valid',
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
    verification: PropTypes.oneOf(['valid', 'error']),
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
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.object.isRequired }),
    ]),
};

export default TextField;
