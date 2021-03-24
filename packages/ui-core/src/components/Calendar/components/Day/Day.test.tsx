import * as React from 'react';
import { shallow } from 'enzyme';
import Day, { IDayProps } from './Day';

const props: IDayProps = {
    dayLabel: 'Пн',
    date: new Date(1994, 9, 30),
    focusedDate: new Date(1994, 9, 30),
    isDateSelected: jest.fn(),
    isDateHovered: jest.fn(),
    isFirstOrLastSelectedDate: jest.fn(),
    isDateBlocked: jest.fn(),
    isDateFocused: jest.fn(),
    onDateHover: jest.fn(),
    onDateSelect: jest.fn(),
    onDateFocus: jest.fn(),
};

describe('<Day />', () => {
    describe('snapshots', () => {
        it('renders Day with required props', () => {
            const wrapper = shallow(<Day {...props} dayLabel={undefined}/>);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders Day with all props', () => {
            const wrapper = shallow(<Day {...props} onMouseLeave={jest.fn()} isBetween />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should return empty div if label is not provided', () => {
            const { dayLabel, ...restProps } = props;

            const wrapper = shallow(<Day {...restProps} />);

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleMouseLeave tests', () => {
        it('calls callback on them cursor leaves the button', () => {
            const onMouseLeave = jest.fn();

            const wrapper = shallow(<Day {...props} onMouseLeave={onMouseLeave} />);

            wrapper.find('button').simulate('mouseleave');

            expect(onMouseLeave).toBeCalled();
        });
    });
});
