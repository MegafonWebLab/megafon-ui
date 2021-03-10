import * as React from 'react';
import { shallow } from 'enzyme';
import Steps from './Steps';
import StepsItem from './StepsItem';

describe('Steps', () => {
    it('should render component', () => {
        const wrapper = shallow(<Steps title="title"><StepsItem index={1} text="text" /></Steps>);

        expect(wrapper).toMatchSnapshot();
    });
});
