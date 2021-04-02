import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Partners from './Partners';
import megafon from './megafon.png';
import { cnCreate } from '@megafon/ui-core';

const cnCarousel = cnCreate('.mfui-beta-carousel');

const generateItems = (i, href?) =>
    Array.from({ length: i }, () => ({
        href,
        src: megafon,
    }));

describe('<Partners />', () => {
    it('should render grid', () => {
        const wrapper = shallow(
            <Partners className="custom-class" items={generateItems(4, '#')} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should render carousel', () => {
        const wrapper = shallow(<Partners items={generateItems(12, '#')} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render carousel with odd items number', () => {
        const wrapper = shallow(<Partners items={generateItems(11, '#')} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render logotypes without href', () => {
        const wrapper = shallow(<Partners items={generateItems(4)} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should call onChange', () => {
        const mockOnChange = jest.fn();
        const wrapper = mount(
            <Partners items={generateItems(12)} onChange={mockOnChange} />
        );
        const arrows = wrapper.find(cnCarousel('arrow'));

        arrows.last().simulate('click');

        expect(mockOnChange).toBeCalled();
    });

    it('should call onNextClick', () => {
        const mockOnNextClick = jest.fn();
        const wrapper = mount(
            <Partners items={generateItems(12)} onNextClick={mockOnNextClick} />
        );
        const arrows = wrapper.find(cnCarousel('arrow'));

        arrows.last().simulate('click');

        expect(mockOnNextClick).toBeCalled();
    });

    it('should call onPrevClick', () => {
        const mockOnPrevClick = jest.fn();
        const wrapper = mount(
            <Partners items={generateItems(12)} onPrevClick={mockOnPrevClick} />
        );
        const arrows = wrapper.find(cnCarousel('arrow'));

        arrows.first().simulate('click');

        expect(mockOnPrevClick).toBeCalled();
    });
});
