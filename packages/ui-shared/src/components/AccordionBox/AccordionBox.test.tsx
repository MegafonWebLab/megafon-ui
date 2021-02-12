import * as React from 'react';
import { shallow } from 'enzyme';
import AccordionBox, { IAccordionBox } from './AccordionBox';

const props: IAccordionBox = {
    title: 'Test',
    isOpened: false,
    hasVerticalPaddings: true,
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
