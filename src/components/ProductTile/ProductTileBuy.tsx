import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTileBuy.less';
import Button from '../Button/Button';
import TextLink from '../TextLink/TextLink';

interface IProductTileBuyProps {
    /** Class name */
    className?: string;
    /** Buy button href */
    href: string;
    /** Buy button text */
    buyText: string;
    /** Connect button text */
    showConnectButton?: boolean;
    connectText: string;
    /** Connect hander */
    onClickConnect?(): void;
    /** Buy hander */
    onClickBuy?(): void;
}

const cn = cnCreate('mfui-product-tile-buy');
class ProductTileBuy extends React.Component<IProductTileBuyProps> {
    static propTypes = {
        href: PropTypes.string,
        buyText: PropTypes.string,
        connectText: PropTypes.string,
        onClickBuy: PropTypes.func,
        onClickConnect: PropTypes.func,
    };

    render() {
        const {
            className,
            href,
            buyText,
            connectText,
            onClickConnect,
            onClickBuy,
            showConnectButton,
        } = this.props;

        return (
            <div className={cn('', {}, className)}>
                {href &&
                    <Button
                        className={cn('button', { 'without-margin': !showConnectButton })}
                        passiveColor="green"
                        hoverColor="green"
                        sizeAll="medium"
                        href={href}
                        onClick={onClickBuy}
                    >
                        {buyText}
                    </Button>
                }
                {showConnectButton &&
                    <TextLink className={cn('detail-link')} onClick={onClickConnect}>
                        {connectText}
                    </TextLink>
                }
            </div>
        );
    }
}

export default ProductTileBuy;
