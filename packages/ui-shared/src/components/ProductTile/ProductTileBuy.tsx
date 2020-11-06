import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Button, TextLink } from '@megafon/ui-core';
import './style/ProductTileBuy.less';
import { TLinkTargetType } from './ProductTile';

type IButtonProps = React.ComponentProps<typeof Button>;

export interface IProductTileBuyProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Ссылка кнопки купить */
    buyLink?: string;
    /** Target кнопки купить */
    buyLinkTarget?: TLinkTargetType;
    /** Текст кнопки купить */
    buyButtonText?: string;
    /** Показать кнопку купить */
    showBuyButton?: boolean;
    /** Ссылка кнопки подключить */
    connectLink?: string;
    /** Target кнопки подключить */
    connectLinkTarget?: TLinkTargetType;
    /** Текст кнопки подключить */
    connectButtonText?: string;
    /** Показать кнопку подключить */
    showConnectButton?: boolean;
    /** Тема кнопки */
    buttonTheme?: IButtonProps['theme'];
    /** Тип кнопки */
    buttonType?: IButtonProps['type'];
    /** Обработчик клика кнопки подключить */
    onClickConnect?(e: React.SyntheticEvent<EventTarget>): void;
    /** Обработчик клика кнопки купить */
    onClickBuy?(e: React.SyntheticEvent<EventTarget>): void;
}

const cn = cnCreate('mfui-beta-product-tile-buy');
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
