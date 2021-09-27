import * as React from 'react';
import { mount, shallow } from 'enzyme';
import TextBox from './TextBox';

describe('TextBox', () => {
    it('render with default props', () => {
        const wrapper = shallow(
            <TextBox>
                <p>test</p>
            </TextBox>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with className="test-class-name"', () => {
        const wrapper = shallow(
            <TextBox className="test-class-name">
                <p>test</p>
            </TextBox>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with centered text', () => {
        const wrapper = shallow(
            <TextBox textCenter={true}>
                <p>test</p>
            </TextBox>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with limited width', () => {
        const wrapper = shallow(
            <TextBox isFullWidth={false}>
                <p>test</p>
            </TextBox>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with limited width and centered text', () => {
        const wrapper = shallow(
            <TextBox isFullWidth={false} textCenter={true}>
                <p>test</p>
            </TextBox>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with limited width and centered component', () => {
        const wrapper = shallow(
            <TextBox isFullWidth={false} centeringWithLimitedWidth={true}>
                <p>test</p>
            </TextBox>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with limited width, centered component and centered text', () => {
        const wrapper = shallow(
            <TextBox isFullWidth={false} centeringWithLimitedWidth={true} textCenter={true}>
                <p>test</p>
            </TextBox>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(
            <TextBox rootRef={ref}>
                <p>test</p>
            </TextBox>,
        );

        expect(ref.current).not.toBeNull();
    });
});
