import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTileBuy.less';
import Button from '../Button/Button';
import { IButtonProps } from '../Button/Button';
import TextLink from '../TextLink/TextLink';

export interface IProductTileBuyProps {
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
    /** button border */
    buttonBorder?: IButtonProps['border'];
    /** button font color */
    buttonFontColor?: IButtonProps['fontColor'];
    /** button background color */
    buttonPassiveColor?: IButtonProps['passiveColor'];
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
        buttonBorder: Button.propTypes.border,
        buttonFontColor: Button.propTypes.fontColor,
        buttonPassiveColor: Button.propTypes.passiveColor,
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
            buttonBorder,
            buttonFontColor,
            buttonPassiveColor,
            onClickBuy,
            onClickConnect,
        } = this.props;

        return (
            <div className={cn('', {}, className)}>
                {showBuyButton &&
                    <Button
                        className={cn('button', { 'without-margin': !showConnectButton })}
                        passiveColor={buttonPassiveColor}
                        hoverColor="green"
                        sizeAll="medium"
                        href={buyLink}
                        border={buttonBorder}
                        fontColor={buttonFontColor}
                        onClick={onClickBuy}
                    >
                        {buyButtonText}
                    </Button>
                }
                {showConnectButton &&
                    <TextLink
                        className={cn('detail-link')}
                        href={connectLink}
                        target="_blank"
                        onClick={onClickConnect}
                    >
                        {connectButtonText}
                    </TextLink>
                }
            </div>
        );
    }
}

export default ProductTileBuy;
