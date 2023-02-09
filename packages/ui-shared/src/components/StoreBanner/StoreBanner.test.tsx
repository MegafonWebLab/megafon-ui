import * as React from 'react';
import { shallow, mount } from 'enzyme';
import StoreBanner, { IStoreBannerProps, DeviceMask, Theme } from './StoreBanner';

const props: IStoreBannerProps = {
    title: 'Title',
    text: 'Text',
    linkApple: 'App Store link',
    linkGoogle: 'Google Play link',
    rel: 'nofollow',
    deviceMask: DeviceMask.ANDROID,
    imageSrc: 'image.png',
    dataAttrs: {
        root: { 'data-test-id': 'root-test' },
        button: { 'data-test-id': 'button-test' },
        linkApple: { 'data-test-id': 'linkApple-test' },
        linkGoogle: { 'data-test-id': 'linkGoogle-test' },
        linkHuawei: { 'data-test-id': 'linkHuawei-test' },
    },
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

    it('should render with Huawei Store', () => {
        const wrapper = shallow(<StoreBanner {...props} className="custom-class-name" linkHuawei="#huawei" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with green button', () => {
        const wrapper = shallow(<StoreBanner {...props} className="custom-class-name" linkButton="#button" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with violet button', () => {
        const wrapper = shallow(
            <StoreBanner {...props} className="custom-class-name" linkButton="#button" theme="green" />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call click handler on app store link', () => {
        const onClickApple = jest.fn();
        const wrapper = shallow(<StoreBanner {...props} onClickApple={onClickApple} />);

        const link = wrapper.find('.mfui-store-banner__store-link_app-store');
        link.simulate('click');

        expect(onClickApple).toHaveBeenCalled();
    });

    it('should call click handler on google play link', () => {
        const onClickGoogle = jest.fn();
        const wrapper = shallow(<StoreBanner {...props} onClickGoogle={onClickGoogle} />);

        const link = wrapper.find('.mfui-store-banner__store-link_google-play');
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
