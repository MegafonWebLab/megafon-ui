import * as React from 'react';
import { mount, shallow } from 'enzyme';
import TextBox, { ITextBoxProps } from './TextBox';

const props: ITextBoxProps = {
    textCenter: true,
    className: 'class-name',
};

describe('<TextBox />', () => {
    it('renders TextBox with default props', () => {
        const wrapper = shallow(
            <TextBox>
                <p>test</p>
            </TextBox>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders TextBox with centered content', () => {
        const wrapper = shallow(
            <TextBox {...props}>
                <p>test</p>
            </TextBox>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(
            <TextBox {...props} rootRef={ref}>
                <p>test</p>
            </TextBox>
        );

        expect(ref.current).not.toBeNull();
    });
});
