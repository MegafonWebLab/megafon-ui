import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Button, { IButtonProps } from './Button';

const props: IButtonProps = {
    actionType: 'reset',
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

    // it('it renders Button on touch devices', () => {
    //     jest.doMock('../../utils/detectTouch', () => {
    //         return jest.fn(() => true);
    //     });

    //     const SomeButton = require('./Button').default;
    //     const wrapper = shallow(<SomeButton />);

    //     expect(wrapper).toMatchSnapshot();
    // });

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
            const wrapper = mount(<Button disabled href={undefined} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders tag a', () => {
            const wrapper = mount(<Button disabled href="test" />);
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
});
