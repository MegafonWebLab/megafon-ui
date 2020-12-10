import * as React from 'react';
import { cnCreate, Banner } from '@megafon/ui-core';

type BannerBoxProps = React.ComponentProps<typeof Banner>;

const cn = cnCreate('mfui-beta-banner-box');
const BannerBox: React.FC<BannerBoxProps> = ({ children, ...props }) => (
    <div className={cn()}>
        <Banner {...props}>{children}</Banner>
    </div>
);

export default BannerBox;
