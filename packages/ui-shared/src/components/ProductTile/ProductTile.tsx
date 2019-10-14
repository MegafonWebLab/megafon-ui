import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core/src/utils/cn';
import './style/ProductTile.less';
import TextLink from '@megafon/ui-core/src/components/TextLink/TextLink';
import Hint from './ProductTileHint';
import Cashback from './ProductTileCashback';
import Static from './ProductTileStatic';
import Dynamic from './ProductTileDynamic';
import Price from './ProductTilePrice';
import Options from './ProductTileOptions';
import Buy, { IProductTileBuyProps } from './ProductTileBuy';

const LinkTargetType = PropTypes.oneOf(['_self', '_blank', '_parent', '_top']);
export type TLinkTargetType = '_self' | '_blank' | '_parent' | '_top';

export interface IOption {
    title: string;
    caption?: string;
    value?: string;
    unit?: string;
    footnote?: string;
    svgIcon?: JSX.Element;
}

export interface IPayment {
    title?: string;
    value: string;
    unitExtra: string;
    unitValue: string;
    discount?: string;
}

export interface IServicePack {
    buyLink: string;
    shopTag: string;
    calls: {
        value: number;
        unit: string;
    };
    traffic: {
        value: number;
        unit: string;
    };
    options: IOption[];
    payment: IServicePackPayment;
}

export interface IServicePackPayment {
    value: string;
    discount?: string;
}

export interface IPack {
    value: number;
    unit: string;
    title: string;
    isDelim: boolean;
}

export interface ICashback {
    title: string;
    value: number;
    unit: string;
}

export interface IFirstParam {
    items: IOption[];
}

export interface ISwitcher {
    calls: string[];
    traffic: string[];
}

export interface IDefaultInfo {
    defaultCallsValue: number;
    defaultTrafficValue: number;
    defaultPayment?: IServicePackPayment;
    defaultBuyLink: string;
}

export interface IProductTileProps {
    /** Class name */
    className?: string;
    /** Tile */
    title: string;
    /** Top badge title */
    topBadgeTitle?: string;
    /** Top badge link href */
    topBadgeLink?: string;
    /** Top badge link target */
    topBadgeLinkTarget?: TLinkTargetType;
    /** Second params head */
    secondParamsHead?: string;
    /** Shop tag */
    shopTag?: string;
    /** Start calls index */
    startCallsIndex?: number;
    /** Start traffic index */
    startTrafficIndex?: number;
    /** Cookie calls index */
    cookieCallsIndex?: number;
    /** Cookie traffic index */
    cookieTrafficIndex?: number;

    /** More link */
    link?: string;
    /** link target */
    linkTarget?: TLinkTargetType;
    /** More link text */
    moreLinkText?: string;
    /** Show more link */
    showMoreLink?: boolean;

    /** Buy link */
    buyLink?: string;
    /** Buy link target */
    buyLinkTarget?: TLinkTargetType;
    /** Use pack buy link */
    usePackBuyLink?: boolean;
    /** Buy button text */
    buyButtonText?: string;
    /** Show buy button */
    showBuyButton?: boolean;
    /** button border */
    buttonBorder?: IProductTileBuyProps['buttonBorder'];
    /** button font color */
    buttonFontColor?: IProductTileBuyProps['buttonFontColor'];
    /** button background color */
    buttonPassiveColor?: IProductTileBuyProps['buttonPassiveColor'];

    /** Connect link */
    connectLink?: string;
    /** Connect link target */
    connectLinkTarget?: TLinkTargetType;
    /** Connect button text */
    connectButtonText?: string;
    /** Show connect button */
    showConnectButton?: boolean;

    /** Payment */
    payment: IPayment;
    /** Packs */
    packs?: IPack[];
    /** Second params */
    secondParams: IOption[];
    /** Cashback */
    cashback: ICashback;
    /** First params */
    firstParams: IFirstParam;
    /** Service packs */
    servicePacks: Array<Partial<IServicePack>>;
    /** Info - object type - return with onClickConnect, onClickBuy */
    info: {};
    /** isAtive */
    isActive?: boolean;

    /** Connect handler */
    onClickConnect?(info: {}, e: React.SyntheticEvent<EventTarget>): void;
    /** Buy handler */
    onClickBuy?(info: {}, e: React.SyntheticEvent<EventTarget>): void;
    /** More handler */
    onClickMore?(info: {}, e: React.SyntheticEvent<EventTarget>): void;
    /** Bubble handler */
    onClickBubble?(info: {}): void;
    /** Calls change callback  */
    onCallsChange?(index: number): void;
    /** Traffic change callback */
    onTrafficChange?(index: number): void;
}

interface IProductTileState {
    switcher: ISwitcher;
    currentPack: Partial<IServicePack>;
    callsValue: number;
    trafficValue: number;
    callsIndex: number;
    trafficIndex: number;
    price: string;
    discount: string;
    options: IOption[];
    buyLink: string;
}

const cn = cnCreate('mfui-product-tile');
class ProductTile extends React.Component<IProductTileProps, IProductTileState> {
    static propTypes = {
        title: PropTypes.string.isRequired,
        topBadgeTitle: PropTypes.string,
        topBadgeLink: PropTypes.string,
        topBadgeLinkTarget: LinkTargetType,
        secondParamsHead: PropTypes.string,
        shopTag: PropTypes.string,
        startCallsIndex: PropTypes.number,
        startTrafficIndex: PropTypes.number,
        cookieCallsIndex: PropTypes.number,
        cookieTrafficIndex: PropTypes.number,
        link: PropTypes.string,
        linkTarget: LinkTargetType,
        moreLinkText: PropTypes.string,
        showMoreLink: PropTypes.bool,
        buyLink: PropTypes.string,
        buyLinkTarget: LinkTargetType,
        usePackBuyLink: PropTypes.bool,
        buyButtonText: PropTypes.string,
        buttonBorder: Buy.propTypes.buttonBorder,
        buttonFontColor: Buy.propTypes.buttonFontColor,
        buttonPassiveColor: Buy.propTypes.buttonPassiveColor,
        showBuyButton: PropTypes.bool,
        connectLink: PropTypes.string,
        connectLinkTarget: LinkTargetType,
        connectButtonText: PropTypes.string,
        showConnectButton: PropTypes.bool,
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
        })),
        secondParams: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            footnote: PropTypes.string,
            value: PropTypes.string,
            unit: PropTypes.string,
            svgIcon: PropTypes.element,
        })).isRequired,
        cashback: PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.number,
            unit: PropTypes.string,
        }).isRequired,
        firstParams: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string,
                caption: PropTypes.string,
                svgIcon: PropTypes.element,
            })),
        }).isRequired,
        servicePacks: PropTypes.arrayOf(PropTypes.shape({
            buyLink: PropTypes.string,
            calls: PropTypes.shape({
                value: PropTypes.number,
                unit: PropTypes.string,
            }),
            traffic: PropTypes.shape({
                value: PropTypes.number,
                unit: PropTypes.string,
            }),
            options: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string,
                caption: PropTypes.string,
                value: PropTypes.string,
                unit: PropTypes.string,
                footnote: PropTypes.string,
                svgIcon: PropTypes.element,
            })),
            payment: PropTypes.shape({
                value: PropTypes.string.isRequired,
                discount: PropTypes.string,
            }),
        })),
        info: PropTypes.object,
        isActive: PropTypes.bool,
        onClickConnect: PropTypes.func,
        onClickBuy: PropTypes.func,
        onClickMore: PropTypes.func,
        onClickBubble: PropTypes.func,
        onCallsChange: PropTypes.func,
        onTrafficChange: PropTypes.func,
    };

    static defaultProps: Partial<IProductTileProps> = {
        moreLinkText: 'Подробнее',
        showMoreLink: true,
        servicePacks: [],
        info: {},
        startCallsIndex: 0,
        startTrafficIndex: 0,
        usePackBuyLink: true,
        linkTarget: '_self',
    };

    defaultInfo: IDefaultInfo | object;

    constructor(props: IProductTileProps) {
        super(props);

        const {
            usePackBuyLink,
            servicePacks,
            payment: { value, discount },
            buyLink: defaultBuyLink,
            secondParams,
            startCallsIndex,
            startTrafficIndex,
            cookieCallsIndex,
            cookieTrafficIndex,
        } = props;

        const switcher = this.getSwitcherValues();

        const defaultCallsValue = Number(switcher.calls[startCallsIndex!]);
        const defaultTrafficValue = Number(switcher.traffic[startTrafficIndex!]);

        const currentCallsIndex = Number.isInteger(cookieCallsIndex!)
            ? cookieCallsIndex
            : startCallsIndex;
        const currentCallsValue = Number(switcher.calls[currentCallsIndex!]);

        const currentTrafficIndex = Number.isInteger(cookieTrafficIndex!)
            ? cookieTrafficIndex
            : startTrafficIndex;
        const currentTrafficValue = Number(switcher.traffic[currentTrafficIndex!]);

        const currentPack = this.getCurrentPack(currentCallsValue, currentTrafficValue);

        const { payment, options, buyLink = '', shopTag = '' } = currentPack;
        const defaultValues = {
            defaultCallsValue,
            defaultTrafficValue,
            defaultPayment: payment,
            defaultBuyLink: buyLink,
        };

        this.defaultInfo = servicePacks.length ? defaultValues : {};
        this.state = {
            switcher,
            currentPack,
            callsValue: currentCallsValue,
            callsIndex: currentCallsIndex!,
            trafficValue: currentTrafficValue,
            trafficIndex: currentTrafficIndex!,
            price: payment && payment.value || value,
            discount: payment && payment.discount || discount || '',
            options: options || secondParams,
            buyLink: usePackBuyLink && buyLink || this.formHashLink(defaultBuyLink || '', shopTag) || '',
        };
    }

    getTariffInfo = () => {
        const {
            info,
            shopTag,
            payment: { unitValue, unitExtra },
        } = this.props;
        const {
            currentPack: { calls, traffic, shopTag: packShopTag },
            price,
            discount,
        } = this.state;
        const callsValue = calls ? calls.value : 0;
        const trafficValue = traffic ? traffic.value : 0;
        const currentShopTag = packShopTag || shopTag || '';
        const priceValue = discount ? discount : price;

        return {
            ...info,
            callsValue,
            trafficValue,
            shopTag: currentShopTag,
            price: priceValue,
            unitValue,
            unitExtra,
            ...this.defaultInfo,
        };
    }

    handleClickConnect = (e: React.SyntheticEvent<EventTarget>) => {
        const { onClickConnect } = this.props;

        onClickConnect && onClickConnect(this.getTariffInfo(), e);
    }

    handleClickBuy = (e: React.SyntheticEvent<EventTarget>) => {
        const { onClickBuy } = this.props;

        onClickBuy && onClickBuy(this.getTariffInfo(), e);
    }

    handleClickMore = (e: React.SyntheticEvent<EventTarget>) => {
        const { onClickMore } = this.props;

        onClickMore && onClickMore(this.getTariffInfo(), e);
    }

    handleClickBubble = () => {
        const { onClickBubble } = this.props;

        onClickBubble && onClickBubble(this.getTariffInfo());
    }

    handleChangeCalls = (_e: React.SyntheticEvent<EventTarget>, value: string, index: number): boolean => {
        const currentValue = Number(value);
        const { onCallsChange } = this.props;
        const { trafficValue } = this.state;
        const currentPack = this.getCurrentPack(currentValue, trafficValue);

        if (Object.keys(currentPack).length === 0) {
            return false;
        }

        onCallsChange && onCallsChange(index);

        this.setState({
            ...this.getRestState(currentPack),
            callsValue: currentValue,
            callsIndex: index,
        });

        return true;
    }

    handleChangeTraffic = (_e: React.SyntheticEvent<EventTarget>, value: string, index: number): boolean => {
        const currentValue = Number(value);
        const { onTrafficChange } = this.props;
        const { callsValue } = this.state;
        const currentPack = this.getCurrentPack(callsValue, currentValue);

        if (Object.keys(currentPack).length === 0) {
            return false;
        }

        onTrafficChange && onTrafficChange(index);

        this.setState({
            ...this.getRestState(currentPack),
            trafficValue: currentValue,
            trafficIndex: index,
        });

        return true;
    }

    getRestState(currentPack: Partial<IServicePack>): object {
        const { buyLink = '', usePackBuyLink } = this.props;
        const { shopTag = '' } = currentPack;

        return {
            currentPack,
            price: currentPack.payment && currentPack.payment.value || '',
            discount: currentPack.payment && currentPack.payment.discount || '',
            options: currentPack.options || [],
            buyLink: usePackBuyLink && currentPack.buyLink || this.formHashLink(buyLink, shopTag) || '',
        };
    }

    getCurrentPack(callsValue: number, trafficValue: number): Partial<IServicePack> {
        const { servicePacks } = this.props;
        const [currentPack = {}] = servicePacks!.filter(pack => (
            pack.calls!.value === callsValue && pack.traffic!.value === trafficValue
        ));

        return currentPack;
    }

    getSwitcherValues() {
        const { servicePacks } = this.props;
        const calls = {};
        const traffic = {};

        servicePacks!.forEach(items => {
            calls[String(items.calls!.value)] = true;
            traffic[String(items.traffic!.value)] = true;
        });

        return {
            calls: Object.keys(calls).sort((a, b) => Number(a) - Number(b)),
            traffic: Object.keys(traffic).sort((a, b) => Number(a) - Number(b)),
        };
    }

    renderStatic() {
        const { packs } = this.props;

        if (!packs) {
            return null;
        }

        return <Static packs={packs} />;
    }

    renderDynamic() {
        const {
            switcher,
            currentPack,
            callsIndex,
            trafficIndex,
        } = this.state;

        return (
            <Dynamic
                startCallsIndex={callsIndex!}
                startTrafficIndex={trafficIndex!}
                currentPack={currentPack}
                switcher={switcher}
                onChangeCalls={this.handleChangeCalls}
                onChangeTraffic={this.handleChangeTraffic}
            />
        );
    }

    renderTitle() {
        const { title, link, linkTarget } = this.props;

        return (
            <h2 className={cn('title')}>
                <TextLink
                    className={cn('title-link')}
                    href={link}
                    target={linkTarget}
                    underlineStyle="none"
                    color="black"
                    onClick={this.handleClickMore}
                >
                    {title}
                </TextLink>
            </h2>
        );
    }

    renderLink() {
        const { link = '', showMoreLink, moreLinkText, linkTarget } = this.props;

        if (!showMoreLink || !moreLinkText) {
            return null;
        }
        const { currentPack: { shopTag = '' } } = this.state;
        const linkWithHash = this.formHashLink(link, shopTag);

        return (
            <div className={cn('link-wrapper')}>
                <TextLink
                    className={cn('detail-link')}
                    href={linkWithHash}
                    target={linkTarget}
                    onClick={this.handleClickMore}
                >
                    {moreLinkText}
                </TextLink>
            </div>
        );
    }

    formHashLink(link: string, shopTag: string) {
        return !shopTag ? link : `${link}#${shopTag}`;
    }

    render() {
        const {
            servicePacks,
            cashback,
            firstParams,
            className,
            buyButtonText,
            connectButtonText,
            topBadgeTitle,
            topBadgeLink,
            secondParamsHead,
            showConnectButton,
            showBuyButton,
            buttonBorder,
            buttonFontColor,
            buttonPassiveColor,
            connectLink,
            topBadgeLinkTarget,
            buyLinkTarget,
            connectLinkTarget,
            isActive,
            payment: { title, unitExtra, unitValue },
        } = this.props;
        const { price, discount, options, buyLink } = this.state;
        const isServicePacks = !!servicePacks!.length;

        return (
            <div className={cn('', { constructor: isServicePacks, active: isActive }, className)}>
                {isServicePacks && !!topBadgeTitle &&
                    <Hint title={topBadgeTitle} linkHref={topBadgeLink} linkTarget={topBadgeLinkTarget} />
                }
                <div className={cn('content')}>
                    {this.renderTitle()}
                    {this.renderLink()}
                    <Cashback {...cashback} />
                    <Price
                        title={title}
                        value={price}
                        discount={discount}
                        unitExtra={unitExtra}
                        unitValue={unitValue}
                    />
                    <div className={cn('constructor')}>
                        {isServicePacks ? this.renderDynamic() : this.renderStatic()}
                        <Options options={firstParams.items} />
                    </div>
                    <Options options={options} head={secondParamsHead} onClickBubble={this.handleClickBubble} />
                </div>
                <Buy
                    buyLink={buyLink}
                    buyLinkTarget={buyLinkTarget}
                    connectLink={connectLink}
                    connectLinkTarget={connectLinkTarget}
                    buyButtonText={buyButtonText}
                    connectButtonText={connectButtonText}
                    showBuyButton={showBuyButton}
                    showConnectButton={showConnectButton}
                    buttonBorder={buttonBorder}
                    buttonFontColor={buttonFontColor}
                    buttonPassiveColor={buttonPassiveColor}
                    onClickBuy={this.handleClickBuy}
                    onClickConnect={this.handleClickConnect}
                />
            </div>
        );
    }
}

export default ProductTile;
