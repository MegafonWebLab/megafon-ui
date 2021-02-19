import * as React from 'react';
import { shallow } from 'enzyme';
import StoreBanner, { IStoreBannerProps, DeviceMask, Theme } from './StoreBanner';

const props: IStoreBannerProps = {
    title: 'Title',
    text: 'Text',
    linkApple: 'App Store link',
    linkGoogle: 'Google Play link',
    deviceMask: DeviceMask.ANDROID,
    imageSrc: 'image.png',
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
        const wrapper = shallow(<StoreBanner {...props} qrCode={'qr-code.png'}/>);

        expect(wrapper).toMatchSnapshot();
    });
});
