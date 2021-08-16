/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import { Banner } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import * as React from 'react';

type BannerBoxProps = React.ComponentProps<typeof Banner>;

const cn = cnCreate('mfui-beta-banner-box');
const BannerBox: React.FC<BannerBoxProps> = ({ children, ...props }) => (
    <div className={cn()}>
        <Banner {...props}>{children}</Banner>
    </div>
);

export default BannerBox;
