import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './InputLabel.less';

interface IInputLabelProps {
    htmlFor?: string;
    children: React.ReactNode;
}

const cn = cnCreate('mfui-input-label');
const InputLabel: React.FC<IInputLabelProps> = ({htmlFor, children}: IInputLabelProps) => (
    <label htmlFor={htmlFor} className={cn('')}>
        {children}
    </label>
);

InputLabel.propTypes = {
    children: PropTypes.node,
    htmlFor: PropTypes.string,
};

export default InputLabel;
