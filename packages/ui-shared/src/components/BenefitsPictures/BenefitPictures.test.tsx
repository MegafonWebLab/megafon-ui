import * as React from 'react';
import {shallow} from 'enzyme';
import BenefitsPictures, {GutterSize, HorizontalAlign, IBenefitsPictures} from './BenefitsPictures';
import {fourItems, threeItems, twoItems} from './BenefitsPictures.docz';

const props: IBenefitsPictures = {
    items: twoItems,
    hAlign: 'left',
    gridGap: GutterSize.LARGE,
    hAlignImg: HorizontalAlign.LEFT,
};

const itemsSet = [
    twoItems,
    threeItems,
    fourItems,
];

describe('<BenefitsPictures />', () => {
    it('renders BenefitsPictures', () => {
        const wrapper = shallow(<BenefitsPictures {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render with center horizontal align', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsPictures {...props} items={items} hAlign={HorizontalAlign.CENTER}/>);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('render with medium grid gap', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsPictures {...props} items={items} gridGap={GutterSize.MEDIUM} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('render with center image align', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsPictures {...props} items={items} hAlignImg={HorizontalAlign.CENTER} />);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
