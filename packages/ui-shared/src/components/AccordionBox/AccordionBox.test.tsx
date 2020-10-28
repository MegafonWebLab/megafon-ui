import * as React from 'react';
import { shallow } from 'enzyme';
import AccordionBox, { IAccordionBox } from './AccordionBox';

const props: IAccordionBox = {
    title: 'Test',
    isOpened: false,
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
            <AccordionBox {...props} hCenterAlignWide={true}>
                <div>test</div>
            </AccordionBox>
            );

        expect(wrapper).toMatchSnapshot();
    });
});
