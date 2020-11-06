import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Tooltip } from '@megafon/ui-core';
import './style/ProductTileOptions.less';
import { IOption } from './ProductTile';

export interface IProductTileOptionsProps {
    /** Заголовок */
    head?: string;
    /** Опции */
    options: IOption[];
    /** Обработчик клика по баблу */
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

    renderFootnote = (footnote: string): React.ReactNode =>  {
        const { onClickBubble } = this.props;
        const footnoteID = Math.random().toString(20).substr(2, 6);
        const triggerElement = React.createRef<HTMLDivElement>();

        return (
            <div className={cn('footnote')} key={footnoteID}>
                <div
                    className={cn('footnote-trigger')}
                    onClick={onClickBubble}
                    ref={triggerElement}
                >
                    Подробнее
                </div>
                <Tooltip
                    placement="bottom"
                    triggerEvent="click"
                    triggerElement={triggerElement}
                >
                    <div
                        className={cn('footnote-text')}
                        dangerouslySetInnerHTML={{ __html: footnote }}
                    />
                </Tooltip>
            </div>
        );
    }

    renderOption = (option: IOption, index: number): React.ReactNode => {
        const { title, caption, value, unit = '', svgIcon, footnote } = option;

        return(
            <div className={cn('option')} key={title + index}>
                {svgIcon && <div className={cn('icon')}>{svgIcon}</div>}
                <div className={cn('content')}>
                    <div className={cn('title')} dangerouslySetInnerHTML={{ __html: title }} />
                    {!footnote && (caption || value) && (
                        <div className={cn('caption')}>
                            {caption || `${value} ${unit}`}
                        </div>
                    )}
                    {footnote && this.renderFootnote(footnote)}
                </div>
            </div>
        );
    }

    render() {
        const { options, head } = this.props;

        return (
            <div className={cn('')}>
                {head && <div className={cn('head')}>{head}</div>}
                <div className={cn('wrapper')}>
                    {options.map(this.renderOption)}
                </div>
            </div>
        );
    }
}

export default ProductTileOptions;
