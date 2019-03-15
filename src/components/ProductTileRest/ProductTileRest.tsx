import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductTileRest.less';
import Header from '../Header/Header';
import TextLink from '../TextLink/TextLink';
import Button, { IButtonProps } from '../Button/Button';
import DropdownSocialList from '../DropdownSocialList/DropdownSocialList';

interface IProductTileRestProps {
    title: string;
    description: string;
    shopTag: string;

    link: string;
    moreLinkText: string;
    showMoreLink: boolean;

    buyLink: string;
    buyButtonText: string;
    showBuyButton: boolean;
    /** button border */
    buttonBorder?: IButtonProps['border'];
    /** button font color */
    buttonFontColor?: IButtonProps['fontColor'];
    /** button background color */
    buttonPassiveColor?: IButtonProps['passiveColor'];

    connectLink: string;
    connectButtonText: string;
    showConnectButton: boolean;
    isBuyable: boolean;

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
        description: PropTypes.string,
        shopTag: PropTypes.string,
        link: PropTypes.string,
        moreLinkText: PropTypes.string,
        showMoreLink: PropTypes.bool,
        isBuyable: PropTypes.bool,
        buyLink: PropTypes.string,
        buyButtonText: PropTypes.string,
        showBuyButton: PropTypes.bool,
        connectLink: PropTypes.string,
        connectButtonText: PropTypes.string,
        showConnectButton: PropTypes.bool,
        buttonBorder: Button.propTypes.border,
        buttonFontColor: Button.propTypes.fontColor,
        buttonPassiveColor: Button.propTypes.passiveColor,
        payment: PropTypes.shape({
            value: PropTypes.string.isRequired,
            unitExtra: PropTypes.string,
            unitValue: PropTypes.string,
            discount: PropTypes.string,
        }),
        packs: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number,
            unit: PropTypes.string,
            title: PropTypes.string,
            isDelim: PropTypes.bool,
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

    static defaultProps = {
        moreLinkText: 'Подробнее',
        showMoreLink: true,
        buyButtonText: 'Купить',
        showBuyButton: true,
        connectButtonText: 'Перейти на тариф',
        showConnectButton: true,
        shopTag: '',
    };

    handleClickConnect = (e: React.SyntheticEvent<EventTarget>) => {
        const { info, shopTag, onClickConnect } = this.props;

        onClickConnect && onClickConnect({ ...info, shopTag }, e);
    }

    handleClickBuy = (e: React.SyntheticEvent<EventTarget>) => {
        const { info, shopTag, onClickBuy } = this.props;

        onClickBuy && onClickBuy({ ...info, shopTag }, e);
    }

    handleClickMore = (e: React.SyntheticEvent<EventTarget>) => {
        const { info, shopTag, onClickMore } = this.props;

        onClickMore && onClickMore({ ...info, shopTag }, e);
    }

    renderIcons() {
        const { firstParams: { title, caption, items } } = this.props;

        return (
            <div className={cn('messangers')}>
                {!!items.length &&
                    <div className={cn('messangers-list')}>
                        <DropdownSocialList
                            icons={items}
                            maxIconNumber={4}
                            className={cn('options-list')}
                        />
                    </div>
                }
                {title &&
                    <div className={cn('messangers-description')}>
                        {title}<br /> {caption}
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
            payment: { value, unitExtra, unitValue, discount },
            packs,
        } =  this.props;

        return (
            <React.Fragment>
                <div className={cn('price', { discount: !!discount })}>
                    <div className={cn('discount-condition')}>При покупке новой SIM–карты</div>
                    <div className={cn('old-price-wrapper')}>
                        <div className={cn('old-price')}>{`${value} ${unitValue}`}</div>
                    </div>
                    <div className={cn('actual-price')}>{`${discount || value} ${unitValue} ${unitExtra}`}</div>
                </div>
                {packs.map((param, index) => {
                    const {
                        value: paramValue,
                        unit: paramUnit,
                        title: paramTitle,
                        isDelim,
                    } = param;

                    return (
                        <div
                            className={cn('pack')}
                            key={paramValue + paramUnit + index}
                        >
                            {isDelim ? paramTitle : `${paramValue} ${paramUnit}`}
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }

    render() {
        const {
            title,
            description,
            link,
            showMoreLink,
            moreLinkText,
            connectLink,
            connectButtonText,
            showConnectButton,
            buyLink,
            showBuyButton,
            buyButtonText,
<<<<<<< HEAD
            buttonBorder,
            buttonFontColor,
            buttonPassiveColor,
=======
            isBuyable,
>>>>>>> 5583 fixed a lot of bugs of showcase
        } = this.props;
        const buyButtonColor = isBuyable ? 'green' : 'transparent-green';

        return (
            <div className={cn('')}>
                <div className={cn('info')}>
                    <Header className={cn('header')} as="h3">{title}</Header>
                    {showMoreLink &&
                        <TextLink
                            className={cn('detail-link')}
                            href={link}
                            target="_blank"
                            onClick={this.handleClickMore}
                        >
                            {moreLinkText}
                        </TextLink>
                    }
                    {this.renderShowcase()}
                    {this.renderIcons()}
                    {this.renderOptions()}
                    {description && <div className={cn('description')}>{description}</div>}
                </div>
                <div className={cn('buy')}>
                    {showBuyButton &&
                        <Button
                            className={cn('buy-button', { 'additional-margin': !showConnectButton })}
                            passiveColor={buttonPassiveColor}
                            border={buttonBorder}
                            fontColor={buttonFontColor}
                            hoverColor="green"
                            sizeAll="medium"
                            href={buyLink}
                            onClick={this.handleClickBuy}
                        >
                            {buyButtonText}
                        </Button>
                    }
                    {showConnectButton &&
                        <TextLink
                            className={cn('detail-link')}
                            href={connectLink}
                            onClick={this.handleClickConnect}
                            target="_blank"
                        >
                            {connectButtonText}
                        </TextLink>
                    }
                </div>
            </div>
        );
    }
}

export default ProductTileRest;
