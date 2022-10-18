import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tile, { ITileProps, Theme, Radius, Shadow } from './Tile';

const props: ITileProps = {
    className: 'test-class',
    href: 'test-link',
    theme: Theme.DARK,
    radius: Radius.ROUNDED,
    shadowLevel: Shadow.HIGH,
    isInteractive: true,
    onClick: jest.fn(),
    target: '_blank',
};

describe('<Tile />', () => {
    describe('snapshots', () => {
        it('renders component', () => {
            const { container } = render(<Tile>Some test content</Tile>);

            expect(container).toMatchSnapshot();
        });

        it('renders component with props', () => {
            const { container } = render(<Tile {...props}>Some test content</Tile>);

            expect(container).toMatchSnapshot();
        });

        it('it renders with data attributes', () => {
            const { container } = render(
                <Tile dataAttrs={{ root: { 'data-test': 'test', 'incorrect-attr': 'test' } }} />,
            );

            expect(container).toMatchSnapshot();
        });
    });

    describe('handlers', () => {
        it('calls onClick', () => {
            const handleClick = jest.fn();

            const { container } = render(<Tile onClick={handleClick}>Some test content</Tile>);

            fireEvent.click(container.firstElementChild as Element);

            expect(handleClick).toBeCalled();
        });
    });
});
