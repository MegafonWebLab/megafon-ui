import * as React from 'react';
import { render } from '@testing-library/react';
import PriceBadge, { IPriceBadgeProps } from './PriceBadge';

const dataAttrs: IPriceBadgeProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
};

describe('<PriceBadge />', () => {
    it('should render PriceBadge', () => {
        const { container } = render(<PriceBadge>text</PriceBadge>);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <PriceBadge dataAttrs={dataAttrs} className="custom-class">
                text
            </PriceBadge>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(<PriceBadge dataAttrs={dataAttrs}>text</PriceBadge>);

        expect(queryByTestId('root')).toBeTruthy();
    });

    it('should render with theme different from default', () => {
        const { getByTestId } = render(
            <PriceBadge dataAttrs={dataAttrs} theme="orange">
                text
            </PriceBadge>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-price-badge_theme_orange');
    });

    it('should render when isAdaptive is true', () => {
        const { getByTestId } = render(
            <PriceBadge dataAttrs={dataAttrs} isAdaptive>
                text
            </PriceBadge>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-price-badge_adaptive');
    });

    it('should render big size badge with subTitle', () => {
        const { getByTestId, getByText } = render(
            <PriceBadge dataAttrs={dataAttrs} size="big" subTitle="subTitle">
                text
            </PriceBadge>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-price-badge_size_big');
        expect(getByText('subTitle')).toBeInTheDocument();
    });

    it('should render small size without subTitle', () => {
        const { queryByText } = render(
            <PriceBadge dataAttrs={dataAttrs} size="small" subTitle="subTitle">
                text
            </PriceBadge>,
        );

        expect(queryByText('subTitle')).toBeNull();
    });
});
