import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar, { ICalendarProps } from './Calendar';

const props: ICalendarProps = {
    classes: {
        root: 'rootClass',
    },
    numberOfMonths: 2,
    initials: {
        startDate: new Date('01.07.2020'),
        endDate: new Date('01.19.2020'),
    },
    position: 'top',
    handleChange: jest.fn(),
};

describe('<Calendar />', () => {
    afterAll(() => jest.restoreAllMocks());

    describe('layout', () => {
        it('renders Calendar with default props', () => {
            const wrapper = shallow(<Calendar />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with all props', () => {
            const wrapper = shallow(<Calendar {...props} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleChange', () => {
        it('calls handleChange on date change', () => {
            const handleChange = jest.fn();
            const wrapper = mount(<Calendar {...props} handleChange={handleChange} />);
            const firstDayElement = wrapper.find('.mfui-calendar-day_first').at(0);
            const lastDayElement = wrapper.find('.mfui-calendar-day_last').at(0);
            firstDayElement.simulate('click');
            lastDayElement.simulate('click');
            expect(handleChange).toBeCalledTimes(2);
        });
    });
});
