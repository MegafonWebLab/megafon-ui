import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductTileRest.less';
import Header from '../Header/Header';
import TextLink from '../TextLink/TextLink';
import Button from '../Button/Button';

interface IProductTileRestProps {
    title: string;
    link: string;
    description: string;
    buyLink: string;
    payment: any;
    packs: any;
    firstParams: any;
    secondParams: any;
    info: any;
    onClickConnect: any;
    onClickBuy: any;
    onClickMore: any;
}

const cn = cnCreate('mfui-product-tile-rest');
class ProductTileRest extends React.Component<IProductTileRestProps> {
    static propTypes = {
        title: PropTypes.string,
        link: PropTypes.string,
        description: PropTypes.string,
        buyLink: PropTypes.string,
        payment: PropTypes.shape({
            value: PropTypes.number,
            unit: PropTypes.string,
        }),
        packs: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number,
            unit: PropTypes.string,
        })),
        firstParams: PropTypes.shape({
            title: PropTypes.string,
            caption: PropTypes.string,
            icons: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string,
                svgIcon: PropTypes.element,
            })),
        }),
        secondParams: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string,
            unit: PropTypes.string,
        })),
        info: PropTypes.object,
        onClickConnect: PropTypes.func,
        onClickBuy: PropTypes.func,
        onClickMore: PropTypes.func,
    };

    handleClickConnect = () => {
        const { info, onClickConnect } = this.props;

        onClickConnect && onClickConnect(info);
    }

    handleClickBuy = () => {
        const { info, onClickBuy } = this.props;

        onClickBuy && onClickBuy(info);
    }

    handleClickMore = () => {
        const { info, onClickMore } = this.props;

        onClickMore && onClickMore(info);
    }

    renderIcons() {
        const { firstParams: { title, items } } = this.props;

        return (
            <div className={cn('messangers')}>
                {!!items.length &&
                    <div className={cn('messangers-list')}>
                        {items.map((icon, index) => {
                            const { iconTitle, svgIcon } = icon;

                            return (
                                <div
                                    className={cn('reward-icon')}
                                    key={iconTitle + svgIcon + index}
                                >
                                    {svgIcon}
                                </div>
                            );
                        })}
                    </div>
                }
                {title &&
                    <div className={cn('messangers-description')}>
                        {title}
                    </div>
                }
            </div>
        );
    }

    renderOptions() {
        const { secondParams } = this.props;

        if (!secondParams.length) {
            return null;
        }

        return (
            <div className={cn('options')}>
                {secondParams.map((param, index) => {
                    const { title, value, unit } = param;

                    return (
                        <div className={cn('option')} key={title + index}>
                            <div className={cn('option-title')}>{title}</div>
                            <div className={cn('option-description')}>{`${value} ${unit}`}</div>
                        </div>
                    );
                })}
            </div>
        );
    }

    renderShowcase() {
        const {
            payment: { value, unit },
            packs,
        } =  this.props;

        return (
            <React.Fragment>
                {(value || value === 0) && <div className={cn('price')}>{`${value} ${unit}`}</div>}
                {packs.map((param, index) => {
                    const { value: paramValue, unit: paramUnit } = param;

                    return (
                        <div
                            className={cn('pack')}
                            key={paramValue + paramUnit + index}
                        >
                            {`${paramValue} ${paramUnit}`}
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }

    render() {
        const { title, link, buyLink, description } = this.props;

        return (
            <div className={cn('')}>
                <div className={cn('info')}>
                    <Header className={cn('header')} as="h3">{title}</Header>
                    <TextLink className={cn('detail-link')} href={link} onClick={this.handleClickMore}>
                        Подробнее
                    </TextLink>
                    {this.renderShowcase()}
                    {this.renderIcons()}
                    {this.renderOptions()}
                    {description && <div className={cn('description')}>{description}</div>}
                </div>
                <div className={cn('buy')}>
                    <Button
                        className={cn('buy-button')}
                        passiveColor="green"
                        hoverColor="green"
                        sizeAll="medium"
                        href={buyLink}
                        onClick={this.handleClickBuy}
                    >
                        Купить
                    </Button>
                    <TextLink className={cn('detail-link')} onClick={this.handleClickConnect}>
                        Перейти на тариф
                    </TextLink>
                </div>
            </div>
        );
    }
}

export default ProductTileRest;
