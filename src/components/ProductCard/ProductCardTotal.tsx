import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductCardTotal.less';
import Button from '../Button/Button';

interface IProductCardTotalProps {
    /** Payment
     * Object with args: value: string(required), unit: string(required), oldValue: string
     */
    payment: {
        value: string;
        unit: string;
        oldValue?: string;
    };
    /** Info - any object  */
    info?: {};
    /** Submit text */
    submitText?: string;
    /** Submit hander
     * Show button if included
     */
    handleSubmit?(e: React.SyntheticEvent<EventTarget>, info: {}): void;
}

const cn = cnCreate('product-card-total');
class ProductCardTotal extends React.Component<IProductCardTotalProps, {}> {
    static propTypes = {
        payment: PropTypes.shape({
            value: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
            oldValue: PropTypes.string,
        }).isRequired,
        info: PropTypes.object,
        handleSubmit: PropTypes.func,
    };

    static defaultProps: Partial<IProductCardTotalProps> = {
        submitText: 'Выбрать',
    };

    handleSubmit = (e: React.SyntheticEvent<EventTarget>): void => {
        const { handleSubmit, info } = this.props;

        handleSubmit && handleSubmit(e, info!);
    }

    render() {
        const { payment, handleSubmit, submitText } = this.props;

        return (
            <div className={cn('')}>
                <div className={cn('wrap')}>
                    <div className={cn('cost', { 'old-value': !!payment.oldValue })}>
                        <span className={cn('price')}>{payment.value}</span>&nbsp;
                        {payment.oldValue &&
                            <React.Fragment>
                                <span className={cn('old-price')}>{payment.oldValue}</span>
                                <br />
                            </React.Fragment>
                        }
                        <span className={cn('unit')}>{payment.unit}</span>
                    </div>
                    {handleSubmit &&
                        <div className={cn('buttons')}>
                            <Button
                                className={cn('button')}
                                onClick={this.handleSubmit}
                                width="full"
                            >
                                {submitText}
                            </Button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default ProductCardTotal;
