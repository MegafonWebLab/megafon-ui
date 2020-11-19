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
        it('renders Day with props', () => {
            const wrapper = shallow(<Day {...props} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should return empty div if label is not provided', () => {
            const { dayLabel, ...restProps } = props;

            const wrapper = shallow(<Day {...restProps} />);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
