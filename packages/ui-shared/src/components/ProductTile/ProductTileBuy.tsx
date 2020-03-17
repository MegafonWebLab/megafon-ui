import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from '@megafon/ui-core/dist/utils/cn';
import './style/ProductTileBuy.less';
import Button, { IButtonProps } from '@megafon/ui-core/dist/components/Button/Button';
import TextLink from '@megafon/ui-core/dist/components/TextLink/TextLink';
import { TLinkTargetType } from './ProductTile';

export interface IProductTileBuyProps {
    /** Class name */
    className?: string;
    /** Buy link */
    buyLink?: string;
    /** Buy Link target */
    buyLinkTarget?: TLinkTargetType;
    /** Buy button text */
    buyButtonText?: string;
    /** Show buy button */
    showBuyButton?: boolean;
    /** Connect link */
    connectLink?: string;
    /** Connect Link target */
    connectLinkTarget?: TLinkTargetType;
    /** Connect button text */
    connectButtonText?: string;
    /** Show connect button */
    showConnectButton?: boolean;
    /** button border */ // @ts-ignore
    buttonBorder?: IButtonProps['border'];
    /** button font color */ // @ts-ignore
    buttonFontColor?: IButtonProps['fontColor'];
    /** button background color */ // @ts-ignore
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
        buyLinkTarget: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
        buyButtonText: PropTypes.string,
        showBuyButton: PropTypes.bool,
        connectLink: PropTypes.string,
        connectLinkTarget: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
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
        buyLinkTarget: '_self',
        connectLinkTarget: '_self',
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
            buyLinkTarget,
            connectLinkTarget,
        } = this.props;

        return (
            <div className={cn('', {}, className)}>
                {showBuyButton &&
                    <Button
                        className={cn('button', { 'single-button': !showConnectButton })}
                        passiveColor={buttonPassiveColor}
                        hoverColor="green"
                        sizeAll="medium"
                        href={buyLink}
                        target={buyLinkTarget}
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
                        target={connectLinkTarget}
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
