import React from 'react';
import { shallow } from 'enzyme';
import IconButton, { IIconButtonProps } from './IconButton';
import Icon from 'icons/System/16/Gag_16.svg';

const props: IIconButtonProps = {
    className: 'customClassName',
    theme: 'purple',
    type: 'primary',
    href: 'href',
    target: '_blank',
    sizeAll: 'large',
    sizeMobile: 'small',
    sizeTablet: 'medium',
    sizeDesktop: 'large',
    sizeWide: 'large',
    disabled: true,
    icon: <Icon />,
};

describe('<IconButton />', () => {
    describe('snapshots', () => {
        it('renders with required props', () => {
            const wrapper = shallow(<IconButton icon={props.icon} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with props', () => {
            const wrapper = shallow(<IconButton {...props} />);

            expect(wrapper).toMatchSnapshot();
        });
    });

    it('handle onClick callback prop', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<IconButton icon={props.icon} onClick={onClick} />);

        wrapper.simulate('click');

        expect(onClick).toBeCalled();
    });
});
