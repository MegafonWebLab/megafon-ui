import * as React from 'react';
import { cnCreate, convert, filterDataAttrs, textConvertConfig } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './TextWithIconItem.less';

export interface ITextWithIconItem {
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        icon?: string;
        text?: string;
    };
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
    /* @deprecated */
    /** Выравнивание по центру на мобильных */
    centeringOnMobile?: boolean;
    /** Дополнительный класс для корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-text-with-icon-item');
const TextWithIconItem: React.FC<ITextWithIconItem> = ({
    className,
    classes = {},
    text,
    icon,
    rootRef,
    dataAttrs,
    centeringOnMobile = true,
}) => {
    const renderText = React.useMemo(() => {
        if (Array.isArray(text)) {
            return text.map(item => convert(item, textConvertConfig));
        }

        return convert(text, textConvertConfig);
    }, [text]);

    return (
        <div
            className={cn({ 'centering-on-mobile': centeringOnMobile }, [className])}
            ref={rootRef}
            {...filterDataAttrs(dataAttrs?.root)}
        >
            <div className={cn('svg-icon', [classes.icon])}>{icon}</div>
            <div className={cn('text', [classes.text])}>{renderText}</div>
        </div>
    );
};

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
    centeringOnMobile: PropTypes.bool,
    className: PropTypes.string,
};

export default TextWithIconItem;
