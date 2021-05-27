import * as React from 'react';
import { mount, shallow } from 'enzyme';
import WiFi from 'icons/Basic/32/Wi-fi_32.svg';
import Property from './Property';

describe('<Property />', () => {
    it('should render only title', () => {
        const wrapper = shallow(
            <Property
                items={[
                    { title: ['Звонки на все номера России'], value: '500 ₽' },
                ]}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render title in several row', () => {
        const wrapper = shallow(
            <Property
                items={[
                    {
                        title: [
                            'Детализация в салонах МегаФона',
                            'Оплачивается каждый день заказанной детализации.',
                        ],
                        value: '2ГБ',
                    },
                ]}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render title and description', () => {
        const wrapper = shallow(
            <Property
                items={[
                    {
                        title: ['Интернет на все сервисы'],
                        description: [
                            {
                                value: 'Boom, Yandex.Музыка, Zvooq, ВКонтакте Музыка',
                            },
                        ],
                    },
                ]}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render title and hidden description', () => {
        const wrapper = shallow(
            <Property
                items={[
                    {
                        title: ['Музыкальные сервисы'],
                        description: [
                            {
                                value: 'Звонки на местные городские номера, когда вы находитесь дома, оплачиваются отдельно.',
                                isCollapsible: true,
                            },
                        ],
                        value: '500 ₽',
                    },
                ]}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with badge', () => {
        const wrapper = shallow(
            <Property
                badge={'Акция'}
                items={[
                    { title: ['Звонки на все номера России'], value: '500 ₽' },
                ]}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with icon', () => {
        const wrapper = shallow(
            <Property
                icon={<WiFi style={{ display: 'block', fill: '#00B956' }} />}
                items={[{ title: ['Интернет на все сервисы'], value: '500 ₽' }]}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with several descriptions', () => {
        const wrapper = shallow(
            <Property
                items={[
                    {
                        title: ['Доп звонки'],
                        value: '500Р',
                        description: [
                            {
                                value:
                                    'После израсходования пакета минут звонки на номера МегаФона России предоставляются безлимитно.',
                            },
                            {
                                value:
                                    'Звонки на местные городские номера, когда вы находитесь дома, оплачиваются отдельно.',
                                isCollapsible: true,
                            },
                        ],
                    },
                ]}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render several rows', () => {
        const wrapper = shallow(
            <Property
                multirow
                items={[
                    { title: ['Абонентская плата:'] },
                    {
                        value: '500 ₽',
                        description: [
                            { value: 'Звонки на все номера России' },
                        ],
                    },
                    {
                        value: '500 ₽',
                        description: [
                            { value: 'Звонки на все номера России' },
                        ],
                    },
                    {
                        value: '500 ₽',
                        description: [
                            { value: 'Звонки на все номера России' },
                        ],
                    },
                ]}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with border bottom', () => {
        const wrapper = shallow(
            <Property
                items={[
                    {
                        title: ['Звонки на все номера России'],
                        value: '500 ₽',
                    },
                ]}
                borderBottom
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(
            <Property
                items={[
                    { title: ['Звонки на все номера России'], value: '500 ₽' },
                ]}
                rootRef={ref}
            />
        );

        expect(ref.current).not.toBeNull();
    });

    it('should render with data attribute', () => {
        const wrapper = shallow(
            <Property
                items={[
                    { title: ['Звонки на все номера России'], value: '500 ₽' },
                ]}
                dataAttrs={{ 'data-test': 'value' }}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with custom class names', () => {
        const wrapper = shallow(
            <Property
                items={[
                    {
                        title: ['Доп звонки'],
                        value: '500Р',
                        description: [
                            {
                                value:
                                    'Звонки на местные городские номера, когда вы находитесь дома, оплачиваются отдельно.',
                                isCollapsible: true,
                            },
                        ],
                    },
                ]}
                classes={{
                    title: 'title-custom-class',
                    openedDescription: 'opened-description-custom-class',
                    toggleDescription: 'toggle-description-custom-class',
                }}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});
