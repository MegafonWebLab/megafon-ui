import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './MainTileTotal.less';
import Button from '../Button/Button';

interface IMainTileTotalProps {
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

const cn = cnCreate('main-tile-total');
class MainTileTotal extends React.Component<IMainTileTotalProps, {}> {
    static propTypes = {
        payment: PropTypes.shape({
            value: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
            oldValue: PropTypes.string,
        }).isRequired,
        info: PropTypes.object,
        handleSubmit: PropTypes.func,
    };

    static defaultProps: Partial<IMainTileTotalProps> = {
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

export default MainTileTotal;
