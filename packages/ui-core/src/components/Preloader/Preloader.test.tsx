import * as React from 'react';
import { shallow } from 'enzyme';
import Preloader from './Preloader';

describe('<Preloader />', () => {
    it('it renders Preloader', () => {
        const wrapper = shallow(<Preloader />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Preloader with small size', () => {
        const wrapper = shallow(<Preloader size="small" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Preloader with black color', () => {
        const wrapper = shallow(<Preloader color="black" />);
        expect(wrapper).toMatchSnapshot();
    });
});
