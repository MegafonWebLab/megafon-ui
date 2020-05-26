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
    isChecked?: boolean;
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
        isChecked: PropTypes.bool,
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

    handleChange = () => {
        const { onChange, value } = this.props;

        onChange && onChange(value);
    }

    render() {
        const { isChecked, isDisabled, name, value, textSize, children } = this.props;
        const inputDynamicProps = isChecked !== undefined ? {checked: isChecked} : {};

        return (
            <div className={cn('')}>
                <label
                    className={cn('label', {
                        disabled: isDisabled,
                    })}
                >
                    <input
                        {...inputDynamicProps}
                        className={cn('input')}
                        type="radio"
                        name={name}
                        value={value}
                        onChange={this.handleChange}
                        disabled={isDisabled}
                    />
                    <div className={cn('custom-input')} />
                    {children && <div className={cn('text', { 'size': textSize})}>{this.props.children}</div>}
                </label>
            </div>
        );
    }
}

export default RadioButton;
