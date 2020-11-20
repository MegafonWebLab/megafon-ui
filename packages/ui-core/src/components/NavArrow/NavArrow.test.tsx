import * as React from 'react';
import { shallow } from 'enzyme';
import NavArrow, { INavArrowProps, Theme, View } from './NavArrow';

const props: INavArrowProps = {
    className: 'class',
    theme: Theme.DARK,
    view: View.NEXT,
    disabled: true,
    onClick: jest.fn(),
};
describe('<NavArrow />', () => {
    it('should render with default props', () => {
        const wrapper = shallow(<NavArrow />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(<NavArrow {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onClick', () => {
        const onClickMock = jest.fn();
        const wrapper = shallow(<NavArrow onClick={onClickMock} />);

        wrapper.find('button').simulate('click');

        expect(onClickMock).toBeCalled();
    });
});
