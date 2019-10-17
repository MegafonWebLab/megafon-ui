import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cn as cnCreate } from '@megafon/ui-core';
import './style/ProductTileDynamic.less';
import ProductSwitcher from '../ProductSwitcher/ProductSwitcher';
import { IServicePack, ISwitcher } from './ProductTile';
import AnimationValue from './ProductTileValue';

interface IProductTileDynamicProps {
    /** Current pack */
    currentPack: Partial<IServicePack>;
    /** Switcher */
    switcher: ISwitcher;
    /** Start calls index */
    startCallsIndex: number;
    /** Start traffic index */
    startTrafficIndex: number;
    /** Change calls */
    onChangeCalls(e: React.SyntheticEvent<EventTarget>, value: string, index: number): boolean;
    /** Change Traffic */
    onChangeTraffic(e: React.SyntheticEvent<EventTarget>, value: string, index: number): boolean;
}

const cn = cnCreate('mfui-product-tile-dynamic');
class ProductTileDynamic extends React.Component<IProductTileDynamicProps> {
    static propTypes = {
        currentPack: PropTypes.shape({
            calls: PropTypes.shape({
                value: PropTypes.number,
                unit: PropTypes.string,
            }),
            traffic: PropTypes.shape({
                value: PropTypes.number,
                unit: PropTypes.string,
            }),
        }),
        switcher: PropTypes.shape({
            calls: PropTypes.arrayOf(PropTypes.string),
            traffic: PropTypes.arrayOf(PropTypes.string),
        }),
        startCallsIndex: PropTypes.number,
        startTrafficIndex: PropTypes.number,
        onChangeCalls: PropTypes.func,
        onChangeTraffic: PropTypes.func,
    };

    render() {
        const {
            currentPack,
            switcher,
            startCallsIndex,
            startTrafficIndex,
            onChangeTraffic,
            onChangeCalls,
        } = this.props;

        return (
            <div className={cn('')}>
                <div className={cn('constructor-pack')}>
                    <AnimationValue
                        hAlign="center"
                        value={`${currentPack.calls!.value} ${currentPack.calls!.unit}`}
                    />
                </div>
                <ProductSwitcher
                    className={cn('constructor-range')}
                    startIndex={startCallsIndex}
                    theme="tariff-showcase"
                    items={switcher.calls.map((value: string) => ({ title: value, value, unit: value }))}
                    onChange={onChangeCalls}
                />
                <ProductSwitcher
                    className={cn('constructor-range')}
                    startIndex={startTrafficIndex}
                    theme="tariff-showcase"
                    items={switcher.traffic.map((value: string) => ({ title: value, value, unit: value }))}
                    onChange={onChangeTraffic}
                />
                <div className={cn('constructor-pack')}>
                    <AnimationValue
                        hAlign="center"
                        value={`${currentPack.traffic!.value} ${currentPack.traffic!.unit}`}
                    />
                </div>
            </div>
        );
    }
}

export default ProductTileDynamic;
