import * as React from 'react';
import { shallow } from 'enzyme';
import Container, { BackgroundColors } from './Container';
import TitleDescriptionBox from '../TitleDescriptionBox/TitleDescriptionBox';

describe('Container', () => {
    it('it renders component', () => {
        const wrapper = shallow(<Container><TitleDescriptionBox title="title"/></Container>);

        expect(wrapper).toMatchSnapshot();
    });

    it('it renders component with className', () => {
        const wrapper = shallow(
            <Container className="className">
                <TitleDescriptionBox title="title" />
            </Container>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('it renders component with green background color', () => {
        const wrapper = shallow(
            <Container backgroundColor={BackgroundColors.GREEN}>
                <TitleDescriptionBox title="title"/>
            </Container>
        );

        expect(wrapper).toMatchSnapshot();
    });
});
