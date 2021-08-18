import * as PropTypes from 'prop-types';
import * as React from 'react';

type DefaultProps = {
    animation?: boolean;
    animationDuration?: number;
};

type Props = DefaultProps & {
    className: string;
    classNameContainer: string;
    isOpened: boolean;
    children: React.ReactNode;
};

const BROWSER_DELAY = 100;

const Collapse = (props: Props): React.FunctionComponentElement<Props> => {
    const { className, classNameContainer, animation = true, animationDuration = 300, children, isOpened } = props;
    const canUpdate = React.useRef(false);
    const timer = React.useRef<number | undefined>(undefined);
    const rootNode = React.useRef<HTMLInputElement>(null);
    const [height, setHeight] = React.useState('0px');
    const transition: string = animation ? `height ${animationDuration / 1000}s` : 'none';
    const duration: number = animation ? animationDuration : 0;

    const animateSlide = (finalHeight: string, delay: number): void => {
        if (!rootNode.current) {
            return;
        }
        setHeight(`${rootNode.current.scrollHeight}px`);
        timer.current = window.setTimeout(() => {
            setHeight(finalHeight);
        }, delay);
    };

    React.useEffect(() => {
        switch (true) {
            case !canUpdate.current && isOpened:
                setHeight('auto');
                break;
            case !canUpdate.current && !isOpened:
                setHeight('0px');
                break;
            case isOpened:
                animateSlide('auto', duration);
                break;
            default:
                animateSlide('0px', BROWSER_DELAY);
        }

        canUpdate.current = true;

        return (): void => clearTimeout(timer.current);
    }, [isOpened, duration]);

    return (
        <div
            className={className}
            style={{
                overflow: 'hidden',
                height,
                transition,
            }}
            ref={rootNode}
        >
            <div className={classNameContainer}>{children}</div>
        </div>
    );
};

Collapse.propTypes = {
    className: PropTypes.string,
    classNameContainer: PropTypes.string,
    isOpened: PropTypes.bool.isRequired,
    animationDuration: PropTypes.number,
    animation: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default Collapse;
