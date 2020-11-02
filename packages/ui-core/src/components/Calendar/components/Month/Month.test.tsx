import * as React from 'react';
import { shallow } from 'enzyme';
import Month, { IMonthProps } from './Month';

const props: IMonthProps = {
    year: 1994,
    month: 9,
    firstDayOfWeek: 0,
    goToPreviousMonths: jest.fn(),
    goToNextMonths: jest.fn(),
};

describe('<Month />', () => {
    afterAll(() => jest.restoreAllMocks());

    describe('layout', () => {
        it('renders Month with props', () => {
            const wrapper = shallow(<Month {...props} />);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
