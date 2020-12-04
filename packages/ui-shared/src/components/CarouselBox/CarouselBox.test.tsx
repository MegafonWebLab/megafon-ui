import * as React from 'react';
import { shallow } from 'enzyme';
import CarouselBox, { ICarouselBox } from 'components/CarouselBox/CarouselBox';

const props: ICarouselBox = {
    className: 'testClassName',
    innerIndentsClass: 'testInnerClass',
    loop: true,
    autoPlay: true,
    autoPlayDelay: 10,
    navTheme: 'green',
    onNextClick: jest.fn(),
    onPrevClick: jest.fn(),
    onChange: jest.fn(),
};

describe('<CarouselBox />', () => {
    it('render CarouselBox with default props', () => {
        const wrapper = shallow(
            <CarouselBox>
                <div>test</div>
            </CarouselBox>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render CarouselBox with props', () => {
        const wrapper = shallow(
            <CarouselBox {...props}>
                <div>test</div>
            </CarouselBox>
        );

        expect(wrapper).toMatchSnapshot();
    });
});
