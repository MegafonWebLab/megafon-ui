import * as React from 'react';
import { shallow } from 'enzyme';
import MainTileInternet from './MainTileInternet';
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
    socialIcons: [{
        svgIcon: <Checked />,
        title: 'test',
    }],
};

describe('<MainTileInternet />', () => {
    it('it renders MainTileInternet', () => {
        const wrapper = shallow(<MainTileInternet {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
