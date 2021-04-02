import React from 'react';
import PropTypes from 'prop-types';
import { cnCreate, Paragraph } from '@megafon/ui-core';
import './StepsItem.less';

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
            <Paragraph hasMargin={false}>{text}</Paragraph>
        </div>
    </div>
);

StepsItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
};

export default StepsItem;
