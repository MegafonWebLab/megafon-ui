/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import TitleDescriptionBox from '../TitleDescriptionBox/TitleDescriptionBox';
import Container, { BackgroundColors } from './Container';

const optionalProps = {
    id: 'id',
    className: 'className',
    backgroundColor: BackgroundColors.GREEN,
    disablePaddingTop: true,
    disablePaddingBottom: true,
};

describe('Container', () => {
    it('should renders component with default props', () => {
        const wrapper = shallow(
            <Container>
                <TitleDescriptionBox title="title" />
            </Container>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should renders component with optional props', () => {
        const wrapper = shallow(
            <Container {...optionalProps}>
                <TitleDescriptionBox title="title" />
            </Container>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(
            <Container rootRef={ref}>
                <TitleDescriptionBox title="title" />
            </Container>,
        );

        expect(ref.current).not.toBeNull();
    });
});
