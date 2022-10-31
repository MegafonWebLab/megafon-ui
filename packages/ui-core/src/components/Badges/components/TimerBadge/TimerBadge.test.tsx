import * as React from 'react';
import { render, act } from '@testing-library/react';
import TimerBadge, { TIMEOUT } from './TimerBadge';

const currentDate = new Date('2022-03-15T10:50:15z');
const lessThanHourBeforeEndDate = new Date('2022-03-15T11:40:15z');
const fiveSecondsBeforeEndDate = new Date('2022-03-15T10:50:20z');
const fiveDaysBeforeEndDate = new Date('2022-03-20T14:50:15z');
const expiredDate = new Date('2022-03-15T09:50:15z');
const sixDays = 600000;
const fourDays = 400000;

const dataAttrs = {
    root: { 'data-testid': 'root' },
    text: { 'data-testid': 'text' },
    timer: { 'data-testid': 'timer' },
    iconContainer: { 'data-testid': 'iconContainer' },
};

describe('<TimerBadge />', () => {
    const defaultDateNow = Date.now;

    beforeAll(() => {
        Date.now = jest.fn().mockReturnValue(currentDate.getTime());
    });

    afterAll(() => {
        Date.now = defaultDateNow;
    });

    it('should render with require props', () => {
        const { container } = render(<TimerBadge expirationDate={fiveDaysBeforeEndDate} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with dataAttrs', () => {
        const { getByTestId } = render(<TimerBadge expirationDate={fiveDaysBeforeEndDate} dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toBeTruthy();
        expect(getByTestId('text')).toBeTruthy();
        expect(getByTestId('timer')).toBeTruthy();
        expect(getByTestId('iconContainer')).toBeTruthy();
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <TimerBadge expirationDate={fiveDaysBeforeEndDate} className="custom-class" dataAttrs={dataAttrs} />,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render when expirationDate expired', () => {
        const { queryByText } = render(<TimerBadge expirationDate={expiredDate} dataAttrs={dataAttrs} />);

        expect(queryByText('Время действия истекло')).toBeInTheDocument();
    });

    it('should render when countdownStart is greater than expirationDate and hasPrefix is false', () => {
        const { getByTestId, queryByText } = render(
            <TimerBadge
                countdownStart={sixDays}
                countdownText="Срок действия истечёт через"
                expirationDate={fiveDaysBeforeEndDate}
                dataAttrs={dataAttrs}
                hasPrefix={false}
            />,
        );

        expect(getByTestId('root')).toHaveClass('mfui-timer-badge_theme_red');
        expect(queryByText('Срок действия истечёт через')).not.toBeInTheDocument();
        expect(queryByText('5 дн 4 ч')).toBeTruthy();
    });

    it('should render when countdownStart is greater than expirationDate and hasPrefix is true', () => {
        const { getByTestId, queryByText } = render(
            <TimerBadge
                countdownStart={sixDays}
                countdownText="Срок действия истечёт через"
                expirationDate={fiveDaysBeforeEndDate}
                dataAttrs={dataAttrs}
                hasPrefix
            />,
        );

        expect(getByTestId('root')).toHaveClass('mfui-timer-badge_theme_red');
        expect(queryByText('Срок действия истечёт через')).toBeInTheDocument();
        expect(queryByText('5 дн 4 ч')).toBeTruthy();
    });

    it('should render when countdownStart is less than expirationDate and hasPrefix is false', () => {
        const { getByTestId, queryByText } = render(
            <TimerBadge
                countdownStart={fourDays}
                expirationDate={fiveDaysBeforeEndDate}
                expirationDateText="Действительно до"
                dataAttrs={dataAttrs}
                hasPrefix={false}
            />,
        );

        expect(getByTestId('root')).toHaveClass('mfui-timer-badge_theme_grey');
        expect(queryByText('Действительно до')).not.toBeInTheDocument();
        expect(queryByText('20 марта 2022')).toBeTruthy();
    });

    it('should render when countdownStart is less than expirationDate and hasPrefix is true', () => {
        const { getByTestId, queryByText } = render(
            <TimerBadge
                countdownStart={fourDays}
                expirationDate={fiveDaysBeforeEndDate}
                expirationDateText="Действительно до"
                dataAttrs={dataAttrs}
                hasPrefix
            />,
        );

        expect(getByTestId('root')).toHaveClass('mfui-timer-badge_theme_grey');
        expect(queryByText('Действительно до')).toBeInTheDocument();
        expect(queryByText('20 марта 2022')).toBeTruthy();
    });

    it('should render when expirationDate is less than hour and countdownStart is greater than expirationDate', () => {
        const { getByTestId, queryByText } = render(
            <TimerBadge countdownStart={sixDays} expirationDate={lessThanHourBeforeEndDate} dataAttrs={dataAttrs} />,
        );

        expect(getByTestId('iconContainer')).toHaveClass('mfui-timer-badge__icon-container_shadow');
        expect(queryByText('50 мин')).toBeTruthy();
    });

    it('should render when expirationDate decremented by 1 after rerender', () => {
        jest.useFakeTimers();

        const { queryByText, rerender } = render(
            <TimerBadge expirationDate={fiveSecondsBeforeEndDate} dataAttrs={dataAttrs} />,
        );

        expect(queryByText('5 сек')).toBeTruthy();

        act(() => {
            jest.runTimersToTime(TIMEOUT);
        });

        rerender(
            <TimerBadge countdownStart={sixDays} expirationDate={fiveSecondsBeforeEndDate} dataAttrs={dataAttrs} />,
        );

        expect(queryByText('4 сек')).toBeTruthy();

        jest.useRealTimers();
    });
});
