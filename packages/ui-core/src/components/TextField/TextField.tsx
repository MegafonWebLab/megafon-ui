import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import './TextField.less';
import InputLabel from '../InputLabel/InputLabel';
import Paragraph from '../Paragraph/Paragraph';
import CheckedIcon from 'icons/System/24/Checked_24.svg';
import ErrorIcon from 'icons/System/24/Cancel_24.svg';
import Hide from 'icons/Basic/24/Hide_24.svg';
import Show from 'icons/Basic/24/Show_24.svg';

const InputMask = require('react-input-mask');

export const Verification = {
    VALID: 'valid',
    ERROR: 'error',
} as const;

export const TextareaTypes = {
    FIXED: 'fixed',
    FLEXIBLE: 'flexible',
} as const;

interface IMaskSelection {
    start: number;
    end: number;
}

export interface IMaskState {
    value: string;
    selection: IMaskSelection;
}

export interface ITextFieldProps {
    /** Включить режим textarea. Fixed - это alias для textarea=true. */
    textarea?: boolean | 'fixed' | 'flexible';
    /** Лейбл */
    label?: string;
    /** Атрибут элемента input. Не работает с textarea=true */
    type?: 'text' | 'password' | 'tel' | 'email';
    /** Цветовая тема */
    theme?: 'default' | 'white';
    /** Запрещает отрисовку иконки */
    hideIcon?: boolean;
    /** Отображение валидации */
    verification?: 'valid' | 'error';
    /** Подпись снизу, меняет цвет в зависимости от аргумента verification */
    noticeText?: string;
    /** Управление возможностью взаимодействия с компонентом */
    disabled?: boolean;
    /** Показывает обязательность поля  */
    required?: boolean;
    /** Ref обработчик */
    inputRef?: (node: HTMLInputElement | HTMLTextAreaElement) => void;
    /** Имя поля */
    name?: string;
    /** Отображаемый текст при отсутствии значения */
    placeholder?: string;
    /** Атрибут корневого DOM элемента компонента */
    id?: string;
    /** Внешнее значение компонента */
    value?: string | number;
    /** Максимальное вводимое количество текста */
    maxLength?: number;
    /** Показывает счетчик с подсчетом введенных символов. Только для textarea. */
    symbolCounter?: number;
    /** Иконка */
    customIcon?: JSX.Element;
    /** Маска для поля. Не работает с textarea=true. */
    /** Дополнительную информацию можно найти на https://github.com/sanniassin/react-input-mask */
    mask?: string;
    /** Разделение символов для маски. Не работает textarea=true */
    maskChar?: string;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы элементов */
    classes?: { input?: string | null };
    /** Аргумент элемента input */
    inputMode?: 'numeric' | 'tel' | 'decimal' | 'email' | 'url' | 'search' | 'none';
    /** Переводит компонент в контролируемое состояние */
    isControlled?: boolean;
    /** Обработчик изменения значения */
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Обработчик изменения значения маскированного инпута до обработки маской */
    onBeforeMaskChange?: (value: string, newState: IMaskState, oldState: IMaskState) => void;
    /** Обработчик выхода из фокуса */
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Обработчик входа в фокус */
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Обработчик поднятия клавиши */
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Обработчик клика добавленной иконки */
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

const TEXTAREA_MIN_HEIGHT = 96;
const TEXTAREA_MAX_HEIGHT = 168;
const ROW_HEIGHT = 24;
const DEFAULT_ROW_COUNT = 3;

const cn = cnCreate('mfui-beta-text-field');
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
        symbolCounter,
        textarea,
        name,
        placeholder,
        required,
        isControlled = false,
        onBlur,
        onChange,
        onBeforeMaskChange,
        onCustomIconClick,
        onFocus,
        onKeyUp,
        theme,
        type,
        value,
        verification,
        noticeText,
        inputRef,
        inputMode,
        classes: {
            input,
        } = {},
    }) => {
    const [isPasswordHidden, setPasswordHidden] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string | number | undefined>(value);
    const [isIE11, setIsIE11] = useState(false);
    const [initialTextareaHeight, setInitialTextareaHeight] = useState(TEXTAREA_MIN_HEIGHT);
    const [isTextareaResized, setIsTextareaResized] = useState(false);
    const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(false);
    const fieldNode = useRef<HTMLInputElement | HTMLTextAreaElement>();

    const isPasswordType: boolean = useMemo(() => type === 'password', [type]);
    const isVisiblePassword: boolean = useMemo(
        () => isPasswordType && !isPasswordHidden,
        [isPasswordHidden, isPasswordType]
    );
    const isTouch: boolean = useMemo(() => detectTouch(), []);

    const renderPlaceholderForIe = (classes: string): React.ReactNode => {
        return <span className={cn(classes)}>{placeholder}</span>;
    };

    const checkSymbolMaxLimit = useCallback((textareaValue: string | number = ''): void => {
        if (!symbolCounter) {
            return;
        }

        setIsMaxLimitExceeded(symbolCounter < String(textareaValue).length);
    }, [symbolCounter]);

    useEffect(() => {
        setInputValue(value);
        checkSymbolMaxLimit(value);
    }, [value, checkSymbolMaxLimit]);

    useEffect(() => {
        if (detectIE11()) {
            setIsIE11(true);
        }
    }, []);

    const togglePasswordHiding = useCallback(
        () => setPasswordHidden(prevPassState => !prevPassState),
        [isPasswordHidden]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (textarea === TextareaTypes.FLEXIBLE) {
            setTextareaHeight();
        }

        !isControlled && setInputValue(e.target.value);
        checkSymbolMaxLimit(e.target.value);

        onChange && onChange(e);
    };

    const handleTextareaClick = () => {
        if (!fieldNode?.current) {
            return;
        }

        const { current: { offsetHeight: textAreaHeight } } = fieldNode;

        setIsTextareaResized(textAreaHeight < initialTextareaHeight);
    };

    const handleIconClick = useCallback(e => {
        const isClearFuncAvailable = !customIcon && !onCustomIconClick && verification === Verification.ERROR;
        const { current: field } = fieldNode;

        isPasswordType && togglePasswordHiding();
        onCustomIconClick && onCustomIconClick(e);
        if (!isControlled && isClearFuncAvailable) {
            setInputValue('');
            field && field.focus();
        }
    }, [isPasswordType, togglePasswordHiding, onCustomIconClick, verification, setInputValue]);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFocus && onFocus(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onBlur && onBlur(e);
    }, [onBlur]);

    const handleBeforeMaskChange = useCallback((newState, oldState, inputedValue) =>
        onBeforeMaskChange && onBeforeMaskChange(inputedValue, newState, oldState),
    [onBeforeMaskChange]);

    const textareaType = textarea === TextareaTypes.FLEXIBLE ? TextareaTypes.FLEXIBLE : TextareaTypes.FIXED;
    const hasScrolling = initialTextareaHeight >= TEXTAREA_MAX_HEIGHT || isTextareaResized;

    const commonParams = {
        disabled,
        id,
        name,
        value: inputValue,
        onChange: handleInputChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onKeyUp,
        maxLength,
        placeholder,
        required,
        inputMode,
    };

    const inputParams = {
        ...commonParams,
        className: cn('field', input),
        type: isVisiblePassword ? 'text' : type,
    };

    const inputMaskParams = {
        mask,
        maskChar,
        beforeMaskedValueChange: onBeforeMaskChange ? handleBeforeMaskChange : undefined,
    };

    const textareaParams = {
        ...commonParams,
        className: cn('field', {
            type: textareaType,
            scrolling: hasScrolling,
        }, input),
    };

    const getFieldNode = (node: HTMLInputElement | HTMLTextAreaElement | null) => {
        if (!node) {
            return;
        }

        fieldNode.current = node;
        inputRef && inputRef(node);
    };

    const setTextareaHeight = (): void => {
        if (!fieldNode?.current) {
            return;
        }

        const { current: { scrollHeight } } = fieldNode;

        if (!isTextareaResized) {
            const extraRowCount = Math.round((scrollHeight - TEXTAREA_MIN_HEIGHT) / ROW_HEIGHT);
            const newHeight = extraRowCount <= DEFAULT_ROW_COUNT
                ? TEXTAREA_MIN_HEIGHT + ROW_HEIGHT * extraRowCount
                : TEXTAREA_MAX_HEIGHT;

            setInitialTextareaHeight(newHeight);
        }
    };

    const renderField = (): React.ReactNode => {
        if (textarea) {
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
                    ? <InputMask {...inputParams}  {...inputMaskParams} inputRef={getFieldNode} />
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
                <textarea
                    {...textareaParams}
                    onClick={handleTextareaClick}
                    style={{ height: `${initialTextareaHeight}px`}}
                    ref={getFieldNode}
                />
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
            default:
                return null;
        }
    };

    const renderIconBlock = () => {
        const icon: React.ReactNode | null = getIcon();

        return icon && (
            <div
                className={cn('icon-box', {
                    error: verification === Verification.ERROR && !customIcon,
                    password: isPasswordType,
                    'custom-handler': !!onCustomIconClick,
                })}
                onClick={handleIconClick}
            >
                {icon}
            </div>
        );
    };

    const isPlaceholderShowed = isPasswordType && isPasswordHidden && !!inputValue;
    const valueHasSymbols = inputValue !== null && inputValue !== undefined;
    const currentSymbolCount = valueHasSymbols && String(inputValue).length || 0;

    return (
        <div className={cn({
            disabled,
            theme,
            valid: verification === Verification.VALID,
            error: verification === Verification.ERROR || isMaxLimitExceeded,
            icon: !hideIcon && (!!verification || !!customIcon || type === 'password') && !textarea,
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
            <div className={cn('wrap')}>
                {noticeText &&
                    <div className={cn('text', {
                        error: verification === Verification.ERROR,
                        success: verification === Verification.VALID,
                    })}>
                        {noticeText}
                    </div>
                }
                {symbolCounter && (
                    <Paragraph
                        size="small"
                        hasMargin={false}
                        className={cn('counter', { error: isMaxLimitExceeded })}
                    >
                        {`${currentSymbolCount}/${symbolCounter}`}
                    </Paragraph>
                )}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    textarea: false,
    theme: 'default',
    type: 'text',
    hideIcon: false,
};

TextField.propTypes = {
    textarea: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(Object.values(TextareaTypes))]),
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxLength: PropTypes.number,
    symbolCounter: PropTypes.number,
    customIcon: PropTypes.element,
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    noticeText: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBeforeMaskChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyUp: PropTypes.func,
    onCustomIconClick: PropTypes.func,
    inputRef: PropTypes.func,
    classes: PropTypes.shape({
        input: PropTypes.string,
    }),
};

export default TextField;
