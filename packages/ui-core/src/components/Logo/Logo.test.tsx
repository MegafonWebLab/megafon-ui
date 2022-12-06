import * as React from 'react';
import { render } from '@testing-library/react';
import Logo, { ILogoProps } from './Logo';

const dataAttrs: ILogoProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
};

describe('<Logo />', () => {
    it('should render Logo', () => {
        const { container } = render(<Logo />);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(<Logo className="custom-class" dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render with view', () => {
        const { getByTestId } = render(<Logo view="vertical" dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toHaveClass('mfui-logo_view_vertical');
    });

    it('should render with target', () => {
        const { getByTestId } = render(<Logo target="_parent" dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toHaveAttribute('target', '_parent');
    });

    it('should render with href', () => {
        const { getByTestId } = render(<Logo href="test.com" dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toHaveAttribute('href', 'test.com');
    });
});
