import * as React from 'react';
import { shallow } from 'enzyme';
import List from './List';
import ListItem from './ListItem';

describe('<List />', () => {
    it('it renders List', () => {
        const wrapper = shallow(<List><ListItem /></List>);
        expect(wrapper).toMatchSnapshot();
    });
});
