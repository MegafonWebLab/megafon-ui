import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCallback, useState, useMemo, Fragment } from 'react';
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
    /** Field title */
    label?: string;
    /** Type - property tag <input> */
    type?: 'text' | 'password' | 'tel' | 'email';
    /** Field color scheme */
    theme?: 'default' | 'white';
    /** Not show icon of state */
    hideIcon?: boolean;
    /** Validation passed */
    verification?: 'valid' | 'error';
    /** notice text */
    noticeText?: string;
    /** Disable field */
    disabled?: boolean;
    /** Required field */
    required?: boolean;
    /** custom ref */
    inputRef?: React.Ref<any>;
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
        bigSpace,
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
    };

    const inputParams = {
        ...commonParams,
        className: cn('field', { 'big-space': bigSpace }),
        mask,
        maskChar,
        maxLength,
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

    const renderInput = (): React.ReactNode => {
        return (
            <Fragment>
                {mask
                    ? <InputMask {...inputParams} inputRef={inputRef} />
                    : <input {...inputParams} ref={inputRef} />
                }
                {renderIconBlock()}
            </Fragment>
        );
    };

    const renderTextarea = (): React.ReactNode => <textarea {...textareaParams} ref={inputRef} />;

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
    bigSpace: PropTypes.bool,
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
