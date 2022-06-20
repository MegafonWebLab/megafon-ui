import * as React from 'react';
import Attention from '@megafon/ui-icons/system-16-attention_16.svg';
import { mount, shallow } from 'enzyme';
import Notification, { INotificationProps, NotificationTypes, ShadowTypes } from './Notification';

const props: INotificationProps = {
    className: 'notification',
    classes: {
        root: 'rootClass',
        container: 'containerClass',
        content: 'contentClass',
    },
    type: NotificationTypes.ERROR,
    shadowLevel: ShadowTypes.HOVER,
    link: 'Ссылка',
    href: 'href',
    hasCloseButton: false,
    rel: 'noopener',
    target: '_blank',
    icon: <Attention />,
    title: 'title',
    isColored: true,
    buttonText: 'Кнопка',
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

    it('it renders Notification with close collapse', () => {
        const wrapper = shallow(<Notification shortText="Короткий текст">Длинный текст</Notification>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Notification with custom close collapse title', () => {
        const wrapper = shallow(
            <Notification shortText="Короткий текст" closeCollapseTitle="Показать весь текст">
                Длинный текст
            </Notification>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Notification with open collapse', () => {
        const wrapper = shallow(
            <Notification shortText="Короткий текст" isCollapseOpened>
                Длинный текст
            </Notification>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Notification with custom open collapse title', () => {
        const wrapper = shallow(
            <Notification isCollapseOpened shortText="Короткий текст" openCollapseTitle="Скрыть часть текста">
                Длинный текст
            </Notification>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Notification without link, when component has collapse', () => {
        const wrapper = shallow(
            <Notification {...props} shortText="Короткий текст">
                Длинный текст
            </Notification>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Notification with close collpse after change isCollapseOpened', () => {
        const wrapper = mount(
            <Notification {...props} shortText="Короткий текст" isCollapseOpened>
                Длинный текст
            </Notification>,
        );

        wrapper.setProps({ isCollapseOpened: false });
        wrapper.update();

        expect(wrapper).toMatchSnapshot();
    });

    it('it calls onLinkClick handler', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Notification {...props} link="link" onLinkClick={onClick} />);
        const link = wrapper.find('.mfui-notification__link');
        link.simulate('click');
        expect(onClick).toBeCalled();
    });

    it('it calls onClick handler', () => {
        const onClose = jest.fn();
        const wrapper = shallow(<Notification {...props} hasCloseButton onClose={onClose} />);
        const closeButton = wrapper.find('.mfui-notification__close');
        closeButton.simulate('click');
        expect(onClose).toBeCalled();
    });

    it('it calls onButtonClick handler', () => {
        const onButtonClick = jest.fn();
        const wrapper = shallow(<Notification {...props} onButtonClick={onButtonClick} />);
        const button = wrapper.find('.mfui-notification__button');
        button.simulate('click');
        expect(onButtonClick).toBeCalled();
    });

    it('it calls onCollapseButtonClick handler', () => {
        const onCollapseButtonClick = jest.fn();

        const wrapper = shallow(
            <Notification shortText="Короткий текст" onCollapseButtonClick={onCollapseButtonClick}>
                Длинный текст
            </Notification>,
        );

        const collapseButton = wrapper.find('.mfui-notification__collapse-button');
        collapseButton.simulate('click');
        expect(onCollapseButtonClick).toBeCalled();
    });
});
