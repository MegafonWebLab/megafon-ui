import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, BubbleHint } from '@megafon/ui-core';
import './style/ProductTileOptions.less';
import { IOption } from './ProductTile';

export interface IProductTileOptionsProps {
    /** Has head */
    head?: string;
    /** Options */
    options: IOption[];
    /** Handle bubble */
    onClickBubble?: () => void;
}

const cn = cnCreate('mfui-beta-product-tile-options');
class ProductTileOptions extends React.Component<IProductTileOptionsProps> {
    static propTypes = {
        head: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            caption: PropTypes.string,
            value: PropTypes.string,
            unit: PropTypes.string,
            footnote: PropTypes.string,
            svgIcon: PropTypes.element,
        })),
        onClickBubble: PropTypes.func,
    };

    renderFootnote(title: string, footnote: string): JSX.Element {
        const { onClickBubble } = this.props;

        return (
            <div className={cn('content')}>
                <div className={cn('title')} dangerouslySetInnerHTML={{ __html: title }} />
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

    renderContent(title: string, caption: string = '', value: string = '', unit: string = ''): JSX.Element {
        return (
            <div className={cn('content')}>
                <div className={cn('title')} dangerouslySetInnerHTML={{ __html: title }} />
                <div className={cn('description')}>
                    {caption || `${value} ${unit}`}
                </div>
            </div>
        );
    }

    renderIcon(svgIcon: JSX.Element | null = null): JSX.Element {
        return (
            <div className={cn('icon')}>{svgIcon}</div>
        );
    }

    render() {
        const { options, head } = this.props;

        return (
            <div className={cn('')}>
                {!!head && <div className={cn('head')}>{head}</div>}
                <div className={cn('wrapper')}>
                    {options.map((option, index) => {
                        const { title, caption, value, unit, svgIcon, footnote } = option;

                        return (
                            <div className={cn('option')} key={title + index}>
                                {this.renderIcon(svgIcon)}
                                {footnote
                                    ? this.renderFootnote(title, footnote)
                                    : this.renderContent(title, caption, value, unit)
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
