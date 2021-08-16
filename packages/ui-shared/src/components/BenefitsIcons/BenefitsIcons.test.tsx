/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import BenefitsIcons, { IBenefitsIcons } from './BenefitsIcons';
import { fiveItems, fourItems, threeItems, twoItems } from './doc/BenefitsIcons.docz';
import { IconPositionEnum } from './types';

const props: IBenefitsIcons = {
    items: twoItems,
    className: 'class-name',
    classes: {
        root: 'root-class',
        item: 'item-class',
    },
};

const itemsSet = [twoItems, threeItems, fourItems, fiveItems];

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

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<BenefitsIcons {...props} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });
});
