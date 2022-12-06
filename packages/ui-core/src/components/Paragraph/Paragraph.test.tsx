import * as React from 'react';
import { render } from '@testing-library/react';
import Paragraph, { IParagraphProps } from './Paragraph';

const dataAttrs: IParagraphProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
};

describe('<Paragraph />', () => {
    it('should render Paragraph', () => {
        const { container } = render(<Paragraph>Text</Paragraph>);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <Paragraph className="custom-calss" dataAttrs={dataAttrs}>
                Text
            </Paragraph>,
        );

        expect(getByTestId('root')).toMatchSnapshot();
    });

    it('should render with align', () => {
        const { getByTestId } = render(
            <Paragraph align="center" dataAttrs={dataAttrs}>
                Text
            </Paragraph>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-paragraph_align_center');
    });

    it('should render with space', () => {
        const { getByTestId } = render(
            <Paragraph space="tight" dataAttrs={dataAttrs}>
                Text
            </Paragraph>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-paragraph_space_tight');
    });

    it('should render when hasMargin is true', () => {
        const { getByTestId } = render(
            <Paragraph hasMargin dataAttrs={dataAttrs}>
                Text
            </Paragraph>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-paragraph_has-margin');
    });

    it('should render with color', () => {
        const { getByTestId } = render(
            <Paragraph color="purple" dataAttrs={dataAttrs}>
                Text
            </Paragraph>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-paragraph_color_purple');
    });

    it('should render with children', () => {
        const { queryByText } = render(
            <Paragraph color="purple" dataAttrs={dataAttrs}>
                Text
            </Paragraph>,
        );

        expect(queryByText('Text')).toBeInTheDocument();
    });
});
