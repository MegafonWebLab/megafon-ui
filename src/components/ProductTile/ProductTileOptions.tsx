import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTileOptions.less';
import BubbleHint from '../BubbleHint/BubbleHint';
import { IOption } from './ProductTile';

interface IProductTileOptionsProps {
    /** Has head */
    head?: boolean;
    /** Options */
    options: Array<Partial<IOption>>;
    /** Handle bubble */
    onClickBubble?(): void;
}

const cn = cnCreate('mfui-product-tile-options');
class ProductTileOptions extends React.Component<IProductTileOptionsProps, {}> {
    static propTypes = {
        head: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            caption: PropTypes.stirng,
            value: PropTypes.number,
            unit: PropTypes.string,
            footnote: PropTypes.string,
            svgIcon: PropTypes.element,
        })),
        onClickBubble: PropTypes.func,
    };

    renderFootnote(title: string, footnote: string): JSX.Element {
        const { onClickBubble } = this.props;

        return (
            <div className={cn('title')}>
                {title}
                <BubbleHint
                    className={cn('cashback-c')}
                    popupWidth="small"
                    placement="bottom"
                    click
                    trigger={<span className={cn('bubble-trigger')} onClick={onClickBubble}>Подробнее</span>}
                >
                    <div
                        className={cn('hint-text')}
                        dangerouslySetInnerHTML={{ __html: footnote }}
                    />
                </BubbleHint>
            </div>
        );
    }

    renderContent(title: string, caption: string, value: number, unit: string): JSX.Element {
        return (
            <div className={cn('content')}>
                <div className={cn('title')}>
                    {title}
                </div>
                <div className={cn('description')}>
                    {caption ? caption : `${value} ${unit}`}
                </div>
            </div>
        );
    }

    renderIcon(svgIcon: JSX.Element): JSX.Element {
        return (
            <div className={cn('icon')}>{svgIcon}</div>
        );
    }

    render() {
        const { options, head } = this.props;

        return (
            <div className={cn('')}>
                {head && <div className={cn('head')}>Доступные опции:</div>}
                <div className={cn('wrapper')}>
                    {options.map((option, index) => {
                        const { title, caption, value, unit, svgIcon, footnote } = option;

                        return (
                            <div className={cn('option')} key={title! + index}>
                                {this.renderIcon(svgIcon!)}
                                {footnote
                                    ? this.renderFootnote(title!, footnote)
                                    : this.renderContent(title!, caption!, value!, unit!)
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ProductTileOptions;
