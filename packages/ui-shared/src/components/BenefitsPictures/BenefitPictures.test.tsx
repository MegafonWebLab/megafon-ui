import * as React from 'react';
import { shallow } from 'enzyme';
import BenefitsPictures, { IBenefitsPictures } from './BenefitsPictures';
import { twoItems, threeItems, fourItems } from './BenefitsPictures.docz';

const props: IBenefitsPictures = {
    items: twoItems,
    hAlign: 'left',
    gridGap: 'large',
    hAlignImg: 'left',
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
                const wrapper = shallow(<BenefitsPictures {...props} items={items} hAlign="center"/>);
                expect(wrapper).toMatchSnapshot();
        });
    });

    it('render with medium grid gap', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsPictures {...props} items={items} gridGap="medium" />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('render with center image align', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsPictures {...props} items={items} hAlignImg="center" />);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
