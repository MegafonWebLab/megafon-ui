import * as React from 'react';
import cnCreate from 'utils/cn';
import './Switcher.less';
import detectTouch from 'utils/detectTouch';

interface ISwitcherProps {
    /** Checked */
    checked?: boolean;
    /** Disabled */
    disabled?: boolean;
    /** onChange handler */
    onChange?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-switcher');
const Switcher: React.FC<ISwitcherProps> = ({ checked = false, disabled = false, onChange}) => {
    const isTouch: boolean = detectTouch();

    const handleChange = (e: React.SyntheticEvent<EventTarget>): void => {
        if (disabled) {
            return;
        }

        onChange && onChange(e);
    };

    return (
        <div
            className={cn(
                '',
                {
                    checked,
                    disabled,
                    'no-touch': !isTouch,
                }
            )}
            onClick={handleChange}
        >
            <div className={cn('pointer')} />
        </div>
    );
};

export default Switcher;
