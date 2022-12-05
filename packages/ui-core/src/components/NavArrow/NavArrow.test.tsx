import * as React from 'react';
import { render } from '@testing-library/react';
import NavArrow, { INavArrowProps } from './NavArrow';

const dataAttrs: INavArrowProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
    prevArrow: {
        'data-testid': 'prevArrow',
    },
    nextArrow: {
        'data-testid': 'nextArrow',
    },
};

describe('<NavArrow />', () => {
    it('should render NavArrow', () => {
        const { container } = render(<NavArrow />);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(<NavArrow className="custom-class" dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render when view is prev', () => {
        const { getByTestId } = render(<NavArrow view="prev" dataAttrs={dataAttrs} />);

        expect(getByTestId('prevArrow')).toBeInTheDocument();
    });

    it('should render when view is next', () => {
        const { getByTestId } = render(<NavArrow view="next" dataAttrs={dataAttrs} />);

        expect(getByTestId('nextArrow')).toBeInTheDocument();
    });

    it('should render with theme', () => {
        const { getByTestId } = render(<NavArrow theme="dark" dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toHaveClass('mfui-nav-arrow_theme_dark');
    });

    it('should render when disabled is true', () => {
        const { getByTestId } = render(<NavArrow disabled dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toHaveAttribute('disabled');
    });
});
