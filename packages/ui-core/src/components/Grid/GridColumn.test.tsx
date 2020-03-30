import * as React from 'react';
import { shallow } from 'enzyme';
import GridColumn from './GridColumn';

describe('<GridColumn />', () => {
    it('it renders GridColumn without props', () => {
        const wrapper = shallow(<GridColumn>item</GridColumn>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders GridColumn with props on all screens', () => {
        const wrapper = shallow(
            <GridColumn
                wide="8"
                desktop="4"
                tablet="3"
                mobile="1"
                all="10"
                align="right"
                orderAll="2"
                offsetAll="4"
                grow
                flex
            >
                item
            </GridColumn>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders GridColumn with props on different screens', () => {
        const wrapper = shallow(
            <GridColumn
                wide="8"
                desktop="4"
                tablet="3"
                mobile="1"
                all="10"
                align="right"
                orderWide="2"
                orderDesktop="1"
                orderTablet="3"
                orderMobile="4"
                offsetWide="8"
                offsetDesktop="7"
                offsetTablet="6"
                offsetMobile="5"
                grow
                flex
            >
                item
            </GridColumn>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
