import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTile.less';
import TextLink from '../TextLink/TextLink';
import Hint from './ProductTileHint';
import Cashback from './ProductTileCashback';
import Static from './ProductTileStatic';
import Dynamic from './ProductTileDynamic';
import Price from './ProductTilePrice';
import Options from './ProductTileOptions';
import Buy, { IProductTileBuyProps } from './ProductTileBuy';

export interface IOption {
    title: string;
    caption?: string;
    value?: string;
    unit?: string;
    footnote?: string;
    svgIcon?: JSX.Element;
}

export interface IPayment {
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

export interface IProductTileProps {
    /** Class name */
    className?: string;
    /** Tile */
    title: string;
    /** Top badge title */
    topBadgeTitle?: string;
    /** Second params head */
    secondParamsHead?: string;
    /** Shop tag */
    shopTag?: string;
    /** Start calls index */
    startCallsIndex?: number;
    /** Start traffic index */
    startTrafficIndex?: number;

    /** More link */
    link?: string;
    /** More link text */
    moreLinkText?: string;
    /** Show more link */
    showMoreLink?: boolean;

    /** Buy link */
    buyLink?: string;
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
    servicePacks?: Array<Partial<IServicePack>>;
    /** Info - object type - return with onClickConnect, onClickBuy */
    info: {};
    /** Connect handler */
    onClickConnect?(info: {}, e: React.SyntheticEvent<EventTarget>): void;
    /** Buy handler */
    onClickBuy?(info: {}, e: React.SyntheticEvent<EventTarget>): void;
    /** More handler */
    onClickMore?(info: {}, e: React.SyntheticEvent<EventTarget>): void;
    /** Bubble handler */
    onClickBubble?(info: {}): void;
}

interface IProductTileState {
    switcher: ISwitcher;
    currentPack: Partial<IServicePack>;
    callsValue: number;
    trafficValue: number;
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
        secondParamsHead: PropTypes.string,
        shopTag: PropTypes.string,
        startCallsIndex: PropTypes.number,
        startTrafficIndex: PropTypes.number,
        link: PropTypes.string,
        moreLinkText: PropTypes.string,
        showMoreLink: PropTypes.bool,
        buyLink: PropTypes.string,
        usePackBuyLink: PropTypes.bool,
        buyButtonText: PropTypes.string,
        buttonBorder: Buy.propTypes.buttonBorder,
        buttonFontColor: Buy.propTypes.buttonFontColor,
        buttonPassiveColor: Buy.propTypes.buttonPassiveColor,
        showBuyButton: PropTypes.bool,
        connectLink: PropTypes.string,
        connectButtonText: PropTypes.string,
        showConnectButton: PropTypes.bool,
        payment: PropTypes.shape({
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
                caption: PropTypes.stirng,
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
        onClickConnect: PropTypes.func,
        onClickBuy: PropTypes.func,
        onClickMore: PropTypes.func,
        onClickBubble: PropTypes.func,
    };

    static defaultProps: Partial<IProductTileProps> = {
        moreLinkText: 'Подробнее',
        showMoreLink: true,
        servicePacks: [],
        info: {},
        startCallsIndex: 0,
        startTrafficIndex: 0,
        usePackBuyLink: true,
    };

    constructor(props: IProductTileProps) {
        super(props);

        const switcher = this.getSwitcherValues();
        const defaultCallsValue = Number(switcher.calls[props.startCallsIndex!]);
        const defaultTrafficValue = Number(switcher.traffic[props.startCallsIndex!]);
        const currentPack = this.getCurrentPack(defaultCallsValue, defaultTrafficValue);
        const { payment, options, buyLink, shopTag = '' } = currentPack;

        this.state = {
            switcher,
            currentPack,
            callsValue: defaultCallsValue,
            trafficValue: defaultTrafficValue,
            price: payment && payment.value || props.payment.value,
            discount: payment && payment.discount || props.payment.discount || '',
            options: options || props.secondParams,
            buyLink: props.usePackBuyLink && buyLink || this.formHashLink(props.buyLink, shopTag) || '',
        };
    }

    handleClickConnect = (e: React.SyntheticEvent<EventTarget>) => {
        const { onClickConnect, info } = this.props;
        const { currentPack: { calls, traffic } } = this.state;
        const callsValue = calls ? calls.value : 0;
        const trafficValue = traffic ? traffic.value : 0;

        onClickConnect && onClickConnect({ ...info, callsValue, trafficValue }, e);
    }

    handleClickBuy = (e: React.SyntheticEvent<EventTarget>) => {
        const { onClickBuy, info, shopTag } = this.props;
        const { currentPack: { calls, traffic, shopTag: packShopTag } } = this.state;
        const callsValue = calls ? calls.value : 0;
        const trafficValue = traffic ? traffic.value : 0;
        const currentShopTag = packShopTag || shopTag || '';

        onClickBuy && onClickBuy({ ...info, callsValue, trafficValue, shopTag: currentShopTag }, e);
    }

    handleClickMore = (e: React.SyntheticEvent<EventTarget>) => {
        const { onClickMore, info } = this.props;

        onClickMore && onClickMore({ ...info }, e);
    }

    handleClickBubble = () => {
        const { onClickBubble, info } = this.props;

        onClickBubble && onClickBubble({ ...info });
    }

    handleChangeCalls = (_e: React.SyntheticEvent<EventTarget>, value: string): boolean => {
        const currentValue = Number(value);
        const { trafficValue } = this.state;
        const currentPack = this.getCurrentPack(currentValue, trafficValue);

        if (Object.keys(currentPack).length === 0) {
            return false;
        }

        this.setState({
            ...this.getRestState(currentPack),
            callsValue: currentValue,
        });

        return true;
    }

    handleChangeTraffic = (_e: React.SyntheticEvent<EventTarget>, value: string): boolean => {
        const currentValue = Number(value);

        const { callsValue } = this.state;
        const currentPack = this.getCurrentPack(callsValue, currentValue);

        if (Object.keys(currentPack).length === 0) {
            return false;
        }

        this.setState({
            ...this.getRestState(currentPack),
            trafficValue: currentValue,
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
        const [ currentPack = {} ] = servicePacks!.filter(pack => (
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
        } = this.state;
        const {
            startCallsIndex,
            startTrafficIndex,
        } = this.props;

        return (
            <Dynamic
                startCallsIndex={startCallsIndex!}
                startTrafficIndex={startTrafficIndex!}
                currentPack={currentPack}
                switcher={switcher}
                onChangeCalls={this.handleChangeCalls}
                onChangeTraffic={this.handleChangeTraffic}
            />
        );
    }

    renderTitle() {
        const { title, link } = this.props;

        return (
            <h2 className={cn('title')}>
                <TextLink
                    className={cn('title-link')}
                    href={link}
                    underlineStyle="none"
                    color="black"
                    target="_blank"
                    onClick={this.handleClickMore}
                >
                    {title}
                </TextLink>
            </h2>
        );
    }

    renderLink() {
        const { link = '', showMoreLink, moreLinkText } = this.props;

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
                    target="_blank"
                    onClick={this.handleClickMore}
                >
                    {moreLinkText}
                </TextLink>
            </div>
        );
    }

    formHashLink(link: any, shopTag: string) {
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
            secondParamsHead,
            showConnectButton,
            showBuyButton,
            buttonBorder,
            buttonFontColor,
            buttonPassiveColor,
            connectLink,
            payment: { unitExtra, unitValue },
        } = this.props;
        const { price, discount, options, buyLink } = this.state;
        const isServicePacks = !!servicePacks!.length;

        return (
            <div className={cn('', { constructor: isServicePacks }, className)}>
                {isServicePacks && !!topBadgeTitle && <Hint title={topBadgeTitle}/>}
                <div className={cn('content')}>
                    {this.renderTitle()}
                    {this.renderLink()}
                    <Cashback {...cashback} />
                    <Price value={price} discount={discount} unitExtra={unitExtra} unitValue={unitValue} />
                    <div className={cn('constructor')}>
                        {isServicePacks ? this.renderDynamic() : this.renderStatic()}
                        <Options options={firstParams.items} />
                    </div>
                    <Options options={options} head={secondParamsHead} onClickBubble={this.handleClickBubble}/>
                </div>
                <Buy
                    buyLink={buyLink}
                    connectLink={connectLink}
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
