import * as React from 'react';
import { mount } from 'enzyme';
import TimerBadge from './TimerBadge';

const RealDate = global.Date;
const date = new Date('2022-03-15T10:50:15z');

const defaultDate = new Date('2022-04-25T14:50:15z');

const someHoursBeforeEnd = new Date('2022-03-15T15:50:15z');
const lastHour = new Date('2022-03-15T11:20:15z');
const expiredDate = new Date('2022-03-15T09:50:15z');

const defaultAllProps = {
    dataAttrs: {
        root: { 'data-testid': 'root' },
        text: { 'data-testid': 'text' },
        timer: { 'data-testid': 'timer' },
    },
    className: 'rootClass',
    expirationDate: defaultDate,
    countdownStart: 604800,
    countdownText: 'Срок действия истечёт через',
    expirationDateText: 'Действительно до',
    hasPrefix: true,
};

describe('<TimerBadge />', () => {
    describe('snapshots', () => {
        beforeAll(() => {
            global.Date = class extends Date {
                constructor(customDate: string) {
                    super();

                    return customDate ? new RealDate(customDate) : date;
                }
            } as DateConstructor;
        });

        afterAll(() => {
            global.Date = RealDate;
        });

        it('renders with require props', () => {
            const wrapper = mount(<TimerBadge expirationDate={defaultDate} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with all props', () => {
            const wrapper = mount(<TimerBadge {...defaultAllProps} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with countdown', () => {
            const wrapper = mount(<TimerBadge expirationDate={someHoursBeforeEnd} hasPrefix />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with last hour', () => {
            const wrapper = mount(<TimerBadge expirationDate={lastHour} hasPrefix />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with expired time', () => {
            const wrapper = mount(<TimerBadge expirationDate={expiredDate} />);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
