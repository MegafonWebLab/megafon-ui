import * as React from 'react';
import { shallow } from 'enzyme';
import BenefitsIcons, { IBenefitsIcons } from './BenefitsIcons';
import { fiveItems, fourItems, threeItems, twoItems, twoItemsWithoutText, twoItemsWithoutTitle } from './BenefitsIcons.docz';
import Checked from 'icons/System/24/Checked_24.svg';
import { IconPositionEnum } from './types';

const props: IBenefitsIcons = {
    items: twoItems,
    className: 'className',
};

const itemsSet = [
    twoItems,
    threeItems,
    fourItems,
    fiveItems,
];

describe('<BenefitsIcons />', () => {
    it('renders BenefitsIcons', () => {
        const wrapper = shallow(<BenefitsIcons {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders left-aligned columns with left-aligned icon on top', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsIcons items={items} iconPosition={IconPositionEnum.LEFT_TOP} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('renders left-aligned columns with left side icon', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsIcons items={items} iconPosition={IconPositionEnum.LEFT_SIDE} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('renders center-aligned columns with center-aligned icon on top', () => {
        itemsSet.forEach(items => {
            const wrapper = shallow(<BenefitsIcons items={items} iconPosition={IconPositionEnum.CENTER_TOP} />);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
