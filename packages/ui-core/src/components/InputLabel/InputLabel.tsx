import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from 'utils/cn';
import './InputLabel.less';
import Paragraph from 'components/Paragraph/Paragraph';

const cn = cnCreate('mfui-input-label');
class InputLabel extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
        id: PropTypes.string,
    };

    render() {
        const { id, children } = this.props;

        return (
            <label htmlFor={id} className={cn('')}>
                <Paragraph as="div" weight="medium">{children}</Paragraph>
            </label>
        );
    }
}

export default InputLabel;
