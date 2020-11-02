import * as React from 'react';
import { shallow } from 'enzyme';
import Day, { IDayProps } from './Day';

const props: IDayProps = {
    dayLabel: 'Пн',
    date: new Date(1994, 9, 30),
};

describe('<Day />', () => {
    afterAll(() => jest.restoreAllMocks());

    describe('layout', () => {
        it('renders Day with props', () => {
            const wrapper = shallow(<Day {...props} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should return empty div if label is not provided', () => {
            const wrapper = shallow(<Day date={props.date} />);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
