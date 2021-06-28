import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import CardsBox from './CardsBox';
import Card, { ICard } from '../Card/Card';
import Carousel from '@megafon/ui-core/dist/lib/components/Carousel/Carousel';

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

const localWindow = window as LocalWindowType;
const windowInnerWidth = window.innerWidth;

describe('CardsBox', () => {
    it('render component', () => {
        const wrapper = shallow(<CardsBox><Card {...cardProps} /></CardsBox>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(<CardsBox rootRef={ref}><Card {...cardProps} /></CardsBox>);

        expect(ref.current).not.toBeNull();
    });

    describe('mobile resolution', () => {
        beforeAll(() => {
            localWindow.innerWidth = 320;
        });

        afterAll(() => {
            localWindow.innerWidth = windowInnerWidth;
        });

        it('render with carousel', () => {
            const wrapper = mount(
                <CardsBox>
                    <Card {...cardProps} />
                    <Card {...cardProps} />
                    <Card {...cardProps} />
                </CardsBox>
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('should call onChange on mobile resolution', () => {
            const mockOnChange = jest.fn();

            const wrapper = mount(
                <CardsBox onChange={mockOnChange}>
                    <Card {...cardProps} />
                    <Card {...cardProps} />
                    <Card {...cardProps} />
                </CardsBox>
            );

            const CarouselProps = wrapper.find('CarouselMock').props() as React.ComponentProps<typeof Carousel>;

            act(() => {
                CarouselProps.onChange &&
                CarouselProps.onChange(1, 0, 3);
            });

            expect(mockOnChange).toBeCalled();
        });
    });
});
