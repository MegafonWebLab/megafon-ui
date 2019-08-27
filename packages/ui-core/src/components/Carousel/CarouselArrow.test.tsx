import * as React from 'react';
import { shallow } from 'enzyme';
import CarouselArrow from './CarouselArrow';

describe('<CarouselArrow />', () => {
    describe('render tests', () => {
        it('should render component with all props', () => {
            const wrapper = shallow(
                <CarouselArrow
                    className="some-class"
                    onClick={jest.fn()}
                />
            );

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('onClick tests', () => {
        it('should call onClick on arrow wrapper click', () => {
            const onClick = jest.fn();

            const wrapper = shallow(
                <CarouselArrow
                    onClick={onClick}
                    className="some-class"
                />
            );

            wrapper.find('.mfui-carousel-arrow').simulate('click');

            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });
});
