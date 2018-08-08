import * as React from 'react';
import { shallow } from 'enzyme';
import Paragraph from './Paragraph';

describe('<Paragraph />', () => {
    it('it renders Paragraph', () => {
        const wrapper = shallow(<Paragraph>Text</Paragraph>);
        expect(wrapper).toMatchSnapshot();
    });
});
