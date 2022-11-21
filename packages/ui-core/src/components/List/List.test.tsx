import * as React from 'react';
import { render } from '@testing-library/react';
import List from './List';
import ListItem from './ListItem';

describe('<List />', () => {
    it('it renders List', () => {
        const { container } = render(
            <List>
                <ListItem />
            </List>,
        );

        expect(container).toMatchSnapshot();
    });

    it('it renders List with type ol', () => {
        const { container } = render(
            <List as="ol">
                <ListItem />
            </List>,
        );

        expect(container).toMatchSnapshot();
    });
});
