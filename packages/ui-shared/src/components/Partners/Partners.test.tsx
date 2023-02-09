import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { mount, shallow } from 'enzyme';
import Partners from './Partners';

const cnCarousel = cnCreate('.mfui-carousel');

const generateItems = (i, href?) =>
    Array.from({ length: i }, () => ({
        href,
        rel: 'nofollow',
        src: '/test-src',
        alt: 'test img',
    }));

describe('<Partners />', () => {
    it('should render grid', () => {
        const wrapper = shallow(<Partners className="custom-class" items={generateItems(4, '#')} />);
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
        const wrapper = mount(<Partners items={generateItems(12)} onChange={mockOnChange} />);
        const arrows = wrapper.find(cnCarousel('arrow'));

        arrows.last().simulate('click');

        expect(mockOnChange).toBeCalled();
    });

    it('should call onNextClick', () => {
        const mockOnNextClick = jest.fn();
        const wrapper = mount(<Partners items={generateItems(12)} onNextClick={mockOnNextClick} />);
        const arrows = wrapper.find(cnCarousel('arrow'));

        arrows.last().simulate('click');

        expect(mockOnNextClick).toBeCalled();
    });

    it('should call onPrevClick', () => {
        const mockOnPrevClick = jest.fn();
        const wrapper = mount(<Partners items={generateItems(12)} onPrevClick={mockOnPrevClick} />);
        const arrows = wrapper.find(cnCarousel('arrow'));

        arrows.first().simulate('click');

        expect(mockOnPrevClick).toBeCalled();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<Partners items={generateItems(12, '#')} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });

    it('should render with classes props', () => {
        const wrapper = shallow(
            <Partners
                className="custom-class"
                items={generateItems(4, '#')}
                classes={{
                    root: 'test-root-class',
                    itemClass: 'test-item-class',
                }}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('checking setting of data attributes', () => {
        const wrapper = shallow(
            <Partners
                items={generateItems(6, '#')}
                dataAttrs={{ root: { 'data-testid': 'root-test' }, item: { 'data-testid': 'item-test' } }}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
