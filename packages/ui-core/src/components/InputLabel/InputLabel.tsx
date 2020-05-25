import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './InputLabel.less';

interface IInputLabelProps {
    htmlFor?: string;
}

const cn = cnCreate('mfui-input-label');
const InputLabel: React.FC<IInputLabelProps> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className={cn()}>
        {children}
    </label>
);

InputLabel.propTypes = {
    htmlFor: PropTypes.string,
};

export default InputLabel;
