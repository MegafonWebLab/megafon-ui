import * as React from 'react';
import { shallow } from 'enzyme';
import Grid from './Grid';
import GridColumn from './GridColumn';

describe('<Grid />', () => {
    it('it renders Grid', () => {
        const wrapper = shallow(
            <Grid
                hAlign="right"
                vAlign="top"
                guttersLeft="large"
                guttersBottom="medium"
            >
                <GridColumn>child1</GridColumn>
                <GridColumn>child2</GridColumn>
            </Grid>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
