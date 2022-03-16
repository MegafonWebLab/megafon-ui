import * as React from 'react';
import { shallow } from 'enzyme';
import Timer, { getCoundownText } from './Timer';

const defaultDate = new Date('2022-04-25T14:50:15z');

const defaultProps = {
    expirationDate: defaultDate,
    actualRemainingTime: 1000,
    showCountdown: false,
};

const defaultAllProps = {
    dataAttrs: {
        root: { 'data-testid': 'root' },
    },
    additionalText: 'Действительно до',
    expirationDate: defaultDate,
    actualRemainingTime: 2000,
    showCountdown: true,
};

describe('<Timer />', () => {
    describe('snapshots', () => {
        it('renders with require props', () => {
            const wrapper = shallow(<Timer {...defaultProps} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with all props', () => {
            const wrapper = shallow(<Timer {...defaultAllProps} />);

            expect(wrapper).toMatchSnapshot();
        });
    });
});

describe('getCoundownText tests', () => {
    it('should return correct string, if remaining time less than minute', () => {
        const result = getCoundownText(55);

        expect(result).toBe('55 сек');
    });

    it('should return correct string, if remaining time less than hour', () => {
        const result = getCoundownText(3500);

        expect(result).toBe('58 мин');
    });

    it('should return correct string, if remaining time more than hour and less than one day', () => {
        const result = getCoundownText(4000);

        expect(result).toBe('1 ч 6 мин');
    });

    it('should return correct string, if remaining time includes days and hours', () => {
        const result = getCoundownText(94000);

        expect(result).toBe('1 дн 2 ч');
    });

    it('should return correct string, if remaining time includes full days', () => {
        const result = getCoundownText(172800);

        expect(result).toBe('2 дн');
    });

    it('should return empty string without remaining time', () => {
        const result = getCoundownText();

        expect(result).toBe('');
    });
});
