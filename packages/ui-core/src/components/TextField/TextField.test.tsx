import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { cnCreate, detectTouch } from '@megafon/ui-helpers';
import TextField, { Verification } from './TextField';
import Balance from '@megafon/icons/dist/basic-24-balance_24.svg';

const InputMask = require('react-input-mask');

jest.mock('@megafon/ui-helpers', () => ({
    ...jest.requireActual('@megafon/ui-helpers'),
    detectTouch: jest.fn().mockReturnValue(false),
}));

const commonFieldProps = {
    disabled: true,
    id: 'id',
    name: 'name',
    placeholder: 'placeholder',
    required: true,
    maxLength: 4,
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    onKeyUp: jest.fn(),
};

const commonProps = {
    theme: 'white' as const,
    label: 'label',
    id: 'id',
    required: true,
    noticeText: 'noticeText',
    className: 'customClass',
};

const cn = cnCreate('.mfui-beta-text-field');
const selectors = {
    iconBox: cn('icon-box'),
    input: 'input',
    textarea: 'textarea',
};

const mockUserAgentAsTrident = () => {
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('trident/');
};

const testCommonCases = (selector: string, textarea: boolean = false) => {
    it('should render with string value', () => {
        const wrapper = shallow(
            <TextField {...commonFieldProps} value="value" textarea={textarea} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with number value', () => {
        const wrapper = shallow(
            <TextField {...commonFieldProps} value={1234} textarea={textarea} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with value after updating string prop', () => {
        const wrapper = mount(
            <TextField {...commonFieldProps} value="value" textarea={textarea} />
        );

        wrapper.setProps({ value: 'newValue' });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with value after updating number prop', () => {
        const wrapper = mount(
            <TextField {...commonFieldProps} value={1234} textarea={textarea} />
        );

        wrapper.setProps({ value: 5678 });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with ie placeholder', () => {
        mockUserAgentAsTrident();

        const wrapper = mount(<TextField {...commonFieldProps} textarea={textarea} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render without ie placeholder when value is passed', () => {
        mockUserAgentAsTrident();

        const wrapper = mount(<TextField {...commonFieldProps} textarea={textarea} value="value" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should call inputRef with node', () => {
        const inputRefMock = jest.fn();
        const wrapper = mount(
            <TextField
                {...commonFieldProps}
                textarea={textarea}
                inputRef={inputRefMock}
            />
        );
        const field = wrapper.find(selector).getDOMNode();

        expect(inputRefMock).toBeCalledWith(field);
    });

    it('should call value change handler', () => {
        const onChangeMock = jest.fn();
        const value = 'newValue';
        const event = { target: { value } };
        const wrapper = shallow(
            <TextField {...commonFieldProps} textarea={textarea} onChange={onChangeMock} />
        );

        wrapper.find(selector).simulate('change', event);

        expect(onChangeMock).toBeCalledWith(event);
        expect(wrapper.find(selector).prop('value')).toEqual(value);
    });

    it('should call onBlur', () => {
        const onBlurMock = jest.fn();
        const value = 'newValue';
        const event = { target: { value } };
        const wrapper = shallow(
            <TextField {...commonFieldProps} textarea={textarea} onBlur={onBlurMock} />
        );

        wrapper.find(selector).simulate('blur', event);

        expect(onBlurMock).toBeCalledWith(event);
    });

    it('should call onFocus', () => {
        const onFocusMock = jest.fn();
        const value = 'newValue';
        const event = { target: { value } };
        const wrapper = shallow(
            <TextField {...commonFieldProps} textarea={textarea} onFocus={onFocusMock} />
        );

        wrapper.find(selector).simulate('focus', event);

        expect(onFocusMock).toBeCalledWith(event);
    });

    it('should call onKeyUp', () => {
        const onKeyUpMock = jest.fn();
        const event = { target: {} };
        const wrapper = shallow(
            <TextField {...commonFieldProps} textarea={textarea} onKeyUp={onKeyUpMock} />
        );

        wrapper.find(selector).simulate('keyup', event);

        expect(onKeyUpMock).toBeCalledWith(event);
    });

    it('shouldn\'t change component inputValue state via input change when controlled', () => {
        const target = { target: { value: 'something' } };
        const wrapper = shallow(
            <TextField
                {...commonFieldProps}
                value="value"
                textarea={textarea}
                isControlled
            />
        );

        wrapper.find(selector).simulate('change', target);

        expect(wrapper.find(selector).prop('value')).toEqual('value');
    });

    it('should change component inputValue state via value prop update when controlled', () => {
        const wrapper = mount(
            <TextField
                {...commonFieldProps}
                value="value"
                textarea={textarea}
                isControlled
            />
        );

        wrapper.setProps({ value: 'something' });
        wrapper.update();

        expect(wrapper.find(selector).prop('value')).toEqual('something');
    });
};

describe('<TextField />', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('should render with default props', () => {
        const wrapper = shallow(<TextField />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with common props', () => {
        const wrapper = shallow(<TextField {...commonProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with valid', () => {
        const wrapper = shallow(
            <TextField {...commonProps} verification={Verification.VALID} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with error', () => {
        const wrapper = shallow(
            <TextField {...commonProps} verification={Verification.ERROR} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with custom icon', () => {
        const wrapper = shallow(
            <TextField {...commonProps} customIcon={<Balance />} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with hidden icon', () => {
        const wrapper = shallow(
            <TextField {...commonProps} hideIcon customIcon={<Balance />} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    describe('input', () => {
        testCommonCases(selectors.input);

        it('should render with mask', () => {
            const wrapper = shallow(
                <TextField
                    {...commonFieldProps}
                    mask="+7 (999) 999-99-99"
                    maskChar="_"
                />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with type', () => {
            const wrapper = shallow(<TextField {...commonFieldProps} type="tel" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with inputnode', () => {
            const wrapper = shallow(<TextField {...commonFieldProps} inputMode="numeric" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with hidden password', () => {
            const wrapper = shallow(
                <TextField {...commonFieldProps} value="value" type="password" />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with visible password', () => {
            const wrapper = shallow(
                <TextField {...commonFieldProps} value="value" type="password" />
            );

            wrapper.find(selectors.iconBox).simulate('click');

            expect(wrapper).toMatchSnapshot();
        });

        it('should render without no-touch class', () => {
            (detectTouch as jest.Mock).mockReturnValueOnce(true);

            const wrapper = shallow(
                <TextField {...commonFieldProps} />
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('should clear input after icon click', () => {
            const wrapper = shallow(
                <TextField {...commonFieldProps} value="value" verification={Verification.ERROR} />
            );

            wrapper.find(selectors.iconBox).simulate('click');

            expect(wrapper.find(selectors.input).prop('value')).toEqual('');
        });

        it('should call onCustomIconClick after icon click', () => {
            const onCustomIconClickMock = jest.fn();
            const target = { target: {} };
            const wrapper = shallow(
                <TextField
                    {...commonFieldProps}
                    value="value"
                    customIcon={<Balance />}
                    onCustomIconClick={onCustomIconClickMock}
                />
            );

            wrapper.find(selectors.iconBox).simulate('click', target);

            expect(onCustomIconClickMock).toBeCalledWith(target);
        });

        it('shouldn\'t clear inputValue state via custom icon click when controlled', () => {
            const target = { target: { value: 'something' } };
            const wrapper = shallow(
                <TextField
                    {...commonFieldProps}
                    value="value"
                    customIcon={<Balance />}
                    verification={Verification.ERROR}
                    isControlled
                    onCustomIconClick={jest.fn()}
                />
            );

            wrapper.find(selectors.iconBox).simulate('click');

            expect(wrapper.find('input').prop('value')).toEqual('value');
        });

        it('should call onBeforeMaskChange callback on masked input change with correct args', () => {
            const onBeforeMaskChange = jest.fn();

            const nextState = { value: 'some_value', selection: { start: 3, end: 4 } };
            const prevState = { value: 'some_new_value', selection: { start: 3, end: 6 } };

            const wrapper = shallow(
                <TextField
                    {...commonFieldProps}
                    mask="+7 (999) 999-99-99"
                    maskChar="_"
                    onBeforeMaskChange={onBeforeMaskChange}
                />
            );

            const inputElementProps = wrapper.find('InputElement').props() as React.ComponentProps<typeof InputMask>;
            inputElementProps.beforeMaskedValueChange && inputElementProps.beforeMaskedValueChange(nextState, prevState, 'h');

            expect(onBeforeMaskChange).toBeCalledWith('h', nextState, prevState);
        });
    });

    describe('textarea', () => {
        testCommonCases(selectors.textarea, true);

        it('should render fixed textarea', () => {
            const wrapper = shallow(
                <TextField {...commonProps} textarea />
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('should render flexible textarea', () => {
            const wrapper = shallow(
                <TextField {...commonProps} textarea="flexible" />
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('should render with error because of max limit is exceeded', () => {
            const value = '123456';
            const event = { target: { value } };
            const wrapper = shallow(
                <TextField {...commonProps} textarea symbolCounter={4} />
            );

            wrapper.find('textarea').simulate('change', event);
            wrapper.update();

            expect(wrapper).toMatchSnapshot();
        });
    });
});
