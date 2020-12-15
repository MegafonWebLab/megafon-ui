import * as React from 'react';
import { shallow } from 'enzyme';
import TextBox, { ITextBoxProps } from './TextBox';

const props: ITextBoxProps = {
    textCenter: true,
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
});
