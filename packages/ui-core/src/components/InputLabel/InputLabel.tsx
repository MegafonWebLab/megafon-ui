import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './InputLabel.less';
import Paragraph from '../Paragraph/Paragraph';

export interface IInputLabelProps {
    htmlFor?: string;
    children: React.ReactNode;
}

const cn = cnCreate('mfui-input-label');
class InputLabel extends React.Component<IInputLabelProps> {
    static propTypes = {
        children: PropTypes.node,
        htmlFor: PropTypes.string,
    };

    render() {
        const { htmlFor, children } = this.props;

        return (
            <label htmlFor={htmlFor} className={cn('')}>
                <Paragraph as="div" weight="medium">{children}</Paragraph>
            </label>
        );
    }
}

export default InputLabel;
