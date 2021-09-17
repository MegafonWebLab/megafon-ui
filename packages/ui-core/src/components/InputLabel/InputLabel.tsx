import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './InputLabel.less';

export interface IInputLabelProps {
    htmlFor?: string;
}

const cn = cnCreate('mfui-beta-input-label');
const InputLabel: React.FC<IInputLabelProps> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className={cn()}>
        {children}
    </label>
);

InputLabel.propTypes = {
    htmlFor: PropTypes.string,
};

export default InputLabel;
