/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import React from 'react';
import StepsItem from './StepsItem';

describe('StepsItem', () => {
    it('should render component', () => {
        const wrapper = shallow(<StepsItem index={1} text="text" />);

        expect(wrapper).toMatchSnapshot();
    });
});
