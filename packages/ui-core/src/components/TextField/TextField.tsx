import * as React from 'react';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { cnCreate, detectTouch, filterDataAttrs } from '@megafon/ui-helpers';
import Hide from '@megafon/ui-icons/basic-24-hide_24.svg';
import Show from '@megafon/ui-icons/basic-24-show_24.svg';
import ErrorIcon from '@megafon/ui-icons/system-24-cancel_24.svg';
import CheckedIcon from '@megafon/ui-icons/system-24-checked_24.svg';
import * as PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import InputLabel from '../InputLabel/InputLabel';
import Paragraph from '../Paragraph/Paragraph';
import './TextField.less';

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

export type TextFieldProps = {
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
    classes?: { input?: string };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        label?: Record<string, string>;
        notice?: Record<string, string>;
        input?: Record<string, string>;
        iconBox?: Record<string, string>;
    };
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
};

const TEXTAREA_MIN_HEIGHT = 96;
const TEXTAREA_MAX_HEIGHT = 168;
const ROW_HEIGHT = 24;
const DEFAULT_ROW_COUNT = 3;

const cn = cnCreate('mfui-text-field');
const TextField: React.FC<TextFieldProps> = ({
    className,
    customIcon,
    disabled,
    hideIcon = false,
    id,
    label,
    mask,
    maskChar,
    maxLength,
    symbolCounter,
    textarea = false,
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
    theme = 'default',
    type = 'text',
    value = '',
    verification,
    noticeText,
    inputRef,
    inputMode,
    classes: { input } = {},
    dataAttrs,
}) => {
    const [isPasswordHidden, setPasswordHidden] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string | number | undefined>(value);
    const [initialTextareaHeight, setInitialTextareaHeight] = useState(TEXTAREA_MIN_HEIGHT);
    const [isTextareaResized, setIsTextareaResized] = useState(false);
    const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(false);
    const [isTouch, setTouch] = useState(false);
    const fieldNode = useRef<HTMLInputElement | HTMLTextAreaElement>();

    const isPasswordType: boolean = useMemo(() => type === 'password', [type]);
    const isVisiblePassword: boolean = useMemo(
        () => isPasswordType && !isPasswordHidden,
        [isPasswordHidden, isPasswordType],
    );

    const checkSymbolMaxLimit = useCallback(
        (textareaValue: string | number = ''): void => {
            if (!symbolCounter) {
                return;
            }

            setIsMaxLimitExceeded(symbolCounter < String(textareaValue).length);
        },
        [symbolCounter],
    );

    useEffect(() => {
        !isControlled && setInputValue(value);
        checkSymbolMaxLimit(value);
    }, [value, checkSymbolMaxLimit]);

    useEffect(() => {
        setTouch(detectTouch());
    }, []);

    const togglePasswordHiding = useCallback(
        () => setPasswordHidden(prevPassState => !prevPassState),
        [isPasswordHidden],
    );

    const setTextareaHeight = (): void => {
        if (!fieldNode?.current) {
            return;
        }

        const {
            current: { scrollHeight },
        } = fieldNode;

        if (!isTextareaResized) {
            const extraRowCount = Math.round((scrollHeight - TEXTAREA_MIN_HEIGHT) / ROW_HEIGHT);
            const newHeight =
                extraRowCount <= DEFAULT_ROW_COUNT
                    ? TEXTAREA_MIN_HEIGHT + ROW_HEIGHT * extraRowCount
                    : TEXTAREA_MAX_HEIGHT;

            setInitialTextareaHeight(newHeight);
        }
    };

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

        const {
            current: { offsetHeight: textAreaHeight },
        } = fieldNode;

        setIsTextareaResized(textAreaHeight < initialTextareaHeight);
    };

    const handleIconClick = useCallback(
        e => {
            const { ERROR } = Verification;
            const isClearFuncAvailable = !customIcon && !onCustomIconClick && verification === ERROR;
            const { current: field } = fieldNode;

            isPasswordType && togglePasswordHiding();
            onCustomIconClick && onCustomIconClick(e);
            if (!isControlled && isClearFuncAvailable) {
                setInputValue('');
                field && field.focus();
            }
        },
        [isPasswordType, togglePasswordHiding, onCustomIconClick, verification, setInputValue],
    );

    const handleFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            onFocus && onFocus(e);
        },
        [onFocus],
    );

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            onBlur && onBlur(e);
        },
        [onBlur],
    );

    const handleBeforeMaskChange = useCallback(
        (newState, oldState, inputedValue) =>
            onBeforeMaskChange && onBeforeMaskChange(inputedValue, newState, oldState),
        [onBeforeMaskChange],
    );

    const textareaType = textarea === TextareaTypes.FLEXIBLE ? TextareaTypes.FLEXIBLE : TextareaTypes.FIXED;
    const hasScrolling = initialTextareaHeight >= TEXTAREA_MAX_HEIGHT || isTextareaResized;

    const commonParams = {
        ...filterDataAttrs(dataAttrs?.input),
        disabled,
        id,
        name,
        value: isControlled ? value : inputValue,
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
        className: cn(
            'field',
            {
                type: textareaType,
                scrolling: hasScrolling,
            },
            input,
        ),
    };

    const getFieldNode = (node: HTMLInputElement | HTMLTextAreaElement | null) => {
        if (!node) {
            return;
        }

        fieldNode.current = node;
        inputRef && inputRef(node);
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

    const renderTextarea = (): React.ReactNode => (
        <>
            <textarea
                {...textareaParams}
                onClick={handleTextareaClick}
                style={{ height: `${initialTextareaHeight}px` }}
                ref={getFieldNode}
            />
        </>
    );

    const renderIconBlock = () => {
        const icon: React.ReactNode | null = getIcon();

        return (
            icon && (
                <div
                    {...filterDataAttrs(dataAttrs?.iconBox)}
                    className={cn('icon-box', {
                        error: verification === Verification.ERROR && !customIcon,
                        password: isPasswordType,
                        'custom-handler': !!onCustomIconClick,
                    })}
                    onClick={handleIconClick}
                >
                    {icon}
                </div>
            )
        );
    };

    const renderInput = (): React.ReactNode => (
        <>
            {mask ? (
                <InputMask {...inputParams} {...inputMaskParams} inputRef={getFieldNode} />
            ) : (
                <input {...inputParams} ref={getFieldNode} />
            )}
            {!hideIcon && renderIconBlock()}
        </>
    );

    const renderField = (): React.ReactNode => {
        if (textarea) {
            return renderTextarea();
        }

        return renderInput();
    };

    const isPlaceholderShowed = isPasswordType && isPasswordHidden && !!inputValue;
    const valueHasSymbols = inputValue !== null && inputValue !== undefined;
    const currentSymbolCount = (valueHasSymbols && String(inputValue).length) || 0;

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn(
                {
                    disabled,
                    theme,
                    valid: verification === Verification.VALID,
                    error: verification === Verification.ERROR || isMaxLimitExceeded,
                    icon: !hideIcon && (!!verification || !!customIcon || type === 'password') && !textarea,
                    password: isPlaceholderShowed,
                },
                className,
            )}
        >
            {label && (
                <InputLabel dataAttrs={{ root: dataAttrs?.label }} htmlFor={id}>
                    {label}
                    {required && <span className={cn('require-mark')}>*</span>}
                </InputLabel>
            )}
            <div className={cn('field-wrapper', { 'no-touch': !isTouch })}>{renderField()}</div>
            <div className={cn('wrap')}>
                {noticeText && (
                    <div
                        {...filterDataAttrs(dataAttrs?.notice)}
                        className={cn('text', {
                            error: verification === Verification.ERROR,
                            success: verification === Verification.VALID,
                        })}
                    >
                        {noticeText}
                    </div>
                )}
                {symbolCounter && (
                    <Paragraph size="small" hasMargin={false} className={cn('counter', { error: isMaxLimitExceeded })}>
                        {`${currentSymbolCount}/${symbolCounter}`}
                    </Paragraph>
                )}
            </div>
        </div>
    );
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
    isControlled: PropTypes.bool,
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
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        label: PropTypes.objectOf(PropTypes.string.isRequired),
        notice: PropTypes.objectOf(PropTypes.string.isRequired),
        input: PropTypes.objectOf(PropTypes.string.isRequired),
        iconBox: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default TextField;
