import React from 'react';
import { shallow } from 'enzyme';
import StepsItem from './StepsItem';

describe('StepsItem', () => {
    it('should render component', () => {
        const wrapper = shallow(<StepsItem index={1} text="text" />);

        expect(wrapper).toMatchSnapshot();
    });
});
