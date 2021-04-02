import * as React from 'react';
import { shallow } from 'enzyme';
import Grid from './Grid';
import GridColumn from './GridColumn';

describe('<Grid />', () => {
    it('it renders Grid without props', () => {
        const wrapper = shallow(
            <Grid>
                <GridColumn>child1</GridColumn>
                <GridColumn>child2</GridColumn>
            </Grid>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Grid with props', () => {
        const wrapper = shallow(
            <Grid
                hAlign="right"
                vAlign="top"
                guttersLeft="large"
                guttersBottom="medium"
                multiRow={false}
                className={'custom-class-name'}
            >
                <GridColumn>child1</GridColumn>
                <GridColumn>child2</GridColumn>
            </Grid>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
