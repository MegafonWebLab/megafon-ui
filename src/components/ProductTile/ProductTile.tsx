import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTile.less';
import TextLink from '../TextLink/TextLink';
import Hint from './ProductTileHint';
import Buy from './ProductTileBuy';
import Cashback from './ProductTileCashback';
import Static from './ProductTileStatic';
import Dynamic from './ProductTileDynamic';
import Price from './ProductTilePrice';
import Options from './ProductTileOptions';

export interface IOption {
    title: string;
    caption?: string;
    value?: number;
    unit?: string;
    footnote?: string;
    svgIcon?: JSX.Element;
}

export interface IPayment {
    value: number;
    unitExtra: string;
    unitValue: string;
    unit?: string;
    discount: number;
}

export interface IServicePack {
    buyLink: string;
    calls: {
        value: number;
        unit: string;
    };
    traffic: {
        value: number;
        unit: string;
    };
    options: IOption[];
    payment: IPayment;
}

export interface IPack {
    value: number;
    unit: string;
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

interface IProductTileProps {
    /** Class name */
    className?: string;
    /** Tile */
    title: string;
    /** Top badge title */
    topBadgeTitle?: string;
    /** Second params head */
    secondParamsHead?: string;
    /** Link */
    link: string;
    /** Buy link */
    buyLink: string;
    /** Buy button text */
    buyButtonText: string;
    /** Connect button text */
    connectButtonText: string;
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
    info?: {};
    /** Connect handler */
    onClickConnect?(info: {}): void;
    /** Buy handler */
    onClickBuy?(info: {}): void;
    /** More handler */
    onClickMore?(info: {}): void;
    /** Bubble handler */
    onClickBubble?(info: {}): void;
}

interface IProductTileState {
    switcher: ISwitcher;
    currentPack: Partial<IServicePack>;
    callsValue: number;
    trafficValue: number;
    payment: IPayment;
    options: IOption[];
    buyLink: string;
}

const cn = cnCreate('mfui-product-tile');
class ProductTile extends React.Component<IProductTileProps, IProductTileState> {
    static propTypes = {
        title: PropTypes.string.isRequired,
        topBadgeTitle: PropTypes.string,
        secondParamsHead: PropTypes.string,
        link: PropTypes.string.isRequired,
        buyLink: PropTypes.string.isRequired,
        payment: PropTypes.shape({
            value: PropTypes.number,
            unitExtra: PropTypes.string,
            unitValue: PropTypes.string,
            unit: PropTypes.string,
            discount: PropTypes.number,
        }).isRequired,
        packs: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number,
            unit: PropTypes.string,
        })),
        secondParams: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            footnote: PropTypes.string,
            value: PropTypes.number,
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
                value: PropTypes.number,
                unit: PropTypes.string,
                footnote: PropTypes.string,
                svgIcon: PropTypes.element,
            })),
            payment: PropTypes.shape({
                value: PropTypes.number,
                unitExtra: PropTypes.string,
                unitValue: PropTypes.string,
                discount: PropTypes.number,
            }),
        })),
        info: PropTypes.object,
        onClickConnect: PropTypes.func,
    };

    static defaultProps: Pick<IProductTileProps, 'servicePacks'> = {
        servicePacks: [],
    };

    constructor(props: IProductTileProps) {
        super(props);

        const switcher = this.getSwitcherValues();
        const [ firstCallsValue ] = switcher.calls;
        const [ firstTrafficValue ] = switcher.traffic;
        const firstCallsValueNum = Number(firstCallsValue);
        const firstTrafficValueNum = Number(firstTrafficValue);
        const currentPack = this.getCurrentPack(firstCallsValueNum, firstTrafficValueNum);
        const isServicePacks = !!props.servicePacks!.length;

        this.state = {
            switcher,
            currentPack,
            callsValue: firstCallsValueNum,
            trafficValue: firstTrafficValueNum,
            payment: isServicePacks ? currentPack.payment! : props.payment,
            options: isServicePacks ? currentPack.options! : props.secondParams,
            buyLink: isServicePacks ? props.buyLink + currentPack.buyLink! : props.buyLink,
        };
    }

    handleClickConnect = () => {
        const { onClickConnect, info } = this.props;
        const { currentPack: { calls, traffic } } = this.state;
        const callsValue = calls ? calls.value : 0;
        const trafficValue = traffic ? traffic.value : 0;

        onClickConnect && onClickConnect({ ...info!, callsValue, trafficValue });
    }

    handleClickBuy = () => {
        const { onClickBuy, info } = this.props;
        const { currentPack: { calls, traffic } } = this.state;
        const callsValue = calls ? calls.value : 0;
        const trafficValue = traffic ? traffic.value : 0;

        onClickBuy && onClickBuy({ ...info!, callsValue, trafficValue });
    }

    handleClickMore = () => {
        const { onClickMore, info } = this.props;

        onClickMore && onClickMore({ ...info! });
    }

    handleClickBubble = () => {
        const { onClickBubble, info } = this.props;

        onClickBubble && onClickBubble({ ...info! });
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
        const { buyLink } = this.props;

        return {
            currentPack,
            payment: currentPack.payment!,
            options: currentPack.options!,
            buyLink: buyLink + currentPack.buyLink!,
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

        return (
            <Dynamic
                currentPack={currentPack}
                switcher={switcher}
                onChangeCalls={this.handleChangeCalls}
                onChangeTraffic={this.handleChangeTraffic}
            />
        );
    }

    renderLink() {
        const { link } = this.props;

        return (
            <div className={cn('link-wrapper')}>
                <TextLink className={cn('detail-link')} href={link} onClick={this.handleClickMore}>
                    Подробнее
                </TextLink>
            </div>
        );
    }

    render() {
        const {
            servicePacks,
            title,
            cashback,
            firstParams,
            className,
            buyButtonText,
            connectButtonText,
            topBadgeTitle,
            secondParamsHead,
        } = this.props;
        const { payment, options, buyLink } = this.state;
        const isServicePacks = !!servicePacks!.length;

        return (
            <div className={cn('', { constructor: isServicePacks }, className)}>
                {isServicePacks && !!topBadgeTitle && <Hint title={topBadgeTitle}/>}
                <div className={cn('content')}>
                    <h2 className={cn('title')}>{title}</h2>
                    {this.renderLink()}
                    <Cashback {...cashback} />
                    <Price {...payment}/>
                    <div className={cn('constructor')}>
                        {isServicePacks ? this.renderDynamic() : this.renderStatic()}
                        <Options options={firstParams.items} />
                    </div>
                    <Options options={options} head={secondParamsHead} onClickBubble={this.handleClickBubble}/>
                </div>
                <Buy
                    href={buyLink}
                    buyText={buyButtonText}
                    connectText={connectButtonText}
                    onClickBuy={this.handleClickBuy}
                    onClickConnect={this.handleClickConnect}
                />
            </div>
        );
    }
}

export default ProductTile;
