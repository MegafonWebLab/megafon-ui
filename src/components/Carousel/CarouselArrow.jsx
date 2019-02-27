import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './CarouselArrow.less';
import Arrow from 'icons/System/16/Arrow_forward_16.svg';

const cn = cnCreate('mfui-carousel-arrow');
class CarouselArrow extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        onClickArrow: PropTypes.func,
        onClick: PropTypes.func
    };

    handleClick = () => {
        const { onClickArrow, onClick } = this.props;
        onClickArrow && onClickArrow();
        onClick && onClick();
    }

    render() {
        const { className } = this.props;

        return (
            <div className={cn('', {}, className)} onClick={this.handleClick}>
                <div className={cn('arrow-icon')}><Arrow /></div>
            </div>
        );
    }
}

export default CarouselArrow;
