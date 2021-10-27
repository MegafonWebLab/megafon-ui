import * as React from 'react';
import { shallow } from 'enzyme';
import CarouselBox from 'components/CarouselBox/CarouselBox';

describe('<CarouselBox />', () => {
    it('render CarouselBox with default props', () => {
        const wrapper = shallow(
            <CarouselBox>
                <div>test</div>
            </CarouselBox>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render CarouselBox with props', () => {
        const wrapper = shallow(
            <CarouselBox
                classes={{
                    root: 'testClassName',
                    innerIndents: 'testInnerClass',
                }}
                loop
                autoPlay
                autoPlayDelay={10}
                navTheme="green"
                onNextClick={jest.fn()}
                onPrevClick={jest.fn()}
                onChange={jest.fn()}
            >
                <div>test</div>
            </CarouselBox>,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
