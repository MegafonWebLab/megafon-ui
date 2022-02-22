import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';

type CollapseDefaultProps = {
    animation?: boolean;
    animationDuration?: number;
};

type CollapseProps = CollapseDefaultProps & {
    className: string;
    classNameContainer: string;
    isOpened: boolean;
    dataAttrs?: {
        root?: Record<string, string>;
        inner?: Record<string, string>;
    };
    children: React.ReactNode;
};

const { sin, cos, min, PI } = Math;

const easeOutSine = (progress: number): number => sin((progress * PI) / 2);
const easeInSine = (progress: number): number => 1 - cos((progress * PI) / 2);

const Collapse = (props: CollapseProps): React.FunctionComponentElement<CollapseProps> => {
    const {
        className,
        classNameContainer,
        animation = true,
        animationDuration = 300,
        children,
        isOpened,
        dataAttrs,
    } = props;

    const duration: number = animation ? animationDuration : 0;

    const animationStart = React.useRef<null | number>(null);
    const animationId = React.useRef<null | number>(null);
    const canUpdate = React.useRef<boolean>(false);
    const rootNode = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        animationId.current && window.cancelAnimationFrame(animationId.current);
    }, [isOpened]);

    const animateSlide = useCallback(
        (contentHeight: number, animationTime: number, timePassed: number, isOpenAction = false): void => {
            if (!rootNode.current) {
                return;
            }

            if (!animationStart.current) {
                animationStart.current = timePassed;
            }

            const runtime = timePassed - animationStart.current;
            const progress = animationTime ? min(runtime / animationTime, 1) : 1;

            const isAnimationInProgress = progress < 1;
            const nextHeight = isOpenAction
                ? easeOutSine(progress) * contentHeight
                : contentHeight - easeInSine(progress) * contentHeight;

            rootNode.current.style.height = `${nextHeight}px`;

            if (isAnimationInProgress) {
                animationId.current = window.requestAnimationFrame(time =>
                    animateSlide(contentHeight, animationTime, time, isOpenAction),
                );
            } else {
                animationStart.current = null;
                animationId.current = null;
            }
        },
        [],
    );

    useEffect(() => {
        if (!rootNode.current) {
            return;
        }

        const { scrollHeight = 0 } = rootNode.current;

        switch (true) {
            case !canUpdate.current && isOpened:
                rootNode.current.style.height = 'auto';

                break;
            case !canUpdate.current && !isOpened:
                rootNode.current.style.height = '0px';

                break;
            case isOpened:
                animationId.current = window.requestAnimationFrame(timePassed =>
                    animateSlide(scrollHeight, duration, timePassed, true),
                );

                break;
            default:
                animationId.current = window.requestAnimationFrame(timePassed =>
                    animateSlide(scrollHeight, duration, timePassed),
                );
        }

        canUpdate.current = true;
    }, [isOpened, duration, animateSlide]);

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={className} style={{ overflow: 'hidden' }} ref={rootNode}>
            <div {...filterDataAttrs(dataAttrs?.inner)} className={classNameContainer}>
                {children}
            </div>
        </div>
    );
};

Collapse.propTypes = {
    className: PropTypes.string,
    classNameContainer: PropTypes.string,
    isOpened: PropTypes.bool.isRequired,
    animationDuration: PropTypes.number,
    animation: PropTypes.bool,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        inner: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    children: PropTypes.node.isRequired,
};

export default Collapse;
