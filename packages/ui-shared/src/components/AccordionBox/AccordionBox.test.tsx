import * as React from 'react';
import { shallow } from 'enzyme';
import AccordionBox, { IAccordionBox } from './AccordionBox';

const props: IAccordionBox = {
    rootRef: jest.fn(),
    title: 'Test',
    isOpened: false,
    hasVerticalPaddings: true,
    className: 'className',
    classes: {
        openedClass: 'isOpenClass',
        root: 'rootClass',
        collapse: 'collapseClass',
    },
    onClickAccordion: jest.fn(),
};

describe('<AccordionBox />', () => {
    it('render AccordionBox', () => {
        const wrapper = shallow(
            <AccordionBox {...props}>
                <div>test</div>
            </AccordionBox>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render AccordionBox with hCenterAlignWide=true', () => {
        const wrapper = shallow(
            <AccordionBox {...props} hCenterAlignWide>
                <div>test</div>
            </AccordionBox>
            );

        expect(wrapper).toMatchSnapshot();
    });
});
