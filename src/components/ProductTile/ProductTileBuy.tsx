import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTileBuy.less';
import Button from '../Button/Button';
import TextLink from '../TextLink/TextLink';

interface IProductTileBuyProps {
    /** Class name */
    className?: string;
    /** Buy link */
    buyLink?: string;
    /** Buy button text */
    buyButtonText?: string;
    /** Show buy button */
    showBuyButton?: boolean;
    /** Connect link */
    connectLink?: string;
    /** Connect button text */
    connectButtonText?: string;
    /** Show connect button */
    showConnectButton?: boolean;
    /** Connect hander */
    onClickConnect?(e: React.SyntheticEvent<EventTarget>): void;
    /** Buy hander */
    onClickBuy?(e: React.SyntheticEvent<EventTarget>): void;
}

const cn = cnCreate('mfui-product-tile-buy');
class ProductTileBuy extends React.Component<IProductTileBuyProps> {
    static propTypes = {
        buyLink: PropTypes.string,
        buyButtonText: PropTypes.string,
        showBuyButton: PropTypes.bool,
        connectLink: PropTypes.string,
        connectButtonText: PropTypes.string,
        showConnectButton: PropTypes.bool,
        onClickBuy: PropTypes.func,
        onClickConnect: PropTypes.func,
    };

    static defaultProps: Partial<IProductTileBuyProps> = {
        buyButtonText: 'Купить',
        showBuyButton: true,
        connectButtonText: 'Перейти на тариф',
        showConnectButton: true,
    };

    render() {
        const {
            className,
            buyLink,
            buyButtonText,
            showBuyButton,
            connectLink,
            connectButtonText,
            showConnectButton,
            onClickBuy,
            onClickConnect,
        } = this.props;

        return (
            <div className={cn('', {}, className)}>
                {showBuyButton &&
                    <Button
                        className={cn('button', { 'without-margin': !showConnectButton })}
                        passiveColor="green"
                        hoverColor="green"
                        sizeAll="medium"
                        href={buyLink}
                        onClick={onClickBuy}
                    >
                        {buyButtonText}
                    </Button>
                }
                {showConnectButton &&
                    <TextLink
                        className={cn('detail-link')}
                        href={connectLink}
                        onClick={onClickConnect}>
                        {connectButtonText}
                    </TextLink>
                }
            </div>
        );
    }
}

export default ProductTileBuy;
