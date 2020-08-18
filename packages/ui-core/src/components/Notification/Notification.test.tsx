import * as React from 'react';
import { shallow } from 'enzyme';
import Notification, { Types } from './Notification';

describe('<Notification />', () => {
    it('it renders Notification without props', () => {
        const wrapper = shallow(
            <Notification>Some test text</Notification>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Notification with type', () => {
        const wrapper = shallow(
            <Notification type={Types.SUCCESS}>Some test text</Notification>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders short Notification', () => {
        const wrapper = shallow(
            <Notification isShort>Some test text</Notification>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
