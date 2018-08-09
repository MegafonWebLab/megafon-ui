import * as React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('<ListItem />', () => {
    it('it renders ListItem', () => {
        const wrapper = shallow(<ListItem>item</ListItem>);
        expect(wrapper).toMatchSnapshot();
    });
});
