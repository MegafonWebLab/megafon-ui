import * as React from 'react';
import { useCallback, useState, useMemo } from 'react';
import cnCreate from 'utils/cn';
import * as equal from 'deep-equal';
import detectTouch from 'utils/detectTouch';
import './TextField.less';
import InputLabel from '../InputLabel/InputLabel';
import CheckedIcon from 'icons/System/24/Checked_24.svg';
import ErrorIcon from 'icons/System/24/Cancel_24.svg';
import Hide from 'icons/Basic/24/Hide_24.svg';
import Show from 'icons/Basic/24/Show_24.svg';

const InputMask = require('react-input-mask');

export interface ITextFieldProps {
    /** Field title */
    label?: string;
    /** verification text */
    verificationText?: string;
    /** Comment text */
    commentText?: string;
    /** Type - property tag <input> */
    type?: 'text' | 'password' | 'tel' | 'email';
    /** Field color scheme */
    theme?: 'default' | 'white';
    /** Not show icon of state */
    hideIcon?: boolean;
    /** Validation passed */
    verification?: 'valid' | 'error';
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
    onChange?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Blur handler */
    onBlur?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Focus handler */
    onFocus?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** KeyUp handler */
    onKeyUp?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Custom icon click handler */
    onCustomIconClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-text-field');
const TextField = (
    {
        bigSpace,
        commentText,
        className,
        customIcon,
        disabled,
        hideIcon = false,
        id,
        label,
        mask,
        maskChar,
        maxLength,
        name,
        placeholder,
        required,
        onBlur,
        onChange,
        onCustomIconClick,
        onFocus,
        onKeyUp,
        theme = 'default',
        type = 'text',
        value,
        verification,
        verificationText,
    }
): React.FunctionComponentElement<ITextFieldProps> => {
    let inputEl: HTMLInputElement | null = null;
    const setRef = useCallback(input => inputEl = input, [inputEl]);
    // @ts-ignore
    const focus = useCallback(() => inputEl && inputEl.focus(), [inputEl]);
    // @ts-ignore
    const blur = useCallback(() => inputEl && inputEl.blur(), [inputEl]);

    const [isPasswordHidden, hidePassword] = useState(true);

    const isPasswordType: boolean = useMemo(() => type === 'password', [type]);
    const isVisiblePassword: boolean = useMemo(
        () => isPasswordType && !isPasswordHidden,
        [isPasswordHidden, isPasswordType]
    );
    const isTouch: boolean = useMemo(() => detectTouch(), []);

    const togglePasswordHiding = useCallback(
        () => hidePassword(prevPassState => !prevPassState),
        [isPasswordHidden]
    );
    const onIconClick = useCallback(e => {
        isPasswordType && togglePasswordHiding();
        onCustomIconClick && onCustomIconClick(e);
    }, [isPasswordType, togglePasswordHiding, onCustomIconClick]);

    const inputParams = {
        className: cn('field', { 'big-space': bigSpace }),
        disabled,
        id,
        mask,
        maskChar,
        maxLength,
        name,
        onBlur,
        onChange,
        onFocus,
        onKeyUp,
        placeholder,
        required,
        type: isVisiblePassword ? 'text' : type,
        value,
    };

    const renderIcon = () => {
        if (hideIcon) {
            return null;
        }

        let icon: React.ReactNode | undefined;
        switch (true) {
            case !!customIcon:
                icon = customIcon;
                break;
            case verification === 'error':
                icon = <ErrorIcon className={cn('icon')} />;
                break;
            case verification === 'valid':
                icon = <CheckedIcon className={cn('icon')} />;
                break;
            case isPasswordType && isPasswordHidden:
                icon = <Hide className={cn('icon')} />;
                break;
            case isPasswordType && !isPasswordHidden:
                icon = <Show className={cn('icon')} />;
                break;
            case required:
                icon = <div className={cn('require-circle')} />;
                break;
            default:
                break;
        }
        if (icon) {
            return (
                <div
                    className={cn('icon-box', { password: isPasswordType, custom: !!customIcon })}
                    onClick={onIconClick}
                >
                    {icon}
                </div>
            );
        }
        return null;
    };

    return (
        <div className={cn('', {
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
                {mask
                    ? <InputMask {...inputParams} inputRef={setRef} />
                    : <input {...inputParams} ref={setRef} />
                }
                {renderIcon()}
            </div>
            {verificationText && <div
                    className={cn('text', { error: verification === 'error', success: verification === 'valid' })}
                    dangerouslySetInnerHTML={{ __html: verificationText }}
                />
            }
            {commentText && <div className={cn('text')}>{commentText}</div>}
        </div>
    );
};

const areEqual = (
    prevProps: ITextFieldProps,
    nextProps: ITextFieldProps
): boolean => equal(prevProps, nextProps);

export default React.memo<any>(TextField, areEqual);
