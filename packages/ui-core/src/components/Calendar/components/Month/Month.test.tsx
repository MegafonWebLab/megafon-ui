import * as React from 'react';
import { shallow } from 'enzyme';
import Month, { IMonthProps } from './Month';

const props: IMonthProps = {
    isNextMonthDisabled: false,
    isPrevMonthDisabled: false,
    year: 1994,
    monthLabel: 'monthLabel',
    weekdayLabels: ['label1', 'label2'],
    goToPreviousMonth: jest.fn(),
    goToNextMonth: jest.fn(),
};

describe('<Month />', () => {
    describe('snapshots', () => {
        it('renders component with props', () => {
            const wrapper = shallow(
                <Month {...props}>
                    <div />
                </Month>,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('renders component with props disabled arrows', () => {
            const wrapper = shallow(
                <Month {...props} isNextMonthDisabled isPrevMonthDisabled>
                    <div />
                </Month>,
            );

            expect(wrapper).toMatchSnapshot();
        });
    });
    describe('handlers tests', () => {
        afterEach(() => jest.resetAllMocks());

        it('shouldnt call goToPreviousMonths and goToNextMonths on arrows click', () => {
            const goToNextMonth = jest.fn();
            const goToPreviousMonth = jest.fn();

            const wrapper = shallow(
                <Month
                    {...props}
                    goToNextMonth={goToNextMonth}
                    goToPreviousMonth={goToPreviousMonth}
                    isNextMonthDisabled
                    isPrevMonthDisabled
                >
                    <div />
                </Month>,
            );

            wrapper.find('.mfui-beta-month__arrow').first().simulate('click');
            wrapper.find('.mfui-beta-month__arrow').last().simulate('click');

            expect(goToNextMonth).toHaveBeenCalledTimes(0);
            expect(goToPreviousMonth).toHaveBeenCalledTimes(0);
        });

        it('should call goToPreviousMonths on left arrow click', () => {
            const goToPreviousMonth = jest.fn();

            const wrapper = shallow(
                <Month {...props} goToPreviousMonth={goToPreviousMonth}>
                    <div />
                </Month>,
            );

            wrapper.find('.mfui-beta-month__arrow').first().simulate('click');

            expect(goToPreviousMonth).toHaveBeenCalledTimes(1);
        });

        it('should call goToNextMonths on right arrow click', () => {
            const goToNextMonth = jest.fn();

            const wrapper = shallow(
                <Month {...props} goToNextMonth={goToNextMonth}>
                    <div />
                </Month>,
            );

            wrapper.find('.mfui-beta-month__arrow').last().simulate('click');

            expect(goToNextMonth).toHaveBeenCalledTimes(1);
        });
    });
});
