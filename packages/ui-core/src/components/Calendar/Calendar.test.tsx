import { shallow, mount } from 'enzyme';
import * as React from 'react';
import Calendar, { ICalendarProps } from './Calendar';

const props: ICalendarProps = {
    className: 'rootClass',
    startDate: new Date(2020, 1, 7),
    endDate: new Date(2020, 1, 14),
    minBookingDate: new Date(2020, 1, 3),
    maxBookingDate: new Date(2020, 1, 25),
    onChange: jest.fn(),
};

describe('<Calendar />', () => {
    describe('snapshots', () => {
        it('renders with all props', () => {
            const wrapper = shallow(<Calendar {...props} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders calendar with single date', () => {
            const wrapper = mount(<Calendar {...props} isSingleDate />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders calendar without chosen dates if they are blocked', () => {
            jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2020, 11, 31).valueOf());

            const wrapper = mount(
                <Calendar {...props} startDate={new Date(2020, 1, 1)} endDate={new Date(2020, 1, 27)} />,
            );

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('onChange', () => {
        it('calls onChange on date change', () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { minBookingDate, maxBookingDate, ...restProps } = props;
            const onChange = jest.fn();

            const wrapper = mount(<Calendar {...restProps} onChange={onChange} />);
            jest.resetAllMocks();

            wrapper.find('.mfui-beta-day_first').at(0).simulate('click');
            wrapper.find('.mfui-beta-day_last').at(0).simulate('click');

            expect(onChange).toBeCalledTimes(2);
        });

        it('calls onChange only with start date with click after chosen period', () => {
            const onChange = jest.fn();

            const wrapper = mount(<Calendar {...props} onChange={onChange} />);
            jest.resetAllMocks();

            wrapper.find('.mfui-beta-day').at(23).simulate('click');

            expect(onChange).toBeCalledWith(new Date('2020-02-24T00:00:00.000Z'), null);
        });

        it('calls onChange only with start date with click on any of chosen dates', () => {
            const onChange = jest.fn();

            const wrapper = mount(<Calendar {...props} onChange={onChange} />);
            jest.resetAllMocks();

            wrapper.find('.mfui-beta-day').at(18).simulate('click');

            expect(onChange).toBeCalledWith(new Date('2020-02-19T00:00:00.000Z'), null);
        });

        it('should call onChange with correct arguments in single date mode', () => {
            const onChange = jest.fn();

            const wrapper = mount(<Calendar {...props} onChange={onChange} isSingleDate />);
            jest.resetAllMocks();

            wrapper.find('.mfui-beta-day').at(21).simulate('click');

            expect(onChange).toHaveBeenCalledWith(new Date('2020-02-22T00:00:00.000Z'), null);
        });

        it('should call onChange with correct arguments when narroving chosen period', () => {
            const onChange = jest.fn();

            const wrapper = mount(<Calendar {...props} onChange={onChange} />);
            jest.resetAllMocks();

            wrapper.find('.mfui-beta-day').at(8).simulate('click');

            expect(onChange).toHaveBeenCalledWith(
                new Date('2020-02-09T00:00:00.000Z'),
                new Date('2020-02-14T00:00:00.000Z'),
            );

            wrapper.find('.mfui-beta-day').at(12).simulate('click');

            expect(onChange).toHaveBeenCalledWith(
                new Date('2020-02-09T00:00:00.000Z'),
                new Date('2020-02-13T00:00:00.000Z'),
            );
        });

        it('shouldnt call onChange if startDate or endDate props changed', () => {
            const onChange = jest.fn();

            mount(<Calendar {...props} onChange={onChange} />);

            expect(onChange).toBeCalledTimes(0);
        });
    });
});
