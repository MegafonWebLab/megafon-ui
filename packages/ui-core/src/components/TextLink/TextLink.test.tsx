/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import * as React from 'react';
import TextLink, { ITextLinkProps } from './TextLink';

const props: ITextLinkProps = {
    color: 'white',
    underlineVisibility: 'hover',
    underlineStyle: 'solid',
    target: '_self',
    href: 'href',
    rel: 'noopener',
    className: 'class',
    children: 'text',
    download: true,
};

describe('<TextLink />', () => {
    it('it renders TextLink', () => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        const wrapper = shallow(<TextLink {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it calls onClick handler', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<TextLink onClick={onClick} />);
        wrapper.simulate('click');
        // eslint-disable-next-line no-magic-numbers
        expect(onClick.mock.calls).toHaveLength(1);
    });
});
