import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Button, { IButtonProps } from './Button';

const props: IButtonProps = {
    type: 'reset',
    href: 'any',
    target: '_blank',
};

describe('<Button />', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('renders Button with default props', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders Button with props', () => {
        const wrapper = shallow(<Button {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Button on touch devices', () => {
        jest.doMock('../../utils/detectTouch', () => {
            return {
                default: jest.fn(() => true),
            };
        });

        const SomeButton = require('./Button').default;
        const wrapper = shallow<Button>(<SomeButton />);

        expect(wrapper).toMatchSnapshot();
    });

    it('it renders children', () => {
        const wrapper = shallow(<Button>button</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders spinner', () => {
        const wrapper = mount(<Button showSpinner={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    describe('with disabled state', () => {
        it('renders tag button', () => {
            const wrapper = mount(<Button customView={undefined} disabled href={undefined} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders tag a', () => {
            const wrapper = mount(<Button customView={undefined} disabled href="test" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders element with customView', () => {
            const wrapper = mount(<Button customView="two-lines" disabled />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleClick', () => {
        it('calls when disabled is false', () => {
            const onClick = jest.fn();
            const preventDefault = jest.fn();
            const wrapper = shallow(<Button onClick={onClick} />);

            wrapper.simulate('click', { preventDefault });

            expect(onClick).toBeCalledWith({ preventDefault });
            expect(preventDefault).not.toBeCalled();
        });

        it('calls when disabled is true', () => {
            const onClick = jest.fn();
            const preventDefault = jest.fn();
            const wrapper = shallow(<Button disabled onClick={onClick} />);

            wrapper.simulate('click', { preventDefault });
            expect(onClick).not.toBeCalled();
            expect(preventDefault).toBeCalled();
        });
    });

    it('it passes props to mods', () => {
        const wrapper = shallow(<Button passiveColor={'white'} border={'green'} fontColor={'green'}/>);
        expect(wrapper.find('.mfui-button').hasClass('mfui-button_border_green')).toEqual(true);
        expect(wrapper.find('.mfui-button').hasClass('mfui-button_passive-color_white')).toEqual(true);
        expect(wrapper.find('.mfui-button').hasClass('mfui-button_font-color_green')).toEqual(true);
    });

    it('it renders white styled button', () => {
        const wrapper = mount(<Button passiveColor={'white'} border={'green'} fontColor={'green'}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
