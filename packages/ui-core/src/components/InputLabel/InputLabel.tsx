import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from 'utils/cn';
import './InputLabel.less';
import Paragraph from 'components/Paragraph/Paragraph';

const cn = cnCreate('mfui-input-label');
class InputLabel extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        id: PropTypes.string,
    };

    render() {
        const { id, label } = this.props;

        return (
            <label htmlFor={id} className={cn('')}>
                <Paragraph weight="medium" marginAll="none">{label}</Paragraph>
            </label>
        );
    }
}

export default InputLabel;
