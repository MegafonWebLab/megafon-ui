import * as React from 'react';
import { render } from '@testing-library/react';
import Timer, { getCountdownText } from './Timer';

const requiredProps = {
    expirationDate: new Date('2022-04-25T14:50:15z'),
    actualRemainingTime: 1000,
    showCountdown: false,
};

describe('<Timer />', () => {
    it('should render with Timer', () => {
        const { container } = render(<Timer {...requiredProps} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with additional text', () => {
        const { queryByText } = render(<Timer {...requiredProps} additionalText="Действительно до" />);

        expect(queryByText('Действительно до')).toBeInTheDocument();
    });

    it('should render with date', () => {
        const { queryByText } = render(<Timer {...requiredProps} />);

        expect(queryByText('25 апреля 2022')).toBeTruthy();
    });

    it('should render with countdown', () => {
        const { queryByText } = render(<Timer {...requiredProps} showCountdown />);

        expect(queryByText('16 мин')).toBeTruthy();
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(<Timer {...requiredProps} dataAttrs={{ root: { 'data-testid': 'root' } }} />);

        expect(queryByTestId('root')).toBeTruthy();
    });
});

describe('getCountdownText tests', () => {
    it('should return correct string, if remaining time less than minute', () => {
        const result = getCountdownText(55);

        expect(result).toBe('55 сек');
    });

    it('should return correct string, if remaining time less than hour', () => {
        const result = getCountdownText(3500);

        expect(result).toBe('58 мин');
    });

    it('should return correct string, if remaining time more than hour and less than one day', () => {
        const result = getCountdownText(4000);

        expect(result).toBe('1 ч 6 мин');
    });

    it('should return correct string, if remaining time includes days and hours', () => {
        const result = getCountdownText(94000);

        expect(result).toBe('1 дн 2 ч');
    });

    it('should return correct string, if remaining time includes full days', () => {
        const result = getCountdownText(172800);

        expect(result).toBe('2 дн');
    });

    it('should return empty string without remaining time', () => {
        const result = getCountdownText();

        expect(result).toBe('');
    });
});
