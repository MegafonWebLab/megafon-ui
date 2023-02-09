import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Tile, { ITileProps, Theme, Radius, ShadowLevel } from './Tile';

const props: ITileProps = {
    href: '/link',
    target: '_blank',
    theme: Theme.DARK,
    onClick: jest.fn(),
    isInteractive: true,
    radius: Radius.ROUNDED,
    className: 'test-class',
    rel: 'noopener noreferrer',
    shadowLevel: ShadowLevel.PRESSED,
    dataAttrs: { root: { 'data-testid': 'root' } },
};

describe('<Tile />', () => {
    it('should render', () => {
        const { container } = render(<Tile>Content</Tile>);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <Tile className={props.className} dataAttrs={props.dataAttrs}>
                Content
            </Tile>,
        );

        expect(getByTestId('root')).toHaveClass(props.className as string);
    });

    it('should render with props of tag <a>', () => {
        const { getByText } = render(
            <Tile rel={props.rel} href={props.href} target={props.target}>
                Content
            </Tile>,
        );
        const link = getByText('Content');

        expect(link).toMatchSnapshot();
        expect(link).toHaveAttribute('rel', props.rel);
        expect(link).toHaveAttribute('href', props.href);
        expect(link).toHaveAttribute('target', props.target);
    });

    it('should render with theme', () => {
        const { getByTestId } = render(
            <Tile theme={props.theme} dataAttrs={props.dataAttrs}>
                Content
            </Tile>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-tile_theme_dark');
    });

    it('should render with radius', () => {
        const { getByTestId } = render(
            <Tile radius={props.radius} dataAttrs={props.dataAttrs}>
                Content
            </Tile>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-tile_radius_rounded');
    });

    it('should render with isInteractive', () => {
        const { getByTestId } = render(
            <Tile isInteractive={props.isInteractive} dataAttrs={props.dataAttrs}>
                Content
            </Tile>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-tile_interactive');
    });

    it('should render with shadowLevel', () => {
        const { getByTestId } = render(
            <Tile shadowLevel={props.shadowLevel} dataAttrs={props.dataAttrs}>
                Content
            </Tile>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-tile_shadow_pressed');
    });

    it('should call onClick', () => {
        const mockOnClick = jest.fn();
        const { getByTestId } = render(
            <Tile onClick={mockOnClick} dataAttrs={props.dataAttrs}>
                Content
            </Tile>,
        );

        fireEvent.click(getByTestId('root'));
        expect(mockOnClick).toBeCalled();
    });
});
