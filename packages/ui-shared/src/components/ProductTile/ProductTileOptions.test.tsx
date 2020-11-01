import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileOptions from './ProductTileOptions';
import MegafonTv from 'icons/Service-logos/24/MF-TV.svg';

const props = {
    head: 'head',
    options: [
        {
            title: 'title',
            caption: 'caption',
            value: 'value',
            unit: 'unit',
            footnote: 'footnote',
            svgIcon: <MegafonTv />,
        },
        {
            title: 'title1',
            caption: 'caption1',
            value: 'value1',
            unit: 'unit1',
        },
        {
            title: 'title2',
            value: 'value2',
            unit: 'unit2',
        },
        {
            title: 'title3',
            value: 'value3',
        },
        {
            title: 'title4',
        },
    ],
};

describe('<ProductTileOptions />', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1234567);
    });
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('it renders ProductTileOptions', () => {
        const wrapper = shallow(<ProductTileOptions options={[]} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders ProductTileOptions with props', () => {
        const wrapper = shallow(<ProductTileOptions {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
