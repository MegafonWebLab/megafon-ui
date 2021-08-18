import { shallow } from 'enzyme';
import * as React from 'react';
import InputLabel from './InputLabel';

describe('<InputLabel />', () => {
    it('renders InputLabel without props', () => {
        const wrapper = shallow(<InputLabel>test</InputLabel>);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders InputLabel with props', () => {
        const wrapper = shallow(<InputLabel htmlFor="htmlFor">test</InputLabel>);
        expect(wrapper).toMatchSnapshot();
    });
});
