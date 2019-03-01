import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileOptions from './ProductTileOptions';
import MegafonTv from 'icons/Service-logos/24/MF-TV.svg';

const props = {
    head: 'sdfsdfsdf',
    options: [{
        title: 'title',
        caption: 'caption',
        value: 234,
        unit: 'unit',
        footnote: 'footnote',
        svgIcon: <MegafonTv />,
    }],
};

describe('<ProductTileOptions />', () => {
    it('it renders ProductTileOptions', () => {
        const wrapper = shallow(<ProductTileOptions {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
