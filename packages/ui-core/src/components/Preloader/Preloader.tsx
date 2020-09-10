import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Preloader.less';
import cnCreate from 'utils/cnCreate';

export interface IPreloaderProps {
    /** Color theme of preloader's circles */
    color?: 'default' | 'black' | 'white';
    /** Preloader size */
    size?: 'small' | 'medium';
    /** Custom class name */
    className?: string;
}

const cn = cnCreate('mfui-beta-preloader');
class Preloader extends React.Component<IPreloaderProps> {
    static propTypes = {
        color: PropTypes.oneOf(['default', 'black', 'white']),
        size: PropTypes.oneOf(['small', 'medium']),
        className: PropTypes.string,
    };

    static defaultProps: IPreloaderProps = {
        color: 'default',
        size: 'medium',
    };

    render() {
        const { color, size, className } = this.props;

        return (
            <div className={cn({ color, size }, className)}>
                <div className={cn('item', { first: true })} />
                <div className={cn('item', { second: true })} />
                <div className={cn('item', { third: true })} />
            </div>
        );
    }
}

export default Preloader;
