import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';

import './ColorsItem.less';

type Props = {
    colorCode: string;
    colorName: string;
    parentColorCode?: string;
    gradient?: string;
    border?: string;
};

const cn = cnCreate('colors-item');
const ColorsItem: React.FC<Props> = ({ colorCode, colorName, parentColorCode, gradient, border }) => (
    <div className={cn()}>
        <div className={cn('container')}>
            <div
                className={cn('color')}
                style={{
                    background: !gradient ? colorCode : gradient,
                    border,
                }}
            />
            {!!parentColorCode && (
                <div
                    className={cn('parent-color')}
                    style={{
                        background: parentColorCode,
                    }}
                />
            )}
        </div>
        <span className={cn('name')}>{colorName}</span>
        <span className={cn('code')}>{colorCode}</span>
    </div>
);

export default ColorsItem;
