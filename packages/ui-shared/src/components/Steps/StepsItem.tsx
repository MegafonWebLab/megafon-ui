import React from 'react';
import PropTypes from 'prop-types';
import { cnCreate, convert, Paragraph, TextLink } from '@megafon/ui-core';
import './StepsItem.less';

const convertConfig = {
    a: {
        component: TextLink,
        props: ['href', 'target'],
    },
    b: {
        component: ({ children }) => <b>{children}</b>,
    },
};

interface IStepsItem {
    /** Номер элемента */
    index: number;
    /** Текст */
    text: string;
}

const cn = cnCreate('mfui-beta-steps-item');
const StepsItem: React.FC<IStepsItem> = ({ index, text }) => (
    <div className={cn()}>
        <span className={cn('step-number')}>
            {index}
        </span>
        <div className={cn('text-wrapper')}>
            <Paragraph hasMargin={false}>{convert(text, convertConfig)}</Paragraph>
        </div>
    </div>
);

StepsItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
};

export default StepsItem;
