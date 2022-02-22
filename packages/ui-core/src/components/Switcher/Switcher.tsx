import * as React from 'react';
import { cnCreate, detectTouch, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Switcher.less';

export interface ISwitcherProps {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Управление состоянием вкл/выкл компонента */
    checked?: boolean;
    /** Управление возможностью взаимодействия с компонентом */
    disabled?: boolean;
    /** Обработчик изменения элемента */
    onChange?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const cn = cnCreate('mfui-switcher');
const Switcher: React.FC<ISwitcherProps> = ({ dataAttrs, className, checked = false, disabled = false, onChange }) => {
    const isTouch: boolean = detectTouch();

    const handleChange = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (disabled) {
            return;
        }

        onChange?.(e);
    };

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
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

Switcher.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Switcher;
