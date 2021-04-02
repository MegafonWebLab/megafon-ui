import * as React from 'react';
import { shallow } from 'enzyme';
import BenefitsPictures, { IBenefitsPicturesProps } from './BenefitsPictures';
import { fourItems, threeItems, twoItems } from './doc/BenefitsPictures.docz';

const props: IBenefitsPicturesProps = {
    items: twoItems,
    hAlign: 'left',
    gridGap: 'large',
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
            const wrapper = shallow(<BenefitsPictures {...props} items={items} hAlign={'left'} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('render with medium grid gap', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsPictures {...props} items={items} gridGap={'medium'} />);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
