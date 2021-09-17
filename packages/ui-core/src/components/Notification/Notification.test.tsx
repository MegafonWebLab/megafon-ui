import Attention from '@megafon/ui-icons/system-16-attention_16.svg';
import { shallow } from 'enzyme';
import * as React from 'react';
import Notification, { INotificationProps, NotificationTypes, ShadowTypes } from './Notification';

const props: INotificationProps = {
    className: 'notification',
    type: NotificationTypes.ERROR,
    shadowLevel: ShadowTypes.HOVER,
    href: 'href',
    hasCloseButton: false,
    rel: 'noopener',
    target: '_blank',
    icon: <Attention />,
    title: 'title',
    isColored: true,
};

describe('<Notification />', () => {
    it('renders component', () => {
        const wrapper = shallow(<Notification>Some test text</Notification>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders colored Notification with Props', () => {
        const wrapper = shallow(<Notification {...props}>Some test text</Notification>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it calls onLinkClick handler', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Notification {...props} link="link" onLinkClick={onClick} />);
        const link = wrapper.find('.mfui-beta-notification__link');
        link.simulate('click');
        expect(onClick).toBeCalled();
    });

    it('it calls onClick handler', () => {
        const onClose = jest.fn();
        const wrapper = shallow(<Notification {...props} hasCloseButton onClose={onClose} />);
        const closeButton = wrapper.find('.mfui-beta-notification__close');
        closeButton.simulate('click');
        expect(onClose).toBeCalled();
    });
});
