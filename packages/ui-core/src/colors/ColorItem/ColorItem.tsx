import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';

import './ColorItem.less';

type Props = {
    colorCode: string;
    colorName: string;
    parentColorCode?: string;
    gradient?: string;
    border?: string;
    className?: string;
};

const cn = cnCreate('color-item');
const ColorItem: React.FC<Props> = ({ colorCode, colorName, parentColorCode, gradient, border, className }) => (
    <div className={cn([className])}>
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
                        background: `var(--${parentColorCode})`,
                    }}
                />
            )}
        </div>
        <span className={cn('name')}>{colorName}</span>
        <span className={cn('code')}>{colorCode}</span>
    </div>
);

export default ColorItem;
