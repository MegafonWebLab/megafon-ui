import * as React from 'react';
import { shallow } from 'enzyme';
import DropdownSocialList from './DropdownSocialList';
import Checked from 'icons/checked_24.svg';

const props = {
    icons: [{
        svgIcon: <Checked />,
        title: 'test',
    }, {
        svgIcon: <Checked />,
        title: 'test',
    }, {
        svgIcon: <Checked />,
        title: 'test',
    }],
    maxIconNumber: 2,
};

describe('<DropdownSocialList />', () => {
    it('it renders DropdownSocialList', () => {
        const wrapper = shallow(<DropdownSocialList {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
