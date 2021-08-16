/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import PropertyDescription from './PropertyDescription';

describe('<PropertyDescription />', () => {
    it('should render description', () => {
        const wrapper = shallow(<PropertyDescription value="Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render hidden description', () => {
        const wrapper = shallow(
            <PropertyDescription value="Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка" isCollapsible />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render opened description', () => {
        const wrapper = shallow(
            <PropertyDescription value="Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка" isCollapsible />,
        );

        wrapper.find('.mfui-beta-property-description__collapse').simulate('click');
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with custom toggle class', () => {
        const wrapper = shallow(
            <PropertyDescription
                value="Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка"
                isCollapsible
                classes={{ toggle: 'toggle-custom-class' }}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with open custom class name', () => {
        const wrapper = mount(
            <PropertyDescription
                value="Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка"
                isCollapsible
                classes={{ open: 'open-custom-class' }}
            />,
        );

        wrapper.find('.mfui-beta-property-description__collapse').simulate('click');

        expect(wrapper.getDOMNode().classList.contains('open-custom-class')).toBeTruthy();
    });
});
