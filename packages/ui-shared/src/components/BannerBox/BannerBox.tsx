import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Banner } from '@megafon/ui-core';

export const NavTheme = {
    LIGHT: 'light',
    GREEN: 'green',
    DARK: 'dark',
} as const;

type BannerBoxProps = React.ComponentProps<typeof Banner>;

const cn = cnCreate('mfui-beta-banner-box');
const BannerBox: React.FC<BannerBoxProps> = ({children, ...props }) => (
    <div className={cn()}>
        <Banner {...props}>{children}</Banner>
    </div>
);

BannerBox.propTypes = {
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoPlayDelay: PropTypes.number,
    navTheme: PropTypes.oneOf(Object.values(NavTheme)),
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onDotClick: PropTypes.func,
    onChange: PropTypes.func,
};

export default BannerBox;
