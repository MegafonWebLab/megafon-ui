import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core';
import './TextBox.less';

export interface ITextBoxProps {
    /** Центрирование текста по горизонтали */
    textCenter?: boolean;
}

const cn = cnCreate('mfui-beta-text-box');
const TextBox: React.FC<ITextBoxProps> = ({ textCenter = false, children }) => (
    <div className={cn({ 'text-center': textCenter })}>{children}</div>
);

TextBox.propTypes = {
    textCenter: PropTypes.bool,
};

export default TextBox;
