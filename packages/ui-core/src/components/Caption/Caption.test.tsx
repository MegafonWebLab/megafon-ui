import * as React from 'react';
import { render } from '@testing-library/react';
import Caption, { ICaptionProps } from './Caption';

const dataAttrs: ICaptionProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
};

describe('<Caption />', () => {
    it('should render Caption', () => {
        const { container } = render(<Caption>Test caption text</Caption>);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <Caption className="custom-class" dataAttrs={dataAttrs}>
                Test caption text
            </Caption>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(<Caption dataAttrs={dataAttrs}>Test caption text</Caption>);

        expect(queryByTestId('root')).toBeTruthy();
    });

    it('should render with align', () => {
        const { getByTestId } = render(
            <Caption align="right" dataAttrs={dataAttrs}>
                Test caption text
            </Caption>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-caption_align_right');
    });

    it('should render with space', () => {
        const { getByTestId } = render(
            <Caption space="tight" dataAttrs={dataAttrs}>
                Test caption text
            </Caption>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-caption_space_tight');
    });

    it('should render with variant', () => {
        const { getByTestId } = render(
            <Caption variant="medium" dataAttrs={dataAttrs}>
                Test caption text
            </Caption>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-caption_variant_medium');
    });

    it('should render with color', () => {
        const { getByTestId } = render(
            <Caption color="green" dataAttrs={dataAttrs}>
                Test caption text
            </Caption>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-caption_color_green');
    });

    it('should render with hasMargin', () => {
        const { getByTestId } = render(<Caption dataAttrs={dataAttrs}>Test caption text</Caption>);

        expect(getByTestId('root')).toHaveClass('mfui-caption_has-margin');
    });

    it('should render with children', () => {
        const { queryByText } = render(<Caption dataAttrs={dataAttrs}>Test caption text</Caption>);

        expect(queryByText('Test caption text')).toBeInTheDocument();
    });
});
