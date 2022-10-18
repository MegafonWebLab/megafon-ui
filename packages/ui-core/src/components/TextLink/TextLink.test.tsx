import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    dataAttrs: {
        root: {
            'data-root': 'test',
        },
    },
};

describe('<TextLink />', () => {
    it('it renders TextLink', () => {
        const { container } = render(<TextLink {...props} />);

        expect(container).toMatchSnapshot();
    });

    it('it calls onClick handler', () => {
        const onClick = jest.fn();
        const { container } = render(<TextLink onClick={onClick} />);

        fireEvent.click(container.firstElementChild as Element);

        expect(onClick.mock.calls).toHaveLength(1);
    });
});
