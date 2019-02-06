import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductCardTotal.less';
import Button from '../Button/Button';

interface IProductCardTotalProps {
    /** Payment
     * Object with args: value: string(required), unit: string(required), oldValue: string
     */
    payment?: {
        value: string | number;
        unit: string;
        oldValue?: string;
    };
    /** Info - any type - return with onSubmit, onClickConnect, onClickMore */
    info?: {};
    /** Submit text */
    submitText?: string;
    /** Submit link,
     * show button if included
     */
    submitLink?: string;
    /** More text */
    moreText?: string;
    /** More link,
     *  show button if included
     */
    moreLink?: string;
    /** Connect text */
    connectText?: string;
    className?: string;
    classNameWrap?: string;
    classNameCost?: string;
    classNameButtons?: string;
    classNameSubmit?: string;
    classNameMore?: string;
    classNameConnect?: string;
    /** Submit hander,
     * show button if included
     */
    onSubmit?(e: React.SyntheticEvent<EventTarget>, info: {}): void;
    /** Connect hander,
     * show button if included
     */
    onClickConnect?(e: React.SyntheticEvent<EventTarget>, info: {}): void;
    /** More hander,
     * show button if included
     */
    onClickMore?(e: React.SyntheticEvent<EventTarget>, info: {}): void;
}

const cn = cnCreate('mfui-product-card-total');
class ProductCardTotal extends React.Component<IProductCardTotalProps, {}> {
    static propTypes = {
        payment: PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            unit: PropTypes.string.isRequired,
            oldValue: PropTypes.string,
        }),
        info: PropTypes.object,
        submitText: PropTypes.string,
        submitLink: PropTypes.string,
        moreText: PropTypes.string,
        moreLink: PropTypes.string,
        connectText: PropTypes.string,
        className: PropTypes.string,
        classNameWrap: PropTypes.string,
        classNameCost: PropTypes.string,
        classNameButtons: PropTypes.string,
        classNameSubmit: PropTypes.string,
        classNameMore: PropTypes.string,
        classNameConnect: PropTypes.string,
        onSubmit: PropTypes.func,
        onClickConnect: PropTypes.func,
        onClickMore: PropTypes.func,
    };

    static defaultProps: Partial<IProductCardTotalProps> = {
        submitText: 'Выбрать',
        moreText: 'Подробнее',
        connectText: 'Подключить',
    };

    handleSubmit = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onSubmit, info } = this.props;

        onSubmit && onSubmit(e, info!);
    }

    handleClickConnect = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onClickConnect, info } = this.props;

        onClickConnect && onClickConnect(e, info!);
    }

    handleClickMore = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onClickMore, info } = this.props;

        onClickMore && onClickMore(e, info!);
    }

    render() {
        const {
            payment, onSubmit, submitLink,
            submitText, onClickMore, moreLink,
            onClickConnect, moreText, connectText,
            className, classNameCost, classNameButtons,
            classNameSubmit, classNameMore, classNameConnect,
            classNameWrap,
        } = this.props;
        const isSubmit = onSubmit || submitLink;
        const isMore = onClickMore || moreLink;

        return (
            <div className={cn('', {}, className)}>
                <div className={cn('wrap', {}, classNameWrap)}>
                    {payment &&
                        <div className={cn('cost', { 'old-value': !!payment.oldValue }, classNameCost)}>
                            <span className={cn('price')}>{payment.value}</span>&nbsp;
                            {payment.oldValue &&
                                <React.Fragment>
                                    <span className={cn('old-price')}>{payment.oldValue}</span>
                                    <br />
                                </React.Fragment>
                            }
                            <span className={cn('unit')}>{payment.unit}</span>
                        </div>
                    }

                    <div className={cn('buttons', {}, classNameButtons)}>
                        {isSubmit &&
                            <Button
                                className={cn('button', {}, classNameSubmit)}
                                width="full"
                                href={submitLink}
                                onClick={this.handleSubmit}
                            >
                                {submitText}
                            </Button>
                        }
                        {!isSubmit && isMore &&
                            <Button
                                className={cn('description-more', {}, classNameMore)}
                                width="full"
                                passiveColor="transparent-green"
                                hoverColor="green"
                                href={moreLink}
                                target="_blank"
                                onClick={this.handleClickMore}
                            >
                                {moreText}
                            </Button>
                        }
                        {onClickConnect &&
                            <div
                                className={cn('connect-button', {}, classNameConnect)}
                                onClick={this.handleClickConnect}
                            >
                                <div className={cn('connect-text-block')}>
                                    <span className={cn('connect-text-words')}>{connectText}</span>
                                    абонентам МегаФона
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCardTotal;
