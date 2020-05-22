import * as React from 'react';
import * as PropTypes from 'prop-types';
import './RadioButton.less';
import cnCreate from 'utils/cn';

export interface IRadioButtonProps {
    /** Radio button value */
    value: string;
    /** Radio button name */
    name?: string;
    /** Size of radio button label */
    textSize?: 'small' | 'medium';
    /** Disabled state of radio button */
    isDisabled?: boolean;
    /** Checked state of radio button */
    selectedOption?: string;
    /** Custom class name */
    className?: string;
    children?: React.ReactNode;
    /** OnChange handler */
    onChange?(value: string): void;
}

const cn = cnCreate('mfui-radio-button');
class RadioButton extends React.Component<IRadioButtonProps> {
    static propTypes = {
        textSize: PropTypes.oneOf(['small', 'medium']),
        isDisabled: PropTypes.bool,
        selectedOption: PropTypes.string,
        onChange: PropTypes.func,
        name: PropTypes.string,
        value: PropTypes.string.isRequired,
        children: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps: Partial<IRadioButtonProps> = {
        textSize: 'medium',
        isDisabled: false,
    };

    radioButton: HTMLInputElement | null;

    componentDidMount() {
        const { selectedOption, value } = this.props;

        if (!this.radioButton) {
            return;
        }

        if (this.radioButton.checked !== (selectedOption === value)) {
            this.radioButton.checked = (selectedOption === value);
        }
    }

    handleChange = () => {
        const { onChange, value } = this.props;

        onChange && onChange(value);
    }

    getInputRef = (node: HTMLInputElement | null) => {
        this.radioButton = node;
    }

    renderTextElem() {
        const { textSize } = this.props;

        return <div className={cn('text', { 'size': textSize})}>{this.props.children}</div>;
    }

    render() {
        const { selectedOption, isDisabled, name, value, children } = this.props;

        return (
            <div className={cn('')}>
                <label
                    className={cn('label', {
                        checked: selectedOption === value,
                        disabled: isDisabled,
                    })}
                >
                    <input
                        className={cn('input')}
                        type="radio"
                        name={name}
                        value={value}
                        checked={selectedOption === value}
                        onChange={this.handleChange}
                        disabled={isDisabled}
                        ref={this.getInputRef}
                    />
                    <div className={cn('custom-input')} />
                    {children && this.renderTextElem()}
                </label>
            </div>
        );
    }
}

export default RadioButton;
