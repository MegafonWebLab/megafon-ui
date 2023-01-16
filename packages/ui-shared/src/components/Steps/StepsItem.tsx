import React from 'react';
import { Paragraph } from '@megafon/ui-core';
import { cnCreate, convert, textConvertConfig } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';

import './StepsItem.less';

interface IStepsItem {
    /** Номер элемента */
    index: number;
    /** Текст */
    text: string | React.ReactNode[];
}

const cn = cnCreate('mfui-steps-item');
const StepsItem: React.FC<IStepsItem> = ({ index, text }) => (
    <div className={cn()}>
        <span className={cn('step-number')}>{index}</span>
        <div className={cn('text-wrapper')}>
            <Paragraph hasMargin={false}>
                {typeof text === 'string' ? convert(text, textConvertConfig) : text}
            </Paragraph>
        </div>
    </div>
);

StepsItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default StepsItem;
