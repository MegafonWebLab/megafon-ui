import * as React from 'react';
import { shallow } from 'enzyme';
import ButtonBanner, { IButtonBannerProps, ButtonTarget, ButtonColor } from './ButtonBanner';

const requiredProps: IButtonBannerProps = {
    title: 'Заголовок',
    text: 'Текст <a href="#" target="_blank">тект</a>',
    buttonText: 'Кнопка',
};

const props: IButtonBannerProps = {
    ...requiredProps,
    className: 'className',
    imageUrl: 'image.png',
    buttonUrl: '#',
    buttonTarget: ButtonTarget.BLANK,
    buttonColor: ButtonColor.PURPLE,
};

describe('<ButtonBanner />', () => {
    it('should render with required props', () => {
        const wrapper = shallow(
            <ButtonBanner {...requiredProps} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(
            <ButtonBanner {...props} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onButtonClick', () => {
        const onButtonClickMock = jest.fn();
        const event = 'event';
        const wrapper = shallow(
            <ButtonBanner {...props} onButtonClick={onButtonClickMock} />
        );

        wrapper.find('Button').simulate('click', event);

        expect(onButtonClickMock).toBeCalledWith(event);
    });
});
