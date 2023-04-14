/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { checkEventIsClickOrEnterPress, cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import Hide from '@megafon/ui-icons/basic-24-hide_24.svg';
import Show from '@megafon/ui-icons/basic-24-show_24.svg';
import ClearIcon from '@megafon/ui-icons/system-24-cancel_24.svg';
import CheckedIcon from '@megafon/ui-icons/system-24-checked_24.svg';
import throttle from 'lodash.throttle';
import * as PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import throttleTime from '../../constants/throttleTime';
import ResizeIcon from './i/textarea-resizer.svg';
import countGraphemes from './utils/countGraphemes';
import './TextField.less';

const TEXTAREA_MAX_HEIGHT = 144;
const DEFAULT_LABEL_TOP_POSITION = 16;
const DEFAULT_ROW_COUNT = 3;
const ROW_HEIGHT = 24;

const DEFAULT_PLACEHOLDERS = {
    email: 'E-mail',
    tel: 'Номер телефона',
    password: 'Пароль',
    text: 'Текст',
};

export const Verification = {
    VALID: 'valid',
    ERROR: 'error',
} as const;

export const TextareaTypes = {
    FIXED: 'fixed',
    FLEXIBLE: 'flexible',
} as const;

export const MinTextareaHeight = {
    ONE_ROW: ROW_HEIGHT,
    THREE_ROWS: ROW_HEIGHT * DEFAULT_ROW_COUNT,
} as const;

type MinTextareaHeightType = typeof MinTextareaHeight[keyof typeof MinTextareaHeight];

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
    /** Отключение поля ввода */
    disabled?: boolean;
    /** Показывает обязательность поля  */
    required?: boolean;
    /** Ref обработчик */
    inputRef?: (node: HTMLInputElement | HTMLTextAreaElement) => void;
    /** Имя поля */
    name?: string;
    /** Запрещает отображение плейсхолдера */
    hidePlaceholder?: boolean;
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
    /** Включает подсчет введенных [графем](https://ru.wikipedia.org/wiki/%D0%93%D1%80%D0%B0%D1%84%D0%B5%D0%BC%D0%B0) и символов при `symbolCounter=true`
     *
     *  **Пример**: эмоджи 👩‍💻 - это одна графема, состоящая из 5 символов.
     *
     * - для `true` Количество символов в строке "hello world👩‍💻" = 12
     * - для `false` Количество символов в строке "hello world👩‍💻" = 16
     */
    graphemesCounter?: boolean;
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
    classes?: {
        label?: string;
        input?: string;
    };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        label?: Record<string, string>;
        notice?: Record<string, string>;
        input?: Record<string, string>;
        iconBox?: Record<string, string>;
        resizer?: Record<string, string>;
    };
    /** Атрибут элемента input */
    inputMode?: 'numeric' | 'tel' | 'decimal' | 'email' | 'url' | 'search' | 'none';
    /** Атрибут элемента input. Не работает с textarea=true */
    autoComplete?: string;
    /** Переводит компонент в контролируемое состояние */
    isControlled?: boolean;
    /** Минимальная высота textarea, px */
    minTextareaHeight?: MinTextareaHeightType;
    /** Скрывает кнопку ресайза для textarea="flexible" */
    hideResizeButton?: boolean;
    /** Отключает перевод строки по Enter */
    disableEnterLineBreak?: boolean;
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
    graphemesCounter,
    symbolCounter,
    textarea = false,
    name,
    hidePlaceholder = false,
    placeholder,
    required,
    isControlled = false,
    minTextareaHeight = MinTextareaHeight.THREE_ROWS,
    disableEnterLineBreak = false,
    hideResizeButton = false,
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
    noticeText = '',
    inputRef,
    inputMode,
    autoComplete,
    classes = {},
    dataAttrs,
}) => {
    const [isPasswordHidden, setPasswordHidden] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string | number | undefined>(value);
    const [textareaHeight, setTextareaHeight] = useState<number>(minTextareaHeight);
    const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(false);
    const [currentNoticeText, setCurrentNoticeText] = useState(noticeText);
    const [isTextareaResizeFocused, setIsTextareaResizeFocused] = useState(false);
    const [isTextareaResized, setIsTextareaResized] = useState(false);

    const fieldNode = useRef<HTMLInputElement | HTMLTextAreaElement>();
    const labelRef = useRef<HTMLLabelElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);

    const isPasswordType: boolean = useMemo(() => type === 'password', [type]);
    const isVisiblePassword: boolean = useMemo(
        () => isPasswordType && !isPasswordHidden,
        [isPasswordHidden, isPasswordType],
    );

    const hasValue = isControlled ? !!value : !!inputValue;
    const isValidVerification = verification === Verification.VALID && !disabled;
    const isErrorVerification = verification === Verification.ERROR && !disabled;
    const hasValueForClear = hasValue && !isPasswordType && !customIcon && !isValidVerification;
    const hasClearIcon = !disabled && (hasValueForClear || isErrorVerification);
    const actualPlaceholder = placeholder || DEFAULT_PLACEHOLDERS[type];

    const checkSymbolMaxLimit = useCallback(
        (textareaValue: string | number = ''): void => {
            if (!symbolCounter) {
                return;
            }

            const countValue = graphemesCounter ? countGraphemes(String(textareaValue)) : String(textareaValue).length;

            setIsMaxLimitExceeded(symbolCounter < countValue);
        },
        [graphemesCounter, symbolCounter],
    );

    useEffect(() => {
        if (!textarea || !fieldNode.current || isTextareaResized) {
            return;
        }

        fieldNode.current.style.height = `${minTextareaHeight}px`;

        const { scrollHeight } = fieldNode.current;
        const { paddingTop, paddingBottom } = window.getComputedStyle(fieldNode.current);
        const innerHeight = scrollHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);

        if (innerHeight >= TEXTAREA_MAX_HEIGHT) {
            fieldNode.current.style.height = `${TEXTAREA_MAX_HEIGHT}px`;
        } else {
            fieldNode.current.style.height = `${innerHeight}px`;
        }
    }, [isTextareaResized, minTextareaHeight, inputValue, textarea]);

    useEffect(() => {
        !isControlled && setInputValue(value);
        checkSymbolMaxLimit(value);
    }, [value, checkSymbolMaxLimit, isControlled]);

    useEffect(() => {
        noticeText && setCurrentNoticeText(noticeText);
    }, [noticeText]);

    useEffect(() => {
        if (!resizerRef.current || textarea !== TextareaTypes.FLEXIBLE) {
            return;
        }

        const handleStartResize = (downEvent: MouseEvent | TouchEvent): void => {
            if (!fieldNode.current) {
                return;
            }

            setIsTextareaResizeFocused(true);

            downEvent.preventDefault();

            const originalHeight = parseFloat(
                getComputedStyle(fieldNode.current).getPropertyValue('height').replace('px', ''),
            );
            const originalCoordinateY =
                (downEvent as MouseEvent).clientY || (downEvent as TouchEvent).touches[0].clientY;

            const handleResize = throttle((moveEvent: MouseEvent | TouchEvent): void => {
                const currentCoordinateY =
                    (moveEvent as MouseEvent).clientY || (moveEvent as TouchEvent).touches[0].clientY;
                const resizeHeight = originalHeight + (currentCoordinateY - originalCoordinateY);

                const updatedHeight = resizeHeight < minTextareaHeight ? minTextareaHeight : resizeHeight;

                setTextareaHeight(updatedHeight);
                setIsTextareaResized(true);
            }, throttleTime.resizeTextarea);

            const handleResizeCancel = (): void => {
                setIsTextareaResizeFocused(false);
                window.removeEventListener('mousemove', handleResize);
                window.removeEventListener('touchmove', handleResize);

                window.removeEventListener('mouseup', handleResizeCancel);
                window.removeEventListener('touchend', handleResizeCancel);
            };

            window.addEventListener('mousemove', handleResize);
            window.addEventListener('touchmove', handleResize);

            window.addEventListener('mouseup', handleResizeCancel);
            window.addEventListener('touchend', handleResizeCancel);
        };

        resizerRef.current.addEventListener('mousedown', handleStartResize);
        resizerRef.current.addEventListener('touchstart', handleStartResize);
    }, [textarea, minTextareaHeight]);

    const togglePasswordHiding = useCallback(() => setPasswordHidden(prevPassState => !prevPassState), []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        !isControlled && setInputValue(e.target.value);
        checkSymbolMaxLimit(e.target.value);
        onChange?.(e);
    };

    const handleNoticeTransitionEnd = useCallback(() => {
        !noticeText && setCurrentNoticeText(noticeText);
    }, [noticeText]);

    const handleTextareaScroll = () => {
        if (!fieldNode?.current || !labelRef?.current) {
            return;
        }

        const {
            current: { scrollTop },
        } = fieldNode;

        if (!scrollTop) {
            labelRef.current.style.top = '';

            return;
        }

        labelRef.current.style.top = `${DEFAULT_LABEL_TOP_POSITION - scrollTop}px`;
    };

    const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        checkEventIsClickOrEnterPress(e) && !e.shiftKey && e.preventDefault();
    };

    const handleIconClick = useCallback(
        e => {
            const isClearFuncAvailable = !customIcon && !onCustomIconClick && hasClearIcon;
            const { current: field } = fieldNode;

            isPasswordType && togglePasswordHiding();
            onCustomIconClick?.(e);
            if (!isControlled && isClearFuncAvailable) {
                setInputValue('');
                field?.focus();
            }
        },
        [isPasswordType, togglePasswordHiding, onCustomIconClick, customIcon, isControlled, hasClearIcon],
    );

    const handleFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            onFocus?.(e);
        },
        [onFocus],
    );

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            onBlur?.(e);
        },
        [onBlur],
    );

    const handleBeforeMaskChange = useCallback(
        (newState, oldState, inputedValue) =>
            onBeforeMaskChange && onBeforeMaskChange(inputedValue, newState, oldState),
        [onBeforeMaskChange],
    );

    const textareaType = textarea === TextareaTypes.FLEXIBLE ? TextareaTypes.FLEXIBLE : TextareaTypes.FIXED;

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
        maxLength:
            (graphemesCounter && maxLength && countGraphemes(String(inputValue)) < maxLength ? -1 : maxLength) ||
            maxLength,
        placeholder: hidePlaceholder ? ' ' : actualPlaceholder,
        required,
        inputMode,
    };

    const inputParams = {
        ...commonParams,
        className: cn(
            'field',
            {
                'no-icon': hideIcon,
            },
            classes?.input,
        ),
        type: isVisiblePassword ? 'text' : type,
        autoComplete,
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
                textarea,
                resized: isTextareaResizeFocused,
            },
            classes?.input,
        ),
    };

    const getFieldNode = (node: HTMLInputElement | HTMLTextAreaElement | null) => {
        if (!node) {
            return;
        }

        fieldNode.current = node;
        inputRef?.(node);
    };

    const getIcon = (): JSX.Element | undefined => {
        switch (true) {
            case !!customIcon:
                return customIcon;
            case isPasswordType && isPasswordHidden:
                return <Hide className={cn('icon')} />;
            case isPasswordType && !isPasswordHidden:
                return <Show className={cn('icon')} />;
            case isValidVerification:
                return <CheckedIcon className={cn('icon')} />;
            case hasClearIcon:
                return <ClearIcon className={cn('icon', { clear: true })} />;
            default:
                return undefined;
        }
    };

    const renderLabel = (): JSX.Element => {
        const currentLabel = label || actualPlaceholder;

        return (
            <label
                {...filterDataAttrs(dataAttrs?.label)}
                htmlFor={id}
                className={cn('label', [classes?.label])}
                ref={labelRef}
            >
                {currentLabel}
                {required && <span className={cn('require-mark')}>*</span>}
            </label>
        );
    };

    const renderTextarea = (): JSX.Element => (
        <>
            <textarea
                {...textareaParams}
                style={{ height: `${textareaHeight}px` }}
                ref={getFieldNode}
                onKeyDown={disableEnterLineBreak ? handleTextareaKeyDown : undefined}
                onScroll={handleTextareaScroll}
            />
            {renderLabel()}
        </>
    );

    const renderIconBlock = (): JSX.Element | undefined => {
        const icon: React.ReactNode | null = getIcon();

        if (!icon) {
            return undefined;
        }

        return (
            <div
                {...filterDataAttrs(dataAttrs?.iconBox)}
                className={cn('icon-box', {
                    error: isErrorVerification && !customIcon,
                    password: isPasswordType,
                    'custom-handler': !!onCustomIconClick,
                })}
                onClick={handleIconClick}
            >
                {icon}
            </div>
        );
    };

    const renderInput = (): JSX.Element => (
        <>
            {mask ? (
                <InputMask {...inputParams} {...inputMaskParams} inputRef={getFieldNode} />
            ) : (
                <input {...inputParams} ref={getFieldNode} />
            )}
            {renderLabel()}
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
    const currentSymbolCount =
        (valueHasSymbols && ((graphemesCounter && countGraphemes(String(inputValue))) || String(inputValue).length)) ||
        0;

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn(
                {
                    disabled,
                    theme,
                    valid: isValidVerification,
                    error: isErrorVerification || isMaxLimitExceeded,
                    icon: !hideIcon && (!!verification || !!customIcon || type === 'password') && !textarea,
                    password: isPlaceholderShowed,
                },
                className,
            )}
        >
            <div className={cn('field-wrapper', { textarea: textarea && textareaType })}>
                {renderField()}
                {textareaType === TextareaTypes.FLEXIBLE && !hideResizeButton && (
                    <div className={cn('resizer')} ref={resizerRef} {...filterDataAttrs(dataAttrs?.resizer)}>
                        <ResizeIcon />
                    </div>
                )}
            </div>
            <div className={cn('field-bottom-wrapper', { filled: !!currentNoticeText || !!symbolCounter })}>
                <div
                    className={cn('notice-text', { active: !!noticeText })}
                    onTransitionEnd={handleNoticeTransitionEnd}
                    {...filterDataAttrs(dataAttrs?.notice)}
                >
                    {currentNoticeText}
                </div>
                {symbolCounter && (
                    <span className={cn('counter', { error: isMaxLimitExceeded })}>
                        {`${currentSymbolCount}/${symbolCounter}`}
                    </span>
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
    inputMode: PropTypes.oneOf(['numeric', 'tel', 'decimal', 'email', 'url', 'search', 'none']),
    autoComplete: PropTypes.string,
    name: PropTypes.string,
    hidePlaceholder: PropTypes.bool,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    isControlled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxLength: PropTypes.number,
    symbolCounter: PropTypes.number,
    graphemesCounter: PropTypes.bool,
    customIcon: PropTypes.element,
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    noticeText: PropTypes.string,
    className: PropTypes.string,
    minTextareaHeight: PropTypes.oneOf([24, 72]),
    hideResizeButton: PropTypes.bool,
    disableEnterLineBreak: PropTypes.bool,
    onChange: PropTypes.func,
    onBeforeMaskChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyUp: PropTypes.func,
    onCustomIconClick: PropTypes.func,
    inputRef: PropTypes.func,
    classes: PropTypes.shape({
        label: PropTypes.string,
        input: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        label: PropTypes.objectOf(PropTypes.string.isRequired),
        notice: PropTypes.objectOf(PropTypes.string.isRequired),
        input: PropTypes.objectOf(PropTypes.string.isRequired),
        iconBox: PropTypes.objectOf(PropTypes.string.isRequired),
        resizer: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default TextField;
