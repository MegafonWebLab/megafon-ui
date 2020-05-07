import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Accordion.less';
import cnCreate from 'utils/cnCreate';
import Collapse from 'components/Collapse/Collapse';
import ArrowUp from 'icons/System/24/Arrow_up_24.svg';
import ArrowDown from 'icons/System/24/Arrow_down_24.svg';

interface IAccordionClasses {
    root?: string;
    collapse?: string;
}

export interface IAccordionProps {
    title: JSX.Element | string;
    children: JSX.Element | Element;
    isOpened: boolean;
    theme?: 'default';
    classes?: IAccordionClasses;
    onClickAccordion?: (isOpened: boolean, title: JSX.Element | string) => void;
}

export interface IAccordionState {
    isOpened: boolean;
}

const cn = cnCreate('mfui-accordion');
class Accordion extends React.PureComponent<IAccordionProps, IAccordionState> {
    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
        children: PropTypes.node.isRequired,
        isOpened: PropTypes.bool,
        theme: PropTypes.oneOf(['default']),
        classes: PropTypes.shape({
            root: PropTypes.string,
            collapse: PropTypes.string,
        }),
        onClickAccordion: PropTypes.func,
    };

    static defaultProps = {
        isOpened: false,
        theme: 'default',
    };

    rootNode: React.RefObject<HTMLDivElement>;

    constructor(props: IAccordionProps) {
        super(props);

        this.state = {
            isOpened: this.props.isOpened,
        };
        this.rootNode = React.createRef();
    }

    componentDidUpdate(prevProps: IAccordionProps) {
        const { isOpened } = this.props;

        if (prevProps.isOpened === isOpened) {
            return;
        }

        this.setState({ isOpened });
    }

    handleClickTitle = () => {
        const { onClickAccordion, title } = this.props;

        this.setState(
            prevState => ({
                isOpened: !prevState.isOpened,
            }),
            () => {
                onClickAccordion && onClickAccordion(this.state.isOpened, title);
            }
        );
    }

    render() {
        const {
            title,
            theme,
            children,
            classes: {
                root: rootPropsClasses = '',
                collapse: collapsePropsClasses = '',
            } = {},
        } = this.props;
        const { isOpened } = this.state;

        return (
            <div className={cn('', { theme, open: isOpened }, rootPropsClasses)} ref={this.rootNode}>
                <div className={cn('title-wrap')} onClick={this.handleClickTitle}>
                    <h5 className={cn('title')}>{title}</h5>
                    <div className={cn('icon-box', { open: isOpened })}>
                        {isOpened
                            ? (<ArrowUp />)
                            : (<ArrowDown />)
                        }
                    </div>
                </div>
                <Collapse
                    className={cn('content', { theme }, collapsePropsClasses)}
                    classNameContainer={cn('content-inner')}
                    isOpened={isOpened}
                >
                    {children}
                </Collapse>
            </div>
        );
    }
}

export default Accordion;
