import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core';
import './TextBox.less';

export interface ITextBoxProps {
    /** Центрирование текста по горизонтали */
    textCenter?: boolean;
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительный класс для корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-beta-text-box');
const TextBox: React.FC<ITextBoxProps> = ({
    textCenter = false,
    rootRef,
    className,
    children,
}) => (
    <div className={cn({ 'text-center': textCenter }, [className])} ref={rootRef}>{children}</div>
);

TextBox.propTypes = {
    textCenter: PropTypes.bool,
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    className: PropTypes.string,
};

export default TextBox;
