import * as React from 'react';
import cnCreate from 'utils/cnCreate';
import './Switcher.less';
import detectTouch from 'utils/detectTouch';

interface ISwitcherProps {
    /** Custom classname */
    className?: string;
    /** Checked */
    checked?: boolean;
    /** Disabled */
    disabled?: boolean;
    /** onChange handler */
    onChange?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-switcher');
const Switcher: React.FC<ISwitcherProps> = props => {
    const {
        className,
        checked = false,
        disabled = false,
        onChange,
    } = props;

    const isTouch: boolean = detectTouch();

    const handleChange = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (disabled) {
            return;
        }

        onChange && onChange(e);
    };

    return (
        <div
            className={cn(
                {
                    checked,
                    disabled,
                    'no-touch': !isTouch,
                },
                className
            )}
            onClick={handleChange}
        >
            <div className={cn('pointer')} />
        </div>
    );
};

export default Switcher;
