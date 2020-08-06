import * as React from 'react';
import { shallow } from 'enzyme';
import List from './List';
import ListItem from './ListItem';

describe('<List />', () => {
    it('it renders List', () => {
        const wrapper = shallow(<List><ListItem /></List>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it render with disable margin left', () => {
        const wrapper = shallow(<List disableLeftMargin><ListItem /></List>);
        expect(wrapper).toMatchSnapshot();
    });
});
