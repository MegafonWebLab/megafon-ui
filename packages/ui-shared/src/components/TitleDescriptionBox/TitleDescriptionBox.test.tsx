/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import TitleDescriptionBox, { ITitleDescriptionBoxProps } from './TitleDescriptionBox';

const props: ITitleDescriptionBoxProps = {
    title: 'title',
    description: 'description',
    textColor: 'white',
    hAlign: 'center',
    className: 'custom class',
    dataAttrs: { 'data-test': 'value' },
};

describe('<TitleDescriptionBox />', () => {
    it('renders TitleDescriptionBox', () => {
        const wrapper = shallow(<TitleDescriptionBox {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders TitleDescriptionBox without title', () => {
        const wrapper = shallow(<TitleDescriptionBox {...props} title={undefined} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders TitleDescriptionBox without description', () => {
        const wrapper = shallow(<TitleDescriptionBox {...props} description={undefined} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders with components in description field', () => {
        const descriptions = [<div key="0">Test node render</div>];
        const wrapper = shallow(<TitleDescriptionBox {...props} description={descriptions} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(<TitleDescriptionBox {...props} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });
});
