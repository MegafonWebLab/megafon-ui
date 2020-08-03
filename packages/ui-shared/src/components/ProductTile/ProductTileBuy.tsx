import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Button, TextLink } from '@megafon/ui-core';
import './style/ProductTileBuy.less';
import { TLinkTargetType } from './ProductTile';

type IButtonProps = React.ComponentProps<typeof Button>;

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
    /** button theme */
    buttonTheme?: IButtonProps['theme'];
    /** button type */
    buttonType?: IButtonProps['type'];
    /** button background color */
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
        buttonTheme: Button.propTypes?.theme,
        buttonType: Button.propTypes?.type,
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
            buttonTheme,
            buttonType,
            onClickBuy,
            onClickConnect,
            buyLinkTarget,
            connectLinkTarget,
        } = this.props;

        return (
            <div className={cn('', {}, className)}>
                {showBuyButton &&
                    <Button
                        classes={{
                            root: cn('button', { 'single-button': !showConnectButton }),
                        }}
                        theme={buttonTheme}
                        type={buttonType}
                        sizeAll="medium"
                        href={buyLink}
                        target={buyLinkTarget}
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
