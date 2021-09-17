import * as React from 'react';
import './Colors.less';
import Header from 'components/Header/Header';
import Paragraph from 'components/Paragraph/Paragraph';
import { cnCreate } from '@megafon/ui-helpers';
import colors from './colorsData';

const cn = cnCreate('colors');
const Colors = () => (
    <div className={cn()}>
        <Header>Colors</Header>
        <div className={cn('inner')}>
            {colors.map(({ title, items }, i) => (
                <div key={i + title} className={cn('section')}>
                    <Header as="h3" className={cn('title')}>
                        {title}
                    </Header>
                    {items.map(({ name, value }, index) => (
                        <div key={index + name} className={cn('item', { border: value === '#FFFFFF' })}>
                            <div className={cn('color')} style={{ backgroundColor: `${value}` }} />
                            <div className={cn('text-box')}>
                                <Header as="h5">{name}</Header>
                                <Paragraph size="small" hasMargin={false} className={cn('hex-code')}>
                                    {value}
                                </Paragraph>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default Colors;
