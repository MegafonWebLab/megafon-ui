/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import ButtonBanner, { IButtonBannerProps, ButtonTarget, ButtonColor, ImageScaling } from './ButtonBanner';

const requiredProps: IButtonBannerProps = {
    title: 'Заголовок',
    text: 'Текст',
    buttonText: 'Кнопка',
};

const props: IButtonBannerProps = {
    ...requiredProps,
    dataAttrs: {
        'data-test': 'value',
    },
    className: 'className',
    classes: {
        root: 'rootClass',
        button: 'buttonClass',
    },
    imageUrl: 'image.png',
    buttonUrl: '#',
    buttonDownload: true,
    buttonTarget: ButtonTarget.BLANK,
    buttonColor: ButtonColor.PURPLE,
    imageScaling: ImageScaling.CONTAIN,
};

describe('<ButtonBanner />', () => {
    it('should render with required props', () => {
        const wrapper = shallow(<ButtonBanner {...requiredProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(<ButtonBanner {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<ButtonBanner {...requiredProps} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });

    it('should call onButtonClick', () => {
        const onButtonClickMock = jest.fn();
        const event = 'event';
        const wrapper = shallow(<ButtonBanner {...props} onButtonClick={onButtonClickMock} />);

        wrapper.find('Button').simulate('click', event);

        expect(onButtonClickMock).toBeCalledWith(event);
    });
});
