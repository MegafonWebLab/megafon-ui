/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { cnCreate, detectTouch } from '@megafon/ui-helpers';
import * as React from 'react';
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

const cn: (param1?: Record<string, unknown> | string, param2?: string) => string = cnCreate('mfui-beta-switcher');
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
