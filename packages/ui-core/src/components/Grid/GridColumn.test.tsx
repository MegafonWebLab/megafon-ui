import * as React from 'react';
import { shallow } from 'enzyme';
import GridColumn from './GridColumn';

describe('<GridColumn />', () => {
    it('it renders GridColumn without props', () => {
        const wrapper = shallow(<GridColumn>item</GridColumn>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders GridColumn with props', () => {
        const wrapper = shallow(
            <GridColumn
                wide="8"
                desktop="4"
                tablet="3"
                mobile="1"
                all="10"
                align="right"
                grow
                flex
            >
                item
            </GridColumn>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
