import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Container, { BackgroundColors } from './Container';
import TitleDescriptionBox from '../TitleDescriptionBox/TitleDescriptionBox';

const optionalProps = {
    id: 'id',
    className: 'className',
    backgroundColor: BackgroundColors.GREEN,
};

describe('Container', () => {
    it('should renders component with default props', () => {
        const wrapper = shallow(<Container><TitleDescriptionBox title="title"/></Container>);

        expect(wrapper).toMatchSnapshot();
    });

    it('should renders component with optional props', () => {
        const wrapper = shallow(
            <Container {...optionalProps}>
                <TitleDescriptionBox title="title" />
            </Container>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(
            <Container rootRef={ref}>
                <TitleDescriptionBox title="title"/>
            </Container>
        );

        expect(ref.current).not.toBeNull();
    });
});
