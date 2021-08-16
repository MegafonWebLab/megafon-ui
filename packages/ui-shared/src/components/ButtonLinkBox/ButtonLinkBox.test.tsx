/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import ButtonLinkBox, { IButtonLinkBoxProps } from './ButtonLinkBox';

const props: IButtonLinkBoxProps = {
    className: 'custom-class',
    classes: {
        root: 'root-class',
        button: 'button-class',
        link: 'link-class',
    },
    dataAttrs: {
        'data-test': 'value',
    },
    buttonTitle: 'button title',
    buttonUrl: 'button-url',
    buttonColor: 'purple',
    linkTitle: 'link title',
    linkUrl: 'link-url',
    hAlign: 'center',
    linkTarget: '_blank',
    buttonTarget: '_self',
};

describe('<ButtonLinkBox />', () => {
    it('renders ButtonLinkBox', () => {
        const wrapper = shallow(<ButtonLinkBox {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders ButtonLinkBox without button', () => {
        const wrapper = shallow(<ButtonLinkBox {...props} buttonTitle={undefined} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders ButtonLinkBox without link', () => {
        const wrapper = shallow(<ButtonLinkBox {...props} linkTitle={undefined} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders ButtonLinkBox with download links', () => {
        const wrapper = shallow(<ButtonLinkBox {...props} linkDownload buttonDownload />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<ButtonLinkBox {...props} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });

    it('calls onButtonClick', () => {
        const onButtonClickMock = jest.fn();
        const wrapper = shallow(<ButtonLinkBox {...props} onButtonClick={onButtonClickMock} />);
        const event = 'event';

        wrapper.find('Button').simulate('click', event);

        expect(onButtonClickMock).toBeCalledWith(event);
    });

    it('calls onLinkClick', () => {
        const onLinkClickMock = jest.fn();
        const wrapper = shallow(<ButtonLinkBox {...props} onLinkClick={onLinkClickMock} />);
        const event = 'event';

        wrapper.find('TextLink').simulate('click', event);

        expect(onLinkClickMock).toBeCalledWith(event);
    });
});
