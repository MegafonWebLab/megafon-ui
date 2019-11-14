import * as React from 'react';
import { shallow } from 'enzyme';
import TextField from './TextField';
import detectTouch from 'utils/detectTouch';
import { ITextFieldProps } from './TextField';

jest.mock('utils/detectTouch', () => ({
    default: jest.fn().mockReturnValue(false),
}));

jest.mock('react-input-mask', () => {
    return {
        default() {},
    };
});

const inputClassName = '.mfui-text-field__field';

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
    const wrapper = shallow(<TextField {...handler} {...params} />);

    wrapper.find(inputClassName).simulate(eventType, data);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toBeCalledWith(data);
}

describe('<TextField />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without props', () => {
        const wrapper = shallow(<TextField />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders with props', () => {
        const wrapper = shallow(<TextField {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders with mask', () => {
        const wrapper = shallow(<TextField {...props} mask="(999) 999-99-99" maskChar=" " />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders without no-touch mode', () => {
        const typedDetectTouch = detectTouch as jest.Mock<() => boolean>;

        typedDetectTouch.mockImplementation(() => true);

        const wrapper = shallow(<TextField />);

        expect(wrapper).toMatchSnapshot();
    });

    describe('icon mod', () => {
        it('renders with mod when customIcon passed', () => {
            const wrapper = shallow(
                <TextField isHideIcon={false} customIcon={<div>icon</div>} error={false} valid={false} />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with mod when error is true', () => {
            const wrapper = shallow(
                <TextField isHideIcon={false} customIcon={undefined} error={true} valid={false} />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with mod when valid is true', () => {
            const wrapper = shallow(
                <TextField isHideIcon={false} customIcon={undefined} error={false} valid={true} />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders without mod when isHideIcon is true', () => {
            const wrapper = shallow(<TextField isHideIcon={true} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('status icons', () => {
        it('renders when valid or error is true', () => {
            const wrapper = shallow(
                <TextField isHideIcon={false} customIcon={undefined} error={true} valid={true} />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('not renders when valid or error is false', () => {
            const wrapper = shallow(
                <TextField isHideIcon={false} customIcon={undefined} error={false} valid={false} />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('password type', () => {
        it('renders with default input', () => {
            const wrapper = shallow(<TextField type="password" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with mask input', () => {
            const wrapper = shallow(<TextField type="password" mask="(999) 999-99-99" maskChar=" " />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders password TextField with password shown', () => {
            const wrapper = shallow(<TextField type="password" />);

            expect(wrapper.state('isPasswordHidden')).toBeTruthy();
            wrapper.find('.mfui-text-field__icon-box').simulate('click');
            expect(wrapper.state('isPasswordHidden')).toBeFalsy();

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
});
