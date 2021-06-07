import * as React from 'react';
import { mount, shallow } from 'enzyme';
import BenefitsPictures, { IBenefitsPicturesProps } from './BenefitsPictures';
import { fourItems, threeItems, twoItems } from './doc/BenefitsPictures.docz';

const props: IBenefitsPicturesProps = {
    items: twoItems,
    hAlign: 'left',
    gridGap: 'large',
    className: 'class-name',
    classes: {
        root: 'root-class',
        item: 'item-class',
    },
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

    it('render with html in title and text', () => {
        const itemsLocal = [
            {
                title: 'Интернет <span class="test">123</span>',
                text: 'Подключение к домашнему интернету осуществляется в удобное для вас время по технологиям Ethernet, Docsis. <span class="test-2"><b class="test-3">456</b></span>',
                img: 'image.png',
            },
            {
                title: 'Интернет',
                text: 'Подключение к домашнему интернету осуществляется в удобное для вас время по технологиям Ethernet, Docsis.',
                img: 'image.png',
            },
        ];

        const wrapper = shallow(<BenefitsPictures {...props} items={itemsLocal} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<BenefitsPictures {...props} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });
});
