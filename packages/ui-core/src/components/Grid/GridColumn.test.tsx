/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import * as React from 'react';
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
                leftOffsetAll="4"
                rightOffsetAll="4"
                grow
                flex
            >
                item
            </GridColumn>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders GridColumn with props on different screens', () => {
        const wrapper = shallow(
            <GridColumn
                className="test-class"
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
                leftOffsetWide="8"
                leftOffsetDesktop="7"
                leftOffsetTablet="6"
                leftOffsetMobile="5"
                rightOffsetWide="1"
                rightOffsetDesktop="1"
                rightOffsetTablet="1"
                rightOffsetMobile="1"
                grow
                flex
            >
                item
            </GridColumn>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
