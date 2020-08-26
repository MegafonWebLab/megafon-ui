import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Button } from '@megafon/ui-core';
import './ProductCardTotal.less';

const LinkTargetType = PropTypes.oneOf(['_self', '_blank', '_parent', '_top']);
export type TLinkTargetType = '_self' | '_blank' | '_parent' | '_top';

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
    /** Submit link target */
    submitLinkTarget?: TLinkTargetType;
    /** More text */
    moreText?: string;
    /** More link,
     *  show button if included
     */
    moreLink?: string;
    /** More link target */
    moreLinkTarget?: TLinkTargetType;
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
    onSubmit?: (e: React.SyntheticEvent<EventTarget>, info: {}) => void;
    /** Connect hander,
     * show button if included
     */
    onClickConnect?: (e: React.SyntheticEvent<EventTarget>, info: {}) => void;
    /** More hander,
     * show button if included
     */
    onClickMore?: (e: React.SyntheticEvent<EventTarget>, info: {}) => void;
}

const cn = cnCreate('mfui-beta-product-card-total');
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
        submitLinkTarget: LinkTargetType,
        moreText: PropTypes.string,
        moreLink: PropTypes.string,
        moreLinkTarget: LinkTargetType,
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
        moreLinkTarget: '_self',
        submitLinkTarget: '_self',
    };

    handleSubmit = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onSubmit, info } = this.props;

        onSubmit && onSubmit(e, info || {});
    }

    handleClickConnect = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onClickConnect, info } = this.props;

        onClickConnect && onClickConnect(e, info || {});
    }

    handleClickMore = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onClickMore, info } = this.props;

        onClickMore && onClickMore(e, info || {});
    }

    render() {
        const {
            payment, onSubmit, submitLink,
            submitText, onClickMore, moreLink,
            onClickConnect, moreText, connectText,
            className, classNameCost, classNameButtons,
            classNameSubmit, classNameMore, classNameConnect,
            classNameWrap, moreLinkTarget, submitLinkTarget,
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

                    <div className={cn('buttons', classNameButtons)}>
                        {isSubmit &&
                            <Button
                                classes={{
                                    root: cn('button', classNameSubmit),
                                }}
                                fullWidth
                                href={submitLink}
                                onClick={this.handleSubmit}
                                target={submitLinkTarget}
                            >
                                {submitText}
                            </Button>
                        }
                        {!isSubmit && isMore &&
                            <Button
                                classes={{
                                    root: cn('description-more', classNameMore),
                                }}
                                type="outline"
                                fullWidth
                                href={moreLink}
                                target={moreLinkTarget}
                                onClick={this.handleClickMore}
                            >
                                {moreText}
                            </Button>
                        }
                        {onClickConnect &&
                            <div
                                className={cn('connect-button', classNameConnect)}
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
