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
    /** Submit hander
     * Show button if included
     */
    handleSubmit?(e: React.SyntheticEvent<EventTarget>, info: {});
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

    handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
        const { handleSubmit, info } = this.props;

        handleSubmit && handleSubmit(e, info!);
    }

    render() {
        const { payment } = this.props;

        return (
            <div className={cn('')}>
                <div className={cn('total-wrap')}>
                    <div className={cn('total-cost')}>
                        <span className={cn('total-price')}>{payment.value}</span>&nbsp;
                        {payment.oldValue &&
                            <React.Fragment>
                                <span className={cn('total-old-price')}>{payment.oldValue}</span>
                                <br />
                            </React.Fragment>
                        }
                        <span className={cn('total-unit')}>{payment.unit}</span>
                    </div>
                    <div className={cn('total-buttons')}>
                        <Button
                            className={cn('total-button')}
                            onClick={this.handleSubmit}
                            width="full"
                        >
                            Выбрать
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainTileTotal;
