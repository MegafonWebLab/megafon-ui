/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import * as React from 'react';
import List from './List';
import ListItem from './ListItem';

describe('<List />', () => {
    it('it renders List', () => {
        const wrapper = shallow(
            <List>
                <ListItem />
            </List>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders List with type ol', () => {
        const wrapper = shallow(
            <List as="ol">
                <ListItem />
            </List>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders List with type ul', () => {
        const wrapper = shallow(
            <List as="ul">
                <ListItem />
            </List>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
