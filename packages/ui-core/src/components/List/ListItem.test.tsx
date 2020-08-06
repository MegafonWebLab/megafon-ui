import * as React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('<ListItem />', () => {
    it('it renders ListItem', () => {
        const wrapper = shallow(<ListItem>item</ListItem>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it render with disable margin left', () => {
        const wrapper = shallow(<ListItem disableLeftMargin>item</ListItem>);
        expect(wrapper).toMatchSnapshot();
    });
});
