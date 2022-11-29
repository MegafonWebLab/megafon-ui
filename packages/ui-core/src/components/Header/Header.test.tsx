import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Header, { IHeaderProps } from './Header';

const dataAttrs: IHeaderProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
};

describe('<Header />', () => {
    it('should render Header', () => {
        const { container } = render(<Header addition={<div>addition</div>}>Title</Header>);

        expect(container).toMatchSnapshot();
    });

    it('should render with as', () => {
        const { getByTestId } = render(
            <Header as="h3" dataAttrs={dataAttrs}>
                Title
            </Header>,
        );

        expect(getByTestId('root').tagName).toBe('H3');
    });

    it('should render with space when as is h5', () => {
        const { getByTestId } = render(
            <Header space="tight" as="h5" dataAttrs={dataAttrs}>
                Title
            </Header>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-header_space_tight');
    });

    it('should render without space when as is not h5', () => {
        const { getByTestId } = render(
            <Header space="tight" as="h3" dataAttrs={dataAttrs}>
                Title
            </Header>,
        );

        expect(getByTestId('root')).not.toHaveClass('mfui-header_space_tight');
    });

    it('should render with color', () => {
        const { getByTestId } = render(
            <Header color="green" dataAttrs={dataAttrs}>
                Title
            </Header>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-header_color_green');
    });

    it('should render with margin', () => {
        const { getByTestId } = render(
            <Header margin dataAttrs={dataAttrs}>
                Title
            </Header>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-header_margin');
    });

    it('should render with align', () => {
        const { getByTestId } = render(
            <Header align="center" dataAttrs={dataAttrs}>
                Title
            </Header>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-header_h-align_center');
    });

    it('should render with addition', () => {
        const { getByTestId } = render(<Header addition={<div data-testid="addition" />}>Title</Header>);

        expect(getByTestId('addition')).toBeInTheDocument();
    });

    it('should call onClick', () => {
        const onClickMock = jest.fn();
        const { getByTestId } = render(
            <Header onClick={onClickMock} dataAttrs={dataAttrs}>
                Title
            </Header>,
        );

        fireEvent.click(getByTestId('root'));

        expect(onClickMock).toBeCalled();
    });
});
