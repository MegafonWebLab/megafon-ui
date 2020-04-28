import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCallback, useState, useMemo, useRef } from 'react';
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
    /** Field title */
    label?: string;
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
    /** verification text */
    verificationText?: string;
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
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** Blur handler */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /** Focus handler */
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /** KeyUp handler */
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Custom icon click handler */
    onCustomIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const cn = cnCreate('mfui-text-field');
const TextField: React.FC<ITextFieldProps> = (
    {
        bigSpace,
        commentText,
        className,
        customIcon,
        disabled,
        hideIcon,
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
        theme,
        type,
        value,
        verification,
        verificationText,
    }
) => {
    const inputEl: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const setRef = useCallback(input => inputEl.current = input, [inputEl]);
    // @ts-ignore
    const handleFocus = useCallback(() => inputEl.current && inputEl.current.focus(), [inputEl]);
    // @ts-ignore
    const handleBlur = useCallback(() => inputEl.current && inputEl.current.blur(), [inputEl]);

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

    const renderIcon = (): React.ReactNode | null => {
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
            case required:
                return <div className={cn('require-circle')} />;
        }
        return null;
    };

    const renderIconBlock = () => {
        if (hideIcon) {
            return null;
        }

        const icon: React.ReactNode | null = renderIcon();

        if (icon) {
            return (
                <div
                    className={cn('icon-box', { password: isPasswordType, custom: !!customIcon })}
                    onClick={handleIconClick}
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
                {renderIconBlock()}
            </div>
            {verificationText &&
                <div className={cn('text', {
                    error: verification === 'error',
                    success: verification === 'valid',
                })}>
                    {verificationText}
                </div>
            }
            {commentText && <div className={cn('text')}>{commentText}</div>}
        </div>
    );
};

TextField.defaultProps = {
    theme: 'default',
    type: 'text',
    hideIcon: false,
};

TextField.propTypes = {
    label: PropTypes.string,
    theme: PropTypes.oneOf(['default', 'white']),
    commentText: PropTypes.string,
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
    bigSpace: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyUp: PropTypes.func,
    onCustomIconClick: PropTypes.func,
};

export default TextField;
