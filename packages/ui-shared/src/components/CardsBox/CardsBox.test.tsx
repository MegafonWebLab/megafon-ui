import * as React from 'react';
import { shallow, mount } from 'enzyme';
import CardsBox from './CardsBox';
import Card, { ICard } from '../Card/Card';

const cardProps: ICard = {
    title: 'title',
    text: 'text',
    button: {
        title: 'button-title',
        href: 'button-href',
    },
    link: {
        title: 'href-title',
        href: 'href',
    },
};

type LocalWindowType = Omit<Window, 'innerWidth'> & {
    innerWidth: number;
};

jest.mock('@megafon/ui-core/dist/lib/components/Carousel/Carousel', () => {
    const CarouselMock = (props): React.ReactNode => props.children;

    return CarouselMock;
});

describe('CardsBox', () => {
    it('render component', () => {
        const wrapper = shallow(<CardsBox><Card {...cardProps} /></CardsBox>);
        expect(wrapper).toMatchSnapshot();
    });

    it('render on mobile resolution with carousel', () => {
        const localWindow = window as LocalWindowType;
        const windowInnerWidth = window.innerWidth;

        localWindow.innerWidth = 320;

        const wrapper = mount(
            <CardsBox>
                <Card {...cardProps} />
                <Card {...cardProps} />
                <Card {...cardProps} />
            </CardsBox>
        );

        expect(wrapper).toMatchSnapshot();

        localWindow.innerWidth = windowInnerWidth;
    });
});
