import * as React from 'react';
import { shallow } from 'enzyme';
import TitleDescriptionBox, { ITitleDescriptionBoxProps } from './TitleDescriptionBox';

const props: ITitleDescriptionBoxProps = {
    title: 'title',
    description: 'description',
    textColor: 'white',
    hAlign: 'center',
    className: 'custom class',
};

describe('<TitleDescriptionBox />', () => {
    it('renders TitleDescriptionBox', () => {
        const wrapper = shallow(<TitleDescriptionBox {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
