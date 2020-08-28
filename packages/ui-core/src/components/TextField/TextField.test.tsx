import * as React from 'react';
import { shallow, mount } from 'enzyme';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import detectIE11 from 'utils/detectIE';
import TextField, { Verification } from './TextField';
import Balance from 'icons/Basic/24/Balance_24.svg';

jest.mock('utils/detectTouch', () => ({
    __esModule: true,
    default: jest.fn(() => false),
}));

jest.mock('utils/detectIE', () => ({
    __esModule: true,
    default: jest.fn(() => false),
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

const mockDetectIE11 = () => {
    (detectIE11 as jest.Mock).mockImplementation(() => true);
};

const testCommonCases = (selector: string, multiline: boolean = false) => {
    it('should render with value', () => {
        const wrapper = shallow(
            <TextField {...commonFieldProps} value="value" multiline={multiline} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with value after updating prop', () => {
        const wrapper = mount(
            <TextField {...commonFieldProps} value="value" multiline={multiline} />
        );

        wrapper.setProps({ value: 'newValue' });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with ie placeholder', () => {
        mockDetectIE11();

        const wrapper = shallow(<TextField {...commonFieldProps} multiline={multiline} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render without ie placeholder when value is passed', () => {
        mockDetectIE11();

        const wrapper = shallow(<TextField {...commonFieldProps} multiline={multiline} value="value" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should call inputRef with node', () => {
        const inputRefMock = jest.fn();
        const wrapper = mount(
            <TextField
                {...commonFieldProps}
                multiline={multiline}
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
            <TextField {...commonFieldProps} multiline={multiline} onChange={onChangeMock} />
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
            <TextField {...commonFieldProps} multiline={multiline} onBlur={onBlurMock} />
        );

        wrapper.find(selector).simulate('blur', event);

        expect(onBlurMock).toBeCalledWith(event);
    });

    it('should call onFocus', () => {
        const onFocusMock = jest.fn();
        const value = 'newValue';
        const event = { target: { value } };
        const wrapper = shallow(
            <TextField {...commonFieldProps} multiline={multiline} onFocus={onFocusMock} />
        );

        wrapper.find(selector).simulate('focus', event);

        expect(onFocusMock).toBeCalledWith(event);
    });

    it('should call onKeyUp', () => {
        const onKeyUpMock = jest.fn();
        const event = { target: {} };
        const wrapper = shallow(
            <TextField {...commonFieldProps} multiline={multiline} onKeyUp={onKeyUpMock} />
        );

        wrapper.find(selector).simulate('keyup', event);

        expect(onKeyUpMock).toBeCalledWith(event);
    });
};

describe('<TextField />', () => {
    afterEach(() => {
        jest.resetAllMocks();
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
            (detectTouch as jest.Mock).mockImplementation(() => true);

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
    });

    describe('textarea', () => {
        testCommonCases(selectors.textarea, true);
    });
});
