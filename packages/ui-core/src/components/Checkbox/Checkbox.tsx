import * as PropTypes from 'prop-types';
import * as React from 'react';
import cnCreate from 'utils/cn';
import './Checkbox.less';
import CheckedIcon from 'icons/System/16/Checked_16.svg';
import detectTouch from 'utils/detectTouch';

export interface ICheckboxProps {
    /** Color scheme */
    color?: 'dark' | 'light';
    /** Custom classname */
    className?: string;
    /** Font size */
    fontSize?: 'regular' | 'small';
    /** Checkbox name */
    name?: string;
    /** Checkbox value */
    value?: string;
    /** Checked */
    checked?: boolean;
    /** Disabled */
    disabled?: boolean;
    /** Error */
    error?: boolean;
    /** Extra content */
    extraContent?: JSX.Element[] | Element[] | JSX.Element | Element | string;
    children: JSX.Element[] | Element[] | JSX.Element | Element | string;
    /** onChange handler */
    onChange?(e: React.SyntheticEvent<EventTarget>): void;
}

const cn = cnCreate('mfui-checkbox');
class Checkbox extends React.Component<ICheckboxProps, {}> {
    static propTypes = {
        className: PropTypes.string,
        fontSize: PropTypes.oneOf(['regular', 'small']),
        color: PropTypes.oneOf(['dark', 'light']),
        name: PropTypes.string,
        value: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        error: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
        ]),
        extraContent: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
        ]),
        onChange: PropTypes.func,
    };

    static defaultProps: Partial<ICheckboxProps> = {
        color: 'dark',
        fontSize: 'regular',
        checked: false,
    };

    isTouch: boolean = detectTouch();

    handleChange = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onChange } = this.props;
        onChange && onChange(e);
    }

    render() {
        const {
            className,
            fontSize,
            name,
            color,
            value,
            checked,
            disabled,
            error,
            children,
            extraContent,
        } = this.props;

        return (
            <div
                className={cn(
                    '',
                    {
                        'font-size': fontSize,
                        color,
                        checked,
                        disabled,
                        error,
                    },
                    className
                )}
            >
                <div className={cn('inner')}>
                    <label className={cn('label', { 'no-touch': !this.isTouch })}>
                        <input
                            className={cn('input')}
                            type="checkbox"
                            name={name}
                            value={value}
                            checked={checked}
                            onChange={this.handleChange}
                            disabled={disabled}
                        />
                        <div className={cn('custom-input')}>
                            <CheckedIcon className={cn('icon')} />
                        </div>
                        {children}
                    </label>
                    {extraContent && <span className={cn('extra-content')}>{extraContent}</span>}
                </div>
            </div>
        );
    }
}

export default Checkbox;
