import * as React from 'react';
import { shallow } from 'enzyme';
import Month, { IMonthProps } from './Month';

const mouseClickEvent = new MouseEvent('click') as unknown as React.MouseEvent;
const escapeEvent = {
    type: 'keydown',
    nativeEvent: {
        code: 'Escape',
    },
} as React.KeyboardEvent;
const enterEvent = {
    type: 'keydown',
    nativeEvent: {
        code: 'Enter',
    },
} as React.KeyboardEvent;

const props: IMonthProps = {
    dataAttrs: {
        root: { 'data-testid': 'root-test' },
        arrowLeft: { 'data-testid': 'arrowLeft-test' },
        arrowRight: { 'data-testid': 'arrowRight-test' },
    },
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

        describe('handleArrowLeftClick tests', () => {
            it('should call goToPreviousMonths on left arrow click', () => {
                const goToPreviousMonth = jest.fn();

                const wrapper = shallow(
                    <Month {...props} goToPreviousMonth={goToPreviousMonth}>
                        <div />
                    </Month>,
                );

                wrapper.find('.mfui-month__arrow').first().simulate('click', mouseClickEvent);

                expect(goToPreviousMonth).toBeCalledTimes(1);
            });

            it('shouldn`t call goToPreviousMonths on left arrow click, if prev month disabled', () => {
                const goToPreviousMonth = jest.fn();

                const wrapper = shallow(
                    <Month {...props} goToPreviousMonth={goToPreviousMonth} isPrevMonthDisabled>
                        <div />
                    </Month>,
                );

                wrapper.find('.mfui-month__arrow').first().simulate('click', mouseClickEvent);

                expect(goToPreviousMonth).not.toBeCalled();
            });

            it('should call goToPreviousMonths on left arrow keydown, if key code is Enter', () => {
                const goToPreviousMonth = jest.fn();

                const wrapper = shallow(
                    <Month {...props} goToPreviousMonth={goToPreviousMonth}>
                        <div />
                    </Month>,
                );

                wrapper.find('.mfui-month__arrow').first().simulate('keydown', enterEvent);

                expect(goToPreviousMonth).toBeCalled();
            });

            it('shouldn`t call goToPreviousMonths on left arrow keydown, if key code isn`t Enter', () => {
                const goToPreviousMonth = jest.fn();

                const wrapper = shallow(
                    <Month {...props} goToPreviousMonth={goToPreviousMonth}>
                        <div />
                    </Month>,
                );

                wrapper.find('.mfui-month__arrow').first().simulate('keydown', escapeEvent);

                expect(goToPreviousMonth).not.toBeCalled();
            });
        });

        describe('handleArrowRightClick tests', () => {
            it('should call goToNextMonth on right arrow click', () => {
                const goToNextMonth = jest.fn();

                const wrapper = shallow(
                    <Month {...props} goToNextMonth={goToNextMonth}>
                        <div />
                    </Month>,
                );

                wrapper.find('.mfui-month__arrow').last().simulate('click', mouseClickEvent);

                expect(goToNextMonth).toBeCalledTimes(1);
            });

            it('shouldn`t call goToNextMonth on right arrow click, if next month disabled', () => {
                const goToNextMonth = jest.fn();

                const wrapper = shallow(
                    <Month {...props} goToNextMonth={goToNextMonth} isNextMonthDisabled>
                        <div />
                    </Month>,
                );

                wrapper.find('.mfui-month__arrow').last().simulate('click', mouseClickEvent);

                expect(goToNextMonth).not.toBeCalled();
            });

            it('should call goToNextMonth on right arrow keydown, if key code is Enter', () => {
                const goToNextMonth = jest.fn();

                const wrapper = shallow(
                    <Month {...props} goToNextMonth={goToNextMonth}>
                        <div />
                    </Month>,
                );

                wrapper.find('.mfui-month__arrow').last().simulate('keydown', enterEvent);

                expect(goToNextMonth).toBeCalled();
            });

            it('shouldn`t call goToNextMonth on right arrow keydown, if key code isn`t Enter', () => {
                const goToNextMonth = jest.fn();

                const wrapper = shallow(
                    <Month {...props} goToNextMonth={goToNextMonth}>
                        <div />
                    </Month>,
                );

                wrapper.find('.mfui-month__arrow').last().simulate('keydown', escapeEvent);

                expect(goToNextMonth).not.toBeCalled();
            });
        });
    });
});
