import * as React from 'react';
import { cnCreate, Paragraph, convert, TextLink, Header } from '@megafon/ui-core';
import './Steps.less';

const convertConfig = {
    a: {
        component: TextLink,
        props: ['href', 'target'],
    },
    b: {
        component: ({ children }) => <b>{children}</b>,
    },
};

export type ItemType = {
    text: string;
};

export interface ISteps {
    /** Заголовок */
    title: string;
    /** Данные для списка шагов */
    items: ItemType[];
}

const cn = cnCreate('mfui-beta-steps');
const Steps: React.FC<ISteps> = ({ items, title }) => (
    <div className={cn()}>
        <Header as="h2" hAlign="center" className={cn('title')}>{title}</Header>
        <ul className={cn('list')}>
            {items.map(({ text }, index) => (
                <li key={index} className={cn('item')}>
                    <span className={cn('step-number')}>
                        {index + 1}
                    </span>
                    <div className={cn('text-wrapper')}>
                        <Paragraph hasMargin={false}>{convert(text, convertConfig)}</Paragraph>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default Steps;
