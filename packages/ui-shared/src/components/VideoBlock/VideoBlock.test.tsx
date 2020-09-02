import * as React from 'react';
import { shallow } from 'enzyme';
import VideoBlock, { Props } from './VideoBlock';
import { cnCreate } from '@megafon/ui-core';

const props: Props = {
    mediaSource: '',
    className: 'test-class-name',
};

const content = {
    title: 'Test title',
    description: [
        'Test description',
        'Test description',
    ],
    buttonTitle: 'Button title',
    href: '#',
    onButtonClick: jest.fn(),
};

const cn = cnCreate('mfui-video-block');

describe('<VideoBlock />', () => {
    it('it renders VideoBlock with default props', () => {
        const component = shallow(<VideoBlock mediaSource="">Test paragraph text</VideoBlock>);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with props', () => {
        const component = shallow(<VideoBlock {...props}>Test paragraph text</VideoBlock>);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with content', () => {
        const component = shallow(<VideoBlock {...props} content={content}>Test paragraph text</VideoBlock>);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with youtube media type', () => {
        const component = shallow(<VideoBlock {...props} mediaType="youtube">Test paragraph text</VideoBlock>);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with gif media type', () => {
        const component = shallow(<VideoBlock {...props} mediaType="gif">Test paragraph text</VideoBlock>);
        expect(component).toMatchSnapshot();
    });

    it('should call onClick props', () => {
        const component = shallow(<VideoBlock {...props} content={content}>Test paragraph text</VideoBlock>);
        const btn = component.find(`.${cn('button')}`);

        btn.simulate('click');
        expect(content.onButtonClick).toBeCalled();
    });
});
