import * as React from 'react';
import * as PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import convert from 'htmr';
import { cnCreate, detectTouch } from '@megafon/ui-helpers';
import './Table.less';
import { ITableRow } from './TableRow';

export interface ITable {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Фиксация первой колонки */
    fixColumn?: boolean;
    /** Минимальный размер ячеек */
    minCellSize?: 'small' | 'large';
    children: Array<React.ReactElement<ITableRow>>;
}

const cn = cnCreate('mfui-beta-table');
const Table: React.FC<ITable> = ({
    className,
    fixColumn = true,
    minCellSize = 'large',
    children,
}) => {
    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    const [isTopShadow, setTopShadow] = React.useState(false);
    const [isLeftShadow, setLeftShadow] = React.useState(false);
    const [isRightGradient, setRightGradient] = React.useState(false);
    const [isBottomGradient, setBottomGradient] = React.useState(false);
    const [isTouchDevice, setTouchDevice] = React.useState(false);

    const handleTableScroll = React.useCallback(() => {
        const { current: scrollNode } = scrollRef;

        if (!scrollNode) {
            return;
        }

        const {
            scrollHeight,
            clientHeight,
            scrollTop,
            scrollWidth,
            clientWidth,
            scrollLeft,
        } = scrollNode;

        const deltaHeight = scrollHeight - clientHeight;
        const deltaWidth = scrollWidth - clientWidth;

        setRightGradient(deltaWidth !== Math.floor(scrollLeft));
        setBottomGradient(deltaHeight !== Math.floor(scrollTop));
        setTopShadow(!!scrollTop);
        setLeftShadow(!!scrollLeft);
    }, []);

    React.useEffect(() => {
        const handleResize = throttle(handleTableScroll, 300);

        handleTableScroll();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleTableScroll]);

    React.useEffect(() => {
        setTouchDevice(detectTouch());
    }, []);

    const renderRows = () =>
        React.Children.map(children, ({ props: { children: cells, head } }) => (
            <tr className={cn('row', { head })}>
                {React.Children.map(cells, ({ props: { children: cell } }) => (
                    <td className={cn('cell')}>
                        {typeof cell === 'string' ? convert(cell) : cell}
                    </td>
                ))}
            </tr>
        ));

    return (
        <div
            className={cn(
                {
                    'fix-column': fixColumn,
                    'min-cell-size': minCellSize,
                    touch: isTouchDevice,
                },
                [className]
            )}
        >
            <div
                className={cn('scroll')}
                ref={scrollRef}
                onScroll={handleTableScroll}
            >
                {isTopShadow && <div className={cn('top-shadow')} />}
                {isLeftShadow && <div className={cn('left-shadow')} />}
                <table className={cn('table')}>
                    <tbody>{renderRows()}</tbody>
                </table>
                {isRightGradient && <div className={cn('right-gradient')} />}
                {isBottomGradient && <div className={cn('bottom-gradient')} />}
            </div>
        </div>
    );
};

Table.propTypes = {
    className: PropTypes.string,
    fixColumn: PropTypes.bool,
    minCellSize: PropTypes.oneOf(['small', 'large']),
    children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default Table;
