// eslint-disable-next-line import/no-unresolved
import { cnCreate, filterDataAttrs, IFilterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './Header.less';

interface IHeaderProps extends IFilterDataAttrs {
    /** Тег */
    as?: 'h1' | 'h2' | 'h3' | 'h5';
    /** Цвет */
    color?: 'black' | 'white' | 'green' | 'purple' | 'blue' | 'inherit';
    /** Включить отступ */
    margin?: boolean;
    /** Дополнительный элемент */
    addition?: JSX.Element;
    /** Дополнительный класс корневого элемента */
    className?: string | string[];
    /** Горизонтальное выравнивание */
    hAlign?: 'inherit' | 'left' | 'center' | 'right';
    /** Обработчик клика */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}
const cn: (param1?: Record<string, unknown> | string, param2?: string | undefined | string[]) => string =
    cnCreate('mfui-beta-header');
class Header extends React.Component<IHeaderProps, Record<string, never>> {
    static propTypes = {
        as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h5']),
        color: PropTypes.oneOf(['black', 'white', 'green', 'purple', 'blue', 'inherit']),
        margin: PropTypes.bool,
        addition: PropTypes.element,
        hAlign: PropTypes.oneOf(['inherit', 'left', 'center', 'right']),
        dataAttrs: PropTypes.objectOf(PropTypes.string),
        onClick: PropTypes.func,
        children: PropTypes.node,
    };

    static defaultProps: Partial<IHeaderProps> = {
        as: 'h1',
        color: 'black',
        hAlign: 'inherit',
    };

    renderAddition(): JSX.Element {
        const { addition } = this.props;

        return <div className={cn('addition')}>{addition}</div>;
    }

    render(): JSX.Element {
        const { color, margin, as: level, hAlign, onClick, dataAttrs, className, children, addition } = this.props;
        const ElementType = level as React.ElementType;

        return (
            <ElementType
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...filterDataAttrs(dataAttrs)}
                className={cn({ color, margin, level, 'h-align': hAlign }, className)}
                onClick={onClick}
            >
                {children}
                {addition && this.renderAddition()}
            </ElementType>
        );
    }
}

export default Header;
