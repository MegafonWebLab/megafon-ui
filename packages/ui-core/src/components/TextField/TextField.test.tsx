import * as React from 'react';
import { detectTouch } from '@megafon/ui-helpers';
import Balance from '@megafon/ui-icons/basic-24-balance_24.svg';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField, { TextFieldProps, Verification } from './TextField';

jest.mock('@megafon/ui-helpers', () => ({
    ...jest.requireActual('@megafon/ui-helpers'),
    detectTouch: jest.fn().mockReturnValue(false),
}));

const dataAttrs: TextFieldProps['dataAttrs'] = {
    root: {
        'data-test': 'test',
    },
    label: {
        'data-test': 'test',
    },
    notice: {
        'data-test': 'test',
    },
    input: {
        'data-testid': 'input',
    },
    iconBox: {
        'data-testid': 'icon-box',
    },
};

const commonFieldProps = {
    disabled: false,
    id: 'id',
    name: 'name',
    placeholder: 'placeholder',
    required: true,
    dataAttrs,
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    onKeyUp: jest.fn(),
};

const commonProps = {
    theme: 'white' as const,
    label: 'label',
    id: 'id',
    required: true,
    maxLength: 4,
    noticeText: 'noticeText',
    classes: {
        label: 'labelClass',
        input: 'inputClass',
    },
    className: 'customClass',
    dataAttrs,
};

const selectors = {
    iconBox: 'icon-box',
    input: 'input',
};

const mockUserAgentAsTrident = () => {
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('trident/');
};

const testCommonCases = (textarea = false) => {
    it('should render with string value', () => {
        const { container } = render(<TextField {...commonFieldProps} value="value" textarea={textarea} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with number value', () => {
        const { container } = render(<TextField {...commonFieldProps} value={1234} textarea={textarea} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with disabled input', () => {
        const { container } = render(<TextField {...commonFieldProps} disabled textarea={textarea} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with value after updating string prop', () => {
        const { container, rerender } = render(<TextField {...commonFieldProps} value="value" textarea={textarea} />);

        rerender(<TextField {...commonFieldProps} value="newValue" textarea={textarea} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with value after updating number prop', () => {
        const { container, rerender } = render(<TextField {...commonFieldProps} value={1234} textarea={textarea} />);

        rerender(<TextField {...commonFieldProps} value={5678} textarea={textarea} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with ie placeholder', () => {
        mockUserAgentAsTrident();

        const { container } = render(<TextField {...commonFieldProps} textarea={textarea} />);

        expect(container).toMatchSnapshot();
    });

    it('should render without ie placeholder when value is passed', () => {
        mockUserAgentAsTrident();

        const { container } = render(<TextField {...commonFieldProps} textarea={textarea} value="value" />);

        expect(container).toMatchSnapshot();
    });

    it('should render without placeholder with hidePlaceholder prop', () => {
        const { container } = render(<TextField {...commonFieldProps} textarea={textarea} hidePlaceholder />);

        expect(container).toMatchSnapshot();
    });

    it('should call inputRef with node', () => {
        const inputRefMock = jest.fn();
        const { getByTestId } = render(<TextField {...commonFieldProps} textarea={textarea} inputRef={inputRefMock} />);
        const field = getByTestId(selectors.input);

        expect(inputRefMock).toBeCalledWith(field);
    });

    it('should call value change handler', () => {
        const onChangeMock = jest.fn();
        const value = 'newValue';
        const event = { target: { value } };
        const { getByTestId } = render(<TextField {...commonFieldProps} textarea={textarea} onChange={onChangeMock} />);
        const field = getByTestId(selectors.input) as HTMLInputElement;

        fireEvent.change(field, event);

        expect(onChangeMock).toBeCalled();
        expect(field.value).toEqual(value);
    });

    it('should call onBlur', () => {
        const onBlurMock = jest.fn();
        const { getByTestId } = render(<TextField {...commonFieldProps} textarea={textarea} onBlur={onBlurMock} />);

        fireEvent.blur(getByTestId(selectors.input));

        expect(onBlurMock).toBeCalled();
    });

    it('should call onFocus', () => {
        const onFocusMock = jest.fn();
        const { getByTestId } = render(<TextField {...commonFieldProps} textarea={textarea} onFocus={onFocusMock} />);

        fireEvent.focus(getByTestId(selectors.input));

        expect(onFocusMock).toBeCalled();
    });

    it('should call onKeyUp', () => {
        const onKeyUpMock = jest.fn();
        const { getByTestId } = render(<TextField {...commonFieldProps} textarea={textarea} onKeyUp={onKeyUpMock} />);

        fireEvent.keyUp(getByTestId(selectors.input));

        expect(onKeyUpMock).toBeCalled();
    });

    it("shouldn't change component inputValue state via input change when controlled", () => {
        const target = { target: { value: 'something' } };
        const { getByTestId } = render(
            <TextField {...commonFieldProps} value="value" textarea={textarea} isControlled />,
        );
        const field = getByTestId(selectors.input) as HTMLInputElement;

        fireEvent.change(field, target);

        expect(field.value).toEqual('value');
    });

    it('should change component inputValue state via value prop update when controlled', () => {
        const { getByTestId, rerender } = render(
            <TextField {...commonFieldProps} value="value" textarea={textarea} isControlled />,
        );
        const field = getByTestId(selectors.input) as HTMLInputElement;

        expect(field.value).toEqual('value');

        rerender(<TextField {...commonFieldProps} value="something" textarea={textarea} isControlled />);

        expect(field.value).toEqual('something');
    });
};

describe('<TextField />', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('should render with default props', () => {
        const { container } = render(<TextField value="" />);

        expect(container).toMatchSnapshot();
    });

    it('should render with common props', () => {
        const { container } = render(<TextField {...commonProps} value="" />);

        expect(container).toMatchSnapshot();
    });

    it('should render with valid', () => {
        const { container } = render(<TextField {...commonProps} verification={Verification.VALID} />);

        expect(container).toMatchSnapshot();
    });

    it('should render disabled field with valid', () => {
        const { container } = render(<TextField {...commonProps} verification={Verification.VALID} disabled />);

        expect(container).toMatchSnapshot();
    });

    it('should render with error', () => {
        const { container } = render(<TextField {...commonProps} verification={Verification.ERROR} />);

        expect(container).toMatchSnapshot();
    });

    it('should render disabled field with error', () => {
        const { container } = render(<TextField {...commonProps} verification={Verification.ERROR} disabled />);

        expect(container).toMatchSnapshot();
    });

    it('should render with custom icon', () => {
        const { container } = render(<TextField {...commonProps} customIcon={<Balance />} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with hidden icon', () => {
        const { container } = render(<TextField {...commonProps} hideIcon customIcon={<Balance />} />);

        expect(container).toMatchSnapshot();
    });

    describe('input', () => {
        testCommonCases();

        it('should render with mask', () => {
            const { container, getByTestId } = render(
                <TextField {...commonFieldProps} mask="+7 (999) 999-99-99" maskChar="_" />,
            );

            fireEvent.change(getByTestId(selectors.input), { target: { value: '1234567890' } });

            expect(container).toMatchSnapshot();
        });

        it('should render with type', () => {
            const { container } = render(<TextField {...commonFieldProps} type="tel" />);

            expect(container).toMatchSnapshot();
        });

        it('should render with inputmode', () => {
            const { container } = render(<TextField {...commonFieldProps} inputMode="numeric" />);

            expect(container).toMatchSnapshot();
        });

        it('should render with autoComplete', () => {
            const { container } = render(<TextField {...commonFieldProps} autoComplete="tel" />);

            expect(container).toMatchSnapshot();
        });

        it('should render with hidden password', () => {
            const { container } = render(<TextField {...commonFieldProps} value="value" type="password" />);

            expect(container).toMatchSnapshot();
        });

        it('should render with visible password', () => {
            const { container, getByTestId } = render(
                <TextField {...commonFieldProps} value="value" type="password" />,
            );

            fireEvent.click(getByTestId(selectors.iconBox));

            expect(container).toMatchSnapshot();
        });

        it('should render without no-touch class', () => {
            (detectTouch as jest.Mock).mockReturnValueOnce(true);

            const { container } = render(<TextField {...commonFieldProps} />);

            expect(container).toMatchSnapshot();
        });

        it('should clear input after icon click', () => {
            const { getByTestId } = render(
                <TextField {...commonFieldProps} value="value" verification={Verification.ERROR} disabled={false} />,
            );
            const field = getByTestId(selectors.input) as HTMLInputElement;

            fireEvent.click(getByTestId(selectors.iconBox));

            expect(field.value).toEqual('');
        });

        it('should call onCustomIconClick after icon click', () => {
            const onCustomIconClickMock = jest.fn();
            const { getByTestId } = render(
                <TextField
                    {...commonFieldProps}
                    value="value"
                    customIcon={<Balance />}
                    onCustomIconClick={onCustomIconClickMock}
                />,
            );

            fireEvent.click(getByTestId(selectors.iconBox));

            expect(onCustomIconClickMock).toBeCalled();
        });

        it("shouldn't clear inputValue state via custom icon click when controlled", () => {
            const { getByTestId } = render(
                <TextField
                    {...commonFieldProps}
                    value="value"
                    customIcon={<Balance />}
                    verification={Verification.ERROR}
                    onCustomIconClick={jest.fn()}
                />,
            );
            const field = getByTestId(selectors.input) as HTMLInputElement;

            fireEvent.click(getByTestId(selectors.iconBox));

            expect(field.value).toEqual('value');
        });

        it('should call onBeforeMaskChange callback on masked input change with correct args', async () => {
            const onBeforeMaskChange = jest.fn().mockImplementation((_, newState) => ({ ...newState }));

            const { getByTestId } = render(
                <TextField
                    {...commonFieldProps}
                    mask="+7 (999) 999-99-99"
                    maskChar="_"
                    onBeforeMaskChange={onBeforeMaskChange}
                />,
            );

            userEvent.type(getByTestId(selectors.input), '2');

            expect(onBeforeMaskChange.mock.calls).toEqual([
                [
                    null,
                    { selection: { end: 4, start: 4 }, value: '+7 (___) ___-__-__' },
                    { selection: null, value: '' },
                ],
                [
                    null,
                    { selection: { end: 4, start: 4 }, value: '+7 (___) ___-__-__' },
                    { selection: { end: 4, length: 0, start: 4 }, value: '+7 (___) ___-__-__' },
                ],
                [
                    '2',
                    { selection: { end: 5, start: 5 }, value: '+7 (2__) ___-__-__' },
                    { selection: { end: 4, length: 0, start: 4 }, value: '+7 (___) ___-__-__' },
                ],
                [
                    null,
                    { selection: { end: 5, start: 5 }, value: '+7 (2__) ___-__-__' },
                    { selection: { end: 5, length: 0, start: 5 }, value: '+7 (2__) ___-__-__' },
                ],
            ]);
        });
    });

    describe('textarea', () => {
        testCommonCases(true);

        it('should render fixed textarea', () => {
            const { container } = render(<TextField {...commonProps} textarea />);

            expect(container).toMatchSnapshot();
        });

        it('should render flexible textarea', () => {
            const { container } = render(<TextField {...commonProps} textarea="flexible" />);

            expect(container).toMatchSnapshot();
        });

        it('should render with error because of max limit is exceeded', () => {
            const value = '123456';
            const event = { target: { value } };
            const { container, getByTestId } = render(<TextField {...commonProps} textarea symbolCounter={4} />);

            fireEvent.change(getByTestId(selectors.input), event);

            expect(container).toMatchSnapshot();
        });
    });
});
