import * as React from 'react';
import { shallow } from 'enzyme';
import PropertyDescription from './PropertyDescription';

describe('<PropertyDescription />', () => {
    it('should render description in one row', () => {
        const wrapper = shallow(
            <PropertyDescription
                value={['Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка']}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render description in several rows', () => {
        const wrapper = shallow(
            <PropertyDescription
                value={[
                    'Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка',
                    'Google Play Music, Apple Music, онлайн радио.',
                ]}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render hidden description', () => {
        const wrapper = shallow(
            <PropertyDescription
                value={[
                    'Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка',
                    'Google Play Music, Apple Music, онлайн радио.',
                ]}
                isCollapsible={true}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render opened description', () => {
        const wrapper = shallow(
            <PropertyDescription
                value={[
                    'Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка',
                    'Google Play Music, Apple Music, онлайн радио.',
                ]}
                isCollapsible={true}
            />
        );

        wrapper.find('.mfui-beta-property-description__collapse').simulate('click');
        expect(wrapper).toMatchSnapshot();
    });
});
