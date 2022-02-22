import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './TextWithIconItem.less';

export interface ITextWithIconItem {
    /** Текст */
    text: string | string[];
    /** Иконка */
    icon: React.ReactNode;
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    /** Дополнительный класс для корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-text-with-icon-item');
const TextWithIconItem: React.FC<ITextWithIconItem> = ({ text, icon, rootRef, dataAttrs, className }) => (
    <div className={cn([className])} ref={rootRef} {...filterDataAttrs(dataAttrs?.root)}>
        <div className={cn('svg-icon')}>{icon}</div>
        <div className={cn('text')}>{text}</div>
    </div>
);

TextWithIconItem.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.arrayOf(PropTypes.string.isRequired)]).isRequired,
    icon: PropTypes.node.isRequired,
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
};

export default TextWithIconItem;
