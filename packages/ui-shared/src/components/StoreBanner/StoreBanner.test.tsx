/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { shallow, mount } from 'enzyme';
import * as React from 'react';
import StoreBanner, { IStoreBannerProps, DeviceMask, Theme } from './StoreBanner';

const props: IStoreBannerProps = {
    title: 'Title',
    text: 'Text',
    linkApple: 'App Store link',
    linkGoogle: 'Google Play link',
    deviceMask: DeviceMask.ANDROID,
    imageSrc: 'image.png',
    dataAttrs: { 'data-test': 'value' },
};

describe('StoreBanner', () => {
    it('should render with required props', () => {
        const wrapper = shallow(<StoreBanner {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with iphone mask', () => {
        const currentProps = {
            ...props,
            deviceMask: DeviceMask.BLACK_IPHONE,
        };
        const wrapper = shallow(<StoreBanner {...currentProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with green theme', () => {
        const currentProps = {
            ...props,
            theme: Theme.GREEN,
        };
        const wrapper = shallow(<StoreBanner {...currentProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with QR-code', () => {
        const wrapper = shallow(<StoreBanner {...props} qrCode="qr-code.png" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with custom class names', () => {
        const wrapper = shallow(
            <StoreBanner
                {...props}
                className="custom-class-name"
                classes={{
                    root: 'root-custom-class-name',
                    appleLink: 'app-store-custom-class-name',
                    googleLink: 'google-store-custom-class-name',
                }}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call click handler on app store link', () => {
        const onClickApple = jest.fn();
        const wrapper = shallow(<StoreBanner {...props} onClickApple={onClickApple} />);

        const link = wrapper.find('.mfui-beta-store-banner__store-link_app-store');
        link.simulate('click');

        expect(onClickApple).toHaveBeenCalled();
    });

    it('should call click handler on google play link', () => {
        const onClickGoogle = jest.fn();
        const wrapper = shallow(<StoreBanner {...props} onClickGoogle={onClickGoogle} />);

        const link = wrapper.find('.mfui-beta-store-banner__store-link_google-play');
        link.simulate('click');

        expect(onClickGoogle).toHaveBeenCalled();
    });

    it('should return reference to root element', () => {
        const ref = React.createRef<HTMLDivElement>();
        const component = mount(<StoreBanner {...props} rootRef={ref} />);
        const rootContainer = component.getDOMNode();

        expect(ref.current).toEqual(rootContainer);
    });
});
