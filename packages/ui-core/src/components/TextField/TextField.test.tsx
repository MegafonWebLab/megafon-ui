import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField, { TextareaTypes } from './TextField';

const props = {
    className: 'test-class',
    dataAttrs: {
        root: { 'data-testid': 'root' },
        input: { 'data-testid': 'input' },
        label: { 'data-testid': 'label' },
        notice: { 'data-testid': 'notice' },
        iconBox: { 'data-testid': 'iconBox' },
        resizer: { 'data-testid': 'resizer' },
    },
    classes: {
        label: 'labelClass',
        input: 'inputClass',
    },
    id: 'id',
    name: 'name',
    placeholder: 'placeholder',
    value: 'value',
    maxLength: 5,
};

describe('<TextField />', () => {
    describe('props that are not related to the display of fields and work the same regardless of field mode:', () => {
        describe('label', () => {
            it('should render with label', () => {
                const { getByTestId } = render(<TextField {...props} label="label" />);
                const label = getByTestId('label');

                expect(label).toMatchSnapshot();
                expect(label).toHaveAttribute('for', props.id);
            });

            it('should render with value of default placeholder for field with type="text"', () => {
                const { getByTestId } = render(<TextField {...props} placeholder={undefined} />);

                expect(getByTestId('label').innerHTML).toEqual('Текст');
            });

            it('should render with value of placeholder prop', () => {
                const { getByTestId } = render(<TextField {...props} placeholder={props.placeholder} />);

                expect(getByTestId('label').innerHTML).toEqual(props.placeholder);
            });

            it('should render label of required field', () => {
                const { getByTestId } = render(<TextField {...props} label="label" required />);

                expect(getByTestId('label')).toMatchSnapshot();
            });

            it('should render with class from classes', () => {
                const { getByTestId } = render(<TextField {...props} label="label" />);

                expect(getByTestId('label')).toHaveClass(props.classes.label);
            });
        });

        describe('noticeText', () => {
            it('should render with noticeText', () => {
                const { getByTestId } = render(<TextField {...props} noticeText="noticeText" />);
                const noticeNode = getByTestId('notice');

                expect(noticeNode).toMatchSnapshot();
                expect(noticeNode).toHaveClass('mfui-text-field__notice-text_active');
                expect(getByTestId('root').lastElementChild).toHaveClass(
                    'mfui-text-field__field-bottom-wrapper_filled',
                );
            });

            it('should rewrite noticeText after rerender', () => {
                const noticeText = 'noticeText';
                const newNoticeText = 'newNoticeText';
                const { queryByText, rerender } = render(<TextField {...props} noticeText={noticeText} />);

                expect(queryByText(noticeText)).toBeInTheDocument();

                rerender(<TextField {...props} noticeText={newNoticeText} />);

                expect(queryByText(noticeText)).not.toBeInTheDocument();
                expect(queryByText(newNoticeText)).toBeInTheDocument();
            });
        });

        describe('verification', () => {
            it('should render with valid verification', () => {
                const { getByTestId } = render(<TextField {...props} verification="valid" />);

                expect(getByTestId('root')).toHaveClass('mfui-text-field_valid');
            });

            it('should render with valid verification and disabled', () => {
                const { getByTestId } = render(<TextField {...props} verification="valid" disabled />);

                expect(getByTestId('root')).not.toHaveClass('mfui-text-field_valid');
            });

            it('should render with error verification', () => {
                const { getByTestId } = render(<TextField {...props} verification="error" />);

                expect(getByTestId('root')).toHaveClass('mfui-text-field_error');
            });

            it('should render with error verification and disabled', () => {
                const { getByTestId } = render(<TextField {...props} verification="error" disabled />);

                expect(getByTestId('root')).not.toHaveClass('mfui-text-field_error');
            });
        });

        it('should render with theme', () => {
            const { getByTestId } = render(<TextField {...props} theme="white" />);

            expect(getByTestId('root')).toHaveClass('mfui-text-field_theme_white');
        });

        it('should render with className', () => {
            const { getByTestId } = render(<TextField {...props} />);

            expect(getByTestId('root')).toHaveClass(props.className);
        });

        it('should render with dataAttrs', () => {
            const { getByTestId } = render(<TextField {...props} label="label" noticeText="text" />);

            expect(getByTestId('root')).toBeInTheDocument();
            expect(getByTestId('input')).toBeInTheDocument();
            expect(getByTestId('label')).toBeInTheDocument();
            expect(getByTestId('notice')).toBeInTheDocument();
        });
    });

    describe('common props for all input modes', () => {
        it('should render disabled field', () => {
            const { getByTestId } = render(<TextField {...props} disabled />);

            expect(getByTestId('root')).toHaveClass('mfui-text-field_disabled');
            expect(getByTestId('input')).toHaveAttribute('disabled');
        });

        it('should render required field', () => {
            const { getByTestId } = render(<TextField {...props} required />);

            expect(getByTestId('input')).toHaveAttribute('required');
        });

        it('should render with name', () => {
            const { getByTestId } = render(<TextField {...props} name={props.name} />);

            expect(getByTestId('input')).toHaveAttribute('name', props.name);
        });

        it('should render with hidePlaceholder props', () => {
            const { getByTestId } = render(<TextField {...props} placeholder={props.placeholder} hidePlaceholder />);

            expect(getByTestId('input')).toHaveAttribute('placeholder', ' ');
        });

        it('should render with placeholder', () => {
            const { getByTestId } = render(<TextField {...props} placeholder={props.placeholder} />);

            expect(getByTestId('input')).toHaveAttribute('placeholder', props.placeholder);
        });

        it('should render with id', () => {
            const { getByTestId } = render(<TextField {...props} id={props.id} />);

            expect(getByTestId('input')).toHaveAttribute('id', props.id);
        });

        it('should render with maxLength prop', () => {
            const { getByTestId } = render(<TextField {...props} maxLength={props.maxLength} />);

            expect(getByTestId('input')).toHaveAttribute('maxLength', String(props.maxLength));
        });

        it('should render with inputMode prop', () => {
            const { getByTestId } = render(<TextField {...props} inputMode="tel" />);

            expect(getByTestId('input')).toHaveAttribute('inputmode', 'tel');
        });

        describe('value', () => {
            it('should render with value', () => {
                const { getByTestId } = render(<TextField {...props} value={props.value} />);

                expect(getByTestId('input')).toHaveAttribute('value', props.value);
            });

            it('should update value after rerender', () => {
                const newValue = 'newValue';
                const { getByTestId, rerender } = render(<TextField {...props} value={props.value} />);
                const input = getByTestId('input');

                expect(input).toHaveAttribute('value', props.value);

                rerender(<TextField {...props} value={newValue} />);

                expect(input).toHaveAttribute('value', newValue);
            });

            it('should change value', () => {
                const newValue = 'newValue';
                const { getByTestId } = render(<TextField {...props} value={props.value} />);
                const input = getByTestId('input');

                expect(input).toHaveAttribute('value', props.value);

                fireEvent.change(input, { target: { value: newValue } });

                expect(input).toHaveAttribute('value', newValue);
            });

            it('should render with value and isControlled props', () => {
                const { getByTestId } = render(<TextField {...props} isControlled value={props.value} />);

                expect(getByTestId('input')).toHaveAttribute('value', props.value);
            });

            it('should not change value', () => {
                const newValue = 'newValue';
                const { getByTestId } = render(<TextField {...props} isControlled value={props.value} />);
                const input = getByTestId('input');

                expect(input).toHaveAttribute('value', props.value);

                fireEvent.change(input, { target: { value: newValue } });

                expect(input).toHaveAttribute('value', props.value);
            });
        });

        describe('handlers', () => {
            it('should call onChange', () => {
                const mockOnChange = jest.fn();
                const { getByTestId } = render(<TextField {...props} onChange={mockOnChange} />);

                fireEvent.change(getByTestId('input'), { target: { value: 'newValue' } });
                expect(mockOnChange).toBeCalledWith(expect.any(Object));
            });

            it('should call onBlur', () => {
                const mockOnBlur = jest.fn();
                const { getByTestId } = render(<TextField {...props} onBlur={mockOnBlur} />);

                fireEvent.blur(getByTestId('input'));
                expect(mockOnBlur).toBeCalledWith(expect.any(Object));
            });

            it('should call onFocus', () => {
                const mockOnFocus = jest.fn();
                const { getByTestId } = render(<TextField {...props} onFocus={mockOnFocus} />);

                fireEvent.focus(getByTestId('input'));
                expect(mockOnFocus).toBeCalledWith(expect.any(Object));
            });

            it('should call onKeyUp', () => {
                const mockOnKeyUp = jest.fn();
                const { getByTestId } = render(<TextField {...props} onKeyUp={mockOnKeyUp} />);

                fireEvent.keyUp(getByTestId('input'));
                expect(mockOnKeyUp).toBeCalledWith(expect.any(Object));
            });
        });
    });

    describe('input', () => {
        it('should render input', () => {
            const { container } = render(<TextField />);

            expect(container).toMatchSnapshot();
        });

        it('should render with not default type props', () => {
            const { getByTestId } = render(<TextField {...props} type="email" />);

            expect(getByTestId('input')).toHaveAttribute('type', 'email');
        });

        it('should render with type="password"', () => {
            const { getByTestId } = render(<TextField {...props} type="password" />);

            expect(getByTestId('root')).toHaveClass('mfui-text-field_icon mfui-text-field_password');
            expect(getByTestId('iconBox')).toHaveClass('mfui-text-field__icon-box_password');
        });

        it('should render with type="password" and change visibility password', () => {
            const { getByTestId } = render(<TextField {...props} type="password" />);
            const input = getByTestId('input');

            expect(input).toHaveAttribute('type', 'password');

            fireEvent.click(getByTestId('iconBox'));

            expect(input).toHaveAttribute('type', 'text');
        });

        it('should render with hideIcon', () => {
            const { getByTestId, queryByTestId } = render(<TextField {...props} hideIcon />);

            expect(queryByTestId('iconBox')).not.toBeInTheDocument();
            expect(getByTestId('input')).toHaveClass('mfui-text-field__field_no-icon');
            expect(getByTestId('root')).not.toHaveClass('mfui-text-field_icon');
        });

        it('should render with error verification', () => {
            const { getByTestId } = render(<TextField {...props} verification="error" />);

            expect(getByTestId('iconBox')).toHaveClass('mfui-text-field__icon-box_error');
        });

        it('should render with customIcon', () => {
            const { getByTestId } = render(<TextField {...props} customIcon={<div className="icon" />} />);

            expect(getByTestId('iconBox')).toMatchSnapshot();
            expect(getByTestId('root')).toHaveClass('mfui-text-field_icon');
        });

        it('should render with mask', () => {
            const { getByTestId } = render(<TextField {...props} maxLength={undefined} mask="+7 (999) 999-99-99" />);

            expect(getByTestId('input')).toMatchSnapshot();
        });

        it('should render with maskChar', () => {
            const { getByTestId } = render(
                <TextField {...props} maxLength={undefined} mask="+7 (999) 999-99-99" maskChar="-" />,
            );

            expect(getByTestId('input')).toMatchSnapshot();
        });

        it('should render with class from classes', () => {
            const { getByTestId } = render(<TextField {...props} />);

            expect(getByTestId('input')).toHaveClass(props.classes.input);
        });

        it('should render with data-testid', () => {
            const { getByTestId } = render(<TextField {...props} />);

            expect(getByTestId('iconBox')).toBeInTheDocument();
        });

        it('should render with autoComplete', () => {
            const autoComplete = 'autoComplete';
            const { getByTestId } = render(<TextField autoComplete={autoComplete} {...props} />);

            expect(getByTestId('input')).toHaveAttribute('autocomplete', autoComplete);
        });

        describe('handlers', () => {
            it('should call onCustomIconClick', () => {
                const mockOnCustomIconClick = jest.fn();
                const { getByTestId } = render(<TextField {...props} onCustomIconClick={mockOnCustomIconClick} />);
                const iconBox = getByTestId('iconBox');

                fireEvent.click(iconBox);
                expect(mockOnCustomIconClick).toHaveBeenCalled();
                expect(iconBox).toHaveClass('mfui-text-field__icon-box_custom-handler');
            });

            it('should call onBeforeMaskChange', () => {
                const mockOnBeforeMaskChange = jest.fn((value, newState) => {
                    const { value: newMaskedValue } = newState;
                    const isValuePasted = value && value.length > 1;

                    return { ...newState, value: isValuePasted ? value : newMaskedValue };
                });
                const { getByTestId } = render(
                    <TextField
                        dataAttrs={props.dataAttrs}
                        mask="+7 (999) 999-99-99"
                        onBeforeMaskChange={mockOnBeforeMaskChange}
                    />,
                );

                act(() => {
                    userEvent.type(getByTestId('input'), '3');
                });

                expect(mockOnBeforeMaskChange).toBeCalledWith(
                    null,
                    { selection: { end: 4, start: 4 }, value: '+7 (___) ___-__-__' },
                    { selection: null, value: '' },
                );
                expect(mockOnBeforeMaskChange).toBeCalledWith(
                    '3',
                    { selection: { end: 5, start: 5 }, value: '+7 (3__) ___-__-__' },
                    { selection: { end: 4, length: 0, start: 4 }, value: '+7 (___) ___-__-__' },
                );
                expect(mockOnBeforeMaskChange).toBeCalledWith(
                    null,
                    { selection: { end: 5, start: 5 }, value: '+7 (3__) ___-__-__' },
                    { selection: { end: 5, length: 0, start: 5 }, value: '+7 (3__) ___-__-__' },
                );
            });
        });
    });

    describe('textarea', () => {
        it('should render default textarea', () => {
            const { getByTestId } = render(<TextField {...props} textarea />);
            const textarea = getByTestId('input');

            expect(textarea).toMatchSnapshot();
        });

        it('should render flexible textarea', () => {
            const { getByTestId } = render(<TextField {...props} textarea="flexible" />);
            const textarea = getByTestId('input');

            expect(textarea).toHaveClass(
                'mfui-text-field__field_type_flexible mfui-text-field__field_textarea_flexible',
            );
        });

        it('should render flexible textarea with "resized" modifier', () => {
            const { getByTestId } = render(<TextField {...props} textarea="flexible" />);

            fireEvent.mouseDown(getByTestId('resizer'), { clientY: 100 });
            expect(getByTestId('input')).toHaveClass(
                'mfui-text-field__field_type_flexible mfui-text-field__field_textarea_flexible mfui-text-field__field_resized',
            );
        });

        it('should render with class from classes', () => {
            const { getByTestId } = render(<TextField textarea {...props} />);

            expect(getByTestId('input')).toHaveClass(props.classes.input);
        });

        describe('hideResizeButton', () => {
            it('should render with resize button', () => {
                const { getByTestId } = render(<TextField textarea={TextareaTypes.FLEXIBLE} {...props} />);

                expect(getByTestId('input').closest('div')?.lastElementChild).toMatchSnapshot();
            });

            it('should render without resize button', () => {
                const { getByTestId } = render(
                    <TextField textarea={TextareaTypes.FLEXIBLE} hideResizeButton {...props} />,
                );

                expect(getByTestId('input').closest('div')?.lastElementChild).toMatchSnapshot();
            });
        });

        describe('symbolCounter', () => {
            it('should render with no limit without symbolCounter', () => {
                const { getByTestId } = render(<TextField {...props} textarea />);

                fireEvent.change(getByTestId('input'), { target: { value: 'anyLineSize' } });

                expect(getByTestId('root')?.lastElementChild).not.toHaveClass(
                    'mfui-text-field__field-bottom-wrapper_filled',
                );
            });

            it('should render with symbolCounter and no over limit', () => {
                const symbolCounter = 10;
                const { getByTestId } = render(<TextField {...props} textarea symbolCounter={symbolCounter} />);
                const rootNode = getByTestId('root');
                const symbolCounterNode = rootNode.lastElementChild?.lastElementChild;

                expect(symbolCounterNode).toMatchSnapshot();
                expect(rootNode.lastElementChild).toHaveClass('mfui-text-field__field-bottom-wrapper_filled');
                expect(symbolCounterNode?.innerHTML).toEqual(`${props.value.length}/${symbolCounter}`);
            });

            it('should render with symbolCounter and limit exceeded by render', () => {
                const symbolCounter = 3;
                const { getByTestId } = render(<TextField {...props} textarea symbolCounter={symbolCounter} />);
                const rootNode = getByTestId('root');
                const symbolCounterNode = rootNode.lastElementChild?.lastElementChild;

                expect(rootNode).toHaveClass('mfui-text-field_error');
                expect(symbolCounterNode).toHaveClass('mfui-text-field__counter_error');
            });

            it('should render with symbolCounter and limit exceeded by change', () => {
                const symbolCounter = 10;
                const { getByTestId } = render(<TextField {...props} textarea symbolCounter={symbolCounter} />);
                const rootNode = getByTestId('root');
                const symbolCounterNode = rootNode.lastElementChild?.lastElementChild;

                fireEvent.change(getByTestId('input'), { target: { value: 'moreThanTenCharacters' } });

                expect(rootNode).toHaveClass('mfui-text-field_error');
                expect(symbolCounterNode).toHaveClass('mfui-text-field__counter_error');
            });
        });
    });
});
