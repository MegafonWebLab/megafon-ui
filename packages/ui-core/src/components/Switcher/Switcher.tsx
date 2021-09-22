import * as React from 'react';
import { cnCreate, detectTouch } from '@megafon/ui-helpers';
import './Switcher.less';

export interface ISwitcherProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Управление состоянием вкл/выкл компонента */
    checked?: boolean;
    /** Управление возможностью взаимодействия с компонентом */
    disabled?: boolean;
    /** Обработчик изменения элемента */
    onChange?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const cn = cnCreate('mfui-beta-switcher');
const Switcher: React.FC<ISwitcherProps> = props => {
    const { className, checked = false, disabled = false, onChange } = props;

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
                className,
            )}
            onClick={handleChange}
        >
            <div className={cn('pointer')} />
        </div>
    );
};

export default Switcher;
