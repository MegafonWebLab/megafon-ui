import * as React from 'react';
import { shallow } from 'enzyme';
import InputLabel from './InputLabel';

describe('<InputLabel />', () => {
    it('renders InputLabel without props', () => {
        const wrapper = shallow(<InputLabel>test</InputLabel>);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders InputLabel with props', () => {
        const wrapper = shallow(<InputLabel id="id">test</InputLabel>);
        expect(wrapper).toMatchSnapshot();
    });
});
