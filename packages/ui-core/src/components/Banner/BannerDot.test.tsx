import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BannerDot, { IBannerDotProps } from './BannerDot';

const props: IBannerDotProps = {
    className: 'custom-class',
    index: 3,
    dataAttrs: {
        root: {
            'data-testid': 'root',
        },
        svg: {
            'data-testid': 'svg',
        },
        circle: {
            'data-testid': 'circle',
        },
    },
    isActive: true,
    showTimer: true,
    timerDelay: 100,
    onClick: jest.fn(),
};

describe('<BannerDot />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render BannerDot', () => {
        const { container } = render(<BannerDot {...props} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(<BannerDot {...props} />);

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(<BannerDot {...props} />);

        expect(queryByTestId('root')).toBeTruthy();
        expect(queryByTestId('svg')).toBeTruthy();
        expect(queryByTestId('circle')).toBeTruthy();
    });

    it('should render when showTimer and isActive are true', () => {
        const { queryByTestId, getByTestId } = render(<BannerDot {...props} />);
        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-banner-dot_active');
        expect(rootNode).toHaveClass('mfui-banner-dot_timer');
        expect(queryByTestId('svg')).toBeInTheDocument();
    });

    it('should render when isActive is false', () => {
        const { queryByTestId } = render(<BannerDot {...props} isActive={false} />);

        expect(queryByTestId('svg')).not.toBeInTheDocument();
    });

    it('should render when showTimer is false', () => {
        const { queryByTestId } = render(<BannerDot {...props} showTimer={false} />);

        expect(queryByTestId('svg')).not.toBeInTheDocument();
    });

    it('should render when isActive and showTimer are false', () => {
        const { queryByTestId } = render(<BannerDot {...props} isActive={false} showTimer={false} />);

        expect(queryByTestId('svg')).not.toBeInTheDocument();
    });

    it('should render with timerDelay', () => {
        const { getByTestId } = render(<BannerDot {...props} />);

        expect(getByTestId('circle')).toHaveAttribute('style', 'animation-duration: 100s;');
    });

    it('should call onClick', () => {
        const { getByTestId } = render(<BannerDot {...props} />);

        fireEvent.click(getByTestId('root'));

        expect(props.onClick).toBeCalledWith(3);
    });
});
