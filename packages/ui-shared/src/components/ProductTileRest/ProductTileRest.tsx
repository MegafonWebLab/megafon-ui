import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from '@megafon/ui-core/dist/utils/cn';
import './ProductTileRest.less';
import Header from '@megafon/ui-core/dist/components/Header/Header';
import TextLink from '@megafon/ui-core/dist/components/TextLink/TextLink';
import Button, { IButtonProps } from '@megafon/ui-core/dist/components/Button/Button';
import DropdownSocialList from '@megafon/ui-core/dist/components/DropdownSocialList/DropdownSocialList';

const LinkTargetType = PropTypes.oneOf(['_self', '_blank', '_parent', '_top']);
export type TLinkTargetType = '_self' | '_blank' | '_parent' | '_top';

interface IProductTileRestProps {
    className?: string;
    title: string;
    description: string;
    shopTag: string;

    link: string;
    linkTarget?: TLinkTargetType;
    moreLinkText: string;
    showMoreLink: boolean;

    buyLink: string;
    buyLinkTarget?: TLinkTargetType;
    buyButtonText: string;
    showBuyButton: boolean;

    // @ts-ignore
    buttonBorder?: IButtonProps['border'];
    // @ts-ignore
    buttonFontColor?: IButtonProps['fontColor'];
    // @ts-ignore
    buttonPassiveColor?: IButtonProps['passiveColor'];

    connectLink: string;
    connectLinkTarget?: TLinkTargetType;
    connectButtonText: string;
    showConnectButton: boolean;

    payment: any;
    packs: any;
    firstParams: any;
    secondParams: any;
    info: any;
    isActive?: boolean;
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
        linkTarget: LinkTargetType,
        moreLinkText: PropTypes.string,
        showMoreLink: PropTypes.bool,
        buyLink: PropTypes.string,
        buyLinkTarget: LinkTargetType,
        buyButtonText: PropTypes.string,
        showBuyButton: PropTypes.bool,
        connectLink: PropTypes.string,
        connectLinkTarget: LinkTargetType,
        connectButtonText: PropTypes.string,
        showConnectButton: PropTypes.bool,
        buttonBorder: Button.propTypes.border,
        buttonFontColor: Button.propTypes.fontColor,
        buttonPassiveColor: Button.propTypes.passiveColor,
        payment: PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string.isRequired,
            unitExtra: PropTypes.string,
            unitValue: PropTypes.string,
            discount: PropTypes.string,
        }).isRequired,
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
        isActive: PropTypes.bool,
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
        linkTarget: '_self',
        buyLinkTarget: '_self',
        connectLinkTarget: '_self',
    };

    handleClickConnect = (e: React.SyntheticEvent<EventTarget>) => {
        const { info, shopTag, onClickConnect } = this.props;

        onClickConnect && onClickConnect({ ...info, shopTag }, e);
    }

    handleClickBuy = (e: React.SyntheticEvent<EventTarget>) => {
        const { info, shopTag, onClickBuy, payment: { value, discount, unitValue, unitExtra } } = this.props;
        const priceValue: string = discount || value;

        onClickBuy && onClickBuy({ ...info, shopTag, price: priceValue, unitValue, unitExtra }, e);
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
                            <div className={cn('option-title')} dangerouslySetInnerHTML={{ __html: title }} />
                            <div className={cn('option-description')}>{`${value} ${unit}`}</div>
                        </div>
                    );
                })}
            </div>
        );
    }

    renderShowcase() {
        const {
            payment: { title, value, unitExtra, unitValue, discount },
            packs,
        } = this.props;

        return (
            <React.Fragment>
                <div className={cn('price', { discount: !!discount })}>
                    <div className={cn('old-price-wrapper')}>
                        <div className={cn('old-price')}>{`${value} ${unitValue}`}</div>
                    </div>
                    <div className={cn('actual-price')}>{`${discount || value} ${unitValue} ${unitExtra}`}</div>
                    <div className={cn('discount-condition')}>{title}</div>
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
            buttonBorder,
            buttonFontColor,
            buttonPassiveColor,
            isActive,
            className,
            linkTarget,
            buyLinkTarget,
            connectLinkTarget,
        } = this.props;

        return (
            <div className={cn('', { active: isActive }, className)}>
                <div className={cn('info')}>
                    <Header className={cn('header')} as="h3">{title}</Header>
                    {showMoreLink &&
                        <TextLink
                            className={cn('detail-link')}
                            href={link}
                            target={linkTarget}
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
                            target={buyLinkTarget}
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
                            target={connectLinkTarget}
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
