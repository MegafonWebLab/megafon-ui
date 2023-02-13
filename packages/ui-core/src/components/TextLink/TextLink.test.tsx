import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
    itemProp: 'item',
    dataAttrs: {
        root: {
            'data-testid': 'root',
        },
    },
};

describe('<TextLink />', () => {
    it('should render', () => {
        const { container } = render(<TextLink />);

        expect(container).toMatchSnapshot();
    });

    it('should render with props', () => {
        const { getByTestId } = render(<TextLink {...props} />);
        const link = getByTestId('root');

        expect(link).toHaveAttribute('download');
        expect(link).toHaveClass(props.className as string);
        expect(link).toHaveAttribute('rel', props.rel);
        expect(link).toContainHTML(props.children as string);
        expect(link).toHaveAttribute('href', props.href);
        expect(link).toHaveClass('mfui-text-link_color_white');
        expect(link).toHaveAttribute('target', props.target);
        expect(link).toHaveAttribute('itemProp', props.itemProp);
        expect(link).toHaveClass('mfui-text-link_underline-style_solid');
        expect(link).toHaveClass('mfui-text-link_underline-visibility_hover');
    });

    it('should call onClick', () => {
        const mockOnClick = jest.fn();
        const { getByText } = render(<TextLink onClick={mockOnClick}>Link</TextLink>);

        fireEvent.click(getByText('Link'));
        expect(mockOnClick).toBeCalled();
    });
});
