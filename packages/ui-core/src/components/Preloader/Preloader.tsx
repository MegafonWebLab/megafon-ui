import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Preloader.less';
import cnCreate from 'utils/cn';

interface IPreloaderProps {
    /** Color of loader's circles */
    color?: 'default' | 'black' | 'white';
    /** Size of preloader */
    size?: 'small' | 'medium';
    className?: string;
}

const cn = cnCreate('mfui-preloader');
class Preloader extends React.Component<IPreloaderProps, {}> {
    static propTypes = {
        color: PropTypes.oneOf(['default', 'black', 'white']),
        size: PropTypes.oneOf(['small', 'medium']),
    };

    static defaultProps: Partial<IPreloaderProps> = {
        color: 'default',
        size: 'medium',
    };

    render() {
        const { color, size, className } = this.props;

        return (
            <div className={cn('', { color, size }, className)}>
                <div className={cn('item', { first: true })} />
                <div className={cn('item', { second: true })} />
                <div className={cn('item', { third: true })} />
            </div>
        );
    }
}

export default Preloader;
