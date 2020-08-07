import * as React from 'react';
import { shallow } from 'enzyme';
import List from './List';
import ListItem from './ListItem';

describe('<List />', () => {
    it('it renders List', () => {
        const wrapper = shallow(<List><ListItem /></List>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders List with type ol', () => {
        const wrapper = shallow(<List as="ol"><ListItem /></List>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders List with type ul', () => {
        const wrapper = shallow(<List as="ul"><ListItem /></List>);
        expect(wrapper).toMatchSnapshot();
    });
});
