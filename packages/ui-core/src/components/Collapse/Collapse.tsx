import * as React from 'react';
import * as PropTypes from 'prop-types';

interface ICollapseProps {
    className?: string;
    classNameContainer?: string;
    isOpened: boolean;
    animationDuration: number;
    children: JSX.Element | Element | string | number;
}

interface ICollapseState {
    height: string;
}

class Collapse extends React.Component<ICollapseProps, ICollapseState> {
    static propTypes = {
        className: PropTypes.string,
        classNameContainer: PropTypes.string,
        isOpened: PropTypes.bool.isRequired,
        animationDuration: PropTypes.number.isRequired,
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {
        animationDuration: 300,
    };

    rootNode: HTMLDivElement | null;
    slideDownTimer: number;

    constructor(props: ICollapseProps) {
        super(props);
        this.state = { height: '0' };
    }

    componentDidMount() {
        if (this.props.isOpened) {
            this.slide('auto');
        }
    }

    componentDidUpdate(prevProps: ICollapseProps) {
        const { isOpened } = this.props;

        if (isOpened === prevProps.isOpened) {
            return;
        }

        if (isOpened) {
            this.slideDown();

            return;
        }

        this.slideUp();
    }

    componentWillUnmount() {
        clearTimeout(this.slideDownTimer);
    }

    setScrollHeight = (fn: () => void) => {
        this.rootNode &&
            this.setState(
                {
                    height: `${this.rootNode.scrollHeight}px`,
                },
                fn
            );
    }

    slide = (height: string, duration = 0): void => {
        this.setScrollHeight(() => {
            this.slideDownTimer && clearTimeout(this.slideDownTimer);
            this.slideDownTimer = window.setTimeout(() => {
                this.setState({ height });
            }, duration);
        });
    }

    slideUp = (): void => {
        this.slide('0');
    }

    slideDown = (): void => {
        const { animationDuration } = this.props;

        this.slide('auto', animationDuration);
    }

    render() {
        const { className, classNameContainer, animationDuration, children } = this.props;
        const { height } = this.state;
        const transition = `height ${animationDuration / 1000}s`;

        return (
            <div
                className={className}
                style={{ overflow: 'hidden', height, transition }}
                ref={node => {
                    this.rootNode = node;
                }}
            >
                <div className={classNameContainer}>{children}</div>
            </div>
        );
    }
}

export default Collapse;
