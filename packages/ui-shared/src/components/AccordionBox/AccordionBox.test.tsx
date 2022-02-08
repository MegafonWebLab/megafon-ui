import * as React from 'react';
import { shallow } from 'enzyme';
import AccordionBox, { IAccordionBox } from './AccordionBox';

const props: IAccordionBox = {
    dataAttrs: {
        root: {
            'data-root': 'data-test-value',
        },
    },
    rootRef: jest.fn(),
    title: 'Test',
    isOpened: false,
    className: 'className',
    classes: {
        openedClass: 'isOpenClass',
        root: 'rootClass',
        collapse: 'collapseClass',
        titleWrap: 'titleWrapClass',
    },
    onClickAccordion: jest.fn(),
};

describe('<AccordionBox />', () => {
    it('should render with props', () => {
        const wrapper = shallow(
            <AccordionBox {...props}>
                <div>test</div>
            </AccordionBox>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with centered grid when hCenterAlignWide is true', () => {
        const wrapper = shallow(
            <AccordionBox {...props} hCenterAlignWide>
                <div>test</div>
            </AccordionBox>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render without grid when isFullWidth is true', () => {
        const wrapper = shallow(
            <AccordionBox {...props} isFullWidth>
                <div>test</div>
            </AccordionBox>,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
