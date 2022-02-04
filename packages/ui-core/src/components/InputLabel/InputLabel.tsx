import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './InputLabel.less';

export interface IInputLabelProps {
    htmlFor?: string;
    dataAttrs?: {
        root?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-input-label');
const InputLabel: React.FC<IInputLabelProps> = ({ htmlFor, dataAttrs, children }) => (
    <label {...filterDataAttrs(dataAttrs?.root)} htmlFor={htmlFor} className={cn()}>
        {children}
    </label>
);

InputLabel.propTypes = {
    htmlFor: PropTypes.string,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default InputLabel;
