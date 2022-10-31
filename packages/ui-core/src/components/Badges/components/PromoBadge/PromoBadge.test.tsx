import * as React from 'react';
import { render } from '@testing-library/react';
import PromoBadge, { IPromoBadgeProps } from './PromoBadge';

const dataAttrs: IPromoBadgeProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
};

describe('<PromoBadge />', () => {
    it('should render PromoBadge', () => {
        const { container } = render(<PromoBadge>text</PromoBadge>);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <PromoBadge className="custom-class" dataAttrs={dataAttrs}>
                text
            </PromoBadge>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(<PromoBadge dataAttrs={dataAttrs}>text</PromoBadge>);

        expect(queryByTestId('root')).toBeTruthy();
    });

    it('should render with type different from default', () => {
        const { queryByTestId } = render(
            <PromoBadge dataAttrs={dataAttrs} type="vip">
                text
            </PromoBadge>,
        );

        expect(queryByTestId('root')).toHaveClass('mfui-promo-badge_type_vip');
    });
});
