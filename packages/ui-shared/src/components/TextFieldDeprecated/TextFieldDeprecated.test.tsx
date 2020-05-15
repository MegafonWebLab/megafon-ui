import * as React from 'react';
import { shallow } from 'enzyme';
import TextFieldDeprecated from './TextFieldDeprecated';
import { detectTouch } from '@megafon/ui-core';
import { ITextFieldProps } from './TextFieldDeprecated';

function mockFunctions() {
    const original = require.requireActual('@megafon/ui-core');
    return {
        ...original,
        detectTouch: jest.fn().mockReturnValue(false),
    };
}
jest.mock('@megafon/ui-core', () => mockFunctions());

jest.mock('react-input-mask', () => {
    return {
        default() {},
    };
});

const inputClassName = '.mfui-text-field-deprecated__field';

const props: ITextFieldProps = {
    label: <div>label</div>,
    color: 'default',
    size: 'large',
    noticeText: 'notice text',
    commentText: 'comment text',
    successText: 'success text',
    autoFocus: true,
    autocomplete: 'on',
    disabled: true,
    required: true,
    type: 'text',
    name: 'name',
    placeholder: 'placeholder',
    id: 'id',
    value: 'value',
    maxLength: 10,
    defaultValue: 'default value',
    customIcon: <div>custom icon</div>,
    bigSpace: true,
    className: 'class name',
};

function simulateEvent(eventName: string, eventType: string, params: {}) {
    const data = 'data';
    const mock = jest.fn();
    const handler = { [eventName]: mock };
    const wrapper = shallow(<TextFieldDeprecated {...handler} {...params} />);

    wrapper.find(inputClassName).simulate(eventType, data);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toBeCalledWith(data);
}

describe('<TextFieldDeprecated />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without props', () => {
        const wrapper = shallow(<TextFieldDeprecated />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders with props', () => {
        const wrapper = shallow(<TextFieldDeprecated {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders with mask', () => {
        const wrapper = shallow(<TextFieldDeprecated {...props} mask="(999) 999-99-99" maskChar=" " />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders without no-touch mode', () => {
        const typedDetectTouch = detectTouch as unknown as jest.Mock<() => boolean>;

        typedDetectTouch.mockImplementation(() => () => true);

        const wrapper = shallow(<TextFieldDeprecated />);

        expect(wrapper).toMatchSnapshot();
    });

    describe('icon mod', () => {
        it('renders with mod when customIcon passed', () => {
            const wrapper = shallow(
                <TextFieldDeprecated isHideIcon={false} customIcon={<div>icon</div>} error={false} valid={false} />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with mod when error is true', () => {
            const wrapper = shallow(
                <TextFieldDeprecated isHideIcon={false} customIcon={undefined} error={true} valid={false} />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with mod when valid is true', () => {
            const wrapper = shallow(
                <TextFieldDeprecated isHideIcon={false} customIcon={undefined} error={false} valid={true} />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders without mod when isHideIcon is true', () => {
            const wrapper = shallow(<TextFieldDeprecated isHideIcon={true} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('status icons', () => {
        it('renders when valid or error is true', () => {
            const wrapper = shallow(
                <TextFieldDeprecated isHideIcon={false} customIcon={undefined} error={true} valid={true} />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('not renders when valid or error is false', () => {
            const wrapper = shallow(
                <TextFieldDeprecated isHideIcon={false} customIcon={undefined} error={false} valid={false} />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('password type', () => {
        it('renders with default input', () => {
            const wrapper = shallow(<TextFieldDeprecated type="password" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with mask input', () => {
            const wrapper = shallow(<TextFieldDeprecated type="password" mask="(999) 999-99-99" maskChar=" " />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('calls handlers on different inputs', () => {
        const maskParams = { mask: '(999) 999-99-99', maskChar: ' ' };

        simulateEvent('onChange', 'change', {});
        simulateEvent('onChange', 'change', maskParams);

        simulateEvent('onBlur', 'blur', {});
        simulateEvent('onBlur', 'blur', maskParams);

        simulateEvent('onFocus', 'focus', {});
        simulateEvent('onFocus', 'focus', maskParams);

        simulateEvent('onKeyUp', 'keyup', {});
        simulateEvent('onKeyUp', 'keyup', maskParams);
    });

    it('calls handleEyeToggle', () => {
        const wrapper = shallow<TextFieldDeprecated>(<TextFieldDeprecated />);

        wrapper.setState({ isPasswordHidden: false });
        wrapper.instance().handleEyeToggle();

        expect(wrapper.state().isPasswordHidden).toBeTruthy();
    });

    it('calls onCustomIconClick handler', () => {
        const handler = jest.fn();
        const wrapper = shallow<TextFieldDeprecated>(
            <TextFieldDeprecated customIcon={<div>custom icon</div>} onCustomIconClick={handler} />
        );

        wrapper.find('.mfui-text-field-deprecated__icon-box_custom').simulate('click');

        expect(handler).toHaveBeenCalledTimes(1);
    });
});
