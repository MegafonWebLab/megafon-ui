import * as React from 'react';
import { cnCreate, filterDataAttrs, IFilterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './TextWithIconItem.less';

export interface ITextWithIconItem extends IFilterDataAttrs {
    /** Текст */
    text: string;
    /** Иконка */
    icon: React.ReactNode;
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительный класс для корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-text-with-icon-item');
const TextWithIconItem: React.FC<ITextWithIconItem> = ({ text, icon, rootRef, dataAttrs, className }) => (
    <div className={cn([className])} ref={rootRef} {...filterDataAttrs(dataAttrs)}>
        <div className={cn('svg-icon')}>{icon}</div>
        <div className={cn('text')}>{text}</div>
    </div>
);

TextWithIconItem.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    className: PropTypes.string,
};

export default TextWithIconItem;
