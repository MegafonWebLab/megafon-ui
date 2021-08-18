import { shallow } from 'enzyme';
import * as React from 'react';
import StoreButton, { Props, Theme } from './StoreButton';

const props: Props = {
    href: 'href',
    theme: Theme.APP_STORE,
};

describe('StoreButton', () => {
    it('should render with App Store theme', () => {
        const wrapper = shallow(<StoreButton {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with Google Play', () => {
        const currentProps = {
            ...props,
            theme: Theme.GOOGLE_PLAY,
        };
        const wrapper = shallow(<StoreButton {...currentProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with custom class name', () => {
        const wrapper = shallow(<StoreButton {...props} className="custom-class-name" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should call click handler', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<StoreButton {...props} onClick={onClick} />);

        wrapper.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });
});
