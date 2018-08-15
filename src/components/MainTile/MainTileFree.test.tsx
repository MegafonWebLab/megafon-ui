import * as React from 'react';
import { shallow } from 'enzyme';
import MainTileFree from './MainTileFree';
import Checked from 'icons/checked_24.svg';

const props = {
    title: 'test',
    params: [
        {
            svgIcon: <Checked />,
            title: 'test',
            caption: 'test',
            value: 'test',
        },
    ],
};

describe('<MainTileFree />', () => {
    it('it renders MainTileFree', () => {
        const wrapper = shallow(<MainTileFree {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
