import * as React from 'react';
import * as PropTypes from 'prop-types';
import './TextLink.less';
import Link, { ILinkProps } from '../Link/Link';
import cnCreate from 'utils/cnCreate';

export interface ITextLinkProps extends ILinkProps {
    /** Цвет */
    color: 'white' | 'black' | 'gray' | 'blue' | 'green' | 'inherit';
    /** Отображение подчеркивания */
    underlineVisibility: 'hover' | 'always';
    /** Стиль подчеркивания */
    underlineStyle: 'solid' | 'dashed' | 'border' | 'none';
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element | React.ReactNode;
}

const cn = cnCreate('mfui-beta-text-link');
class TextLink extends React.Component<Partial<ITextLinkProps>, {}> {
    static propTypes = {
        color: PropTypes.oneOf(['white', 'black', 'gray', 'blue', 'green', 'inherit']),
        underlineVisibility: PropTypes.oneOf(['hover', 'always']),
        underlineStyle: PropTypes.oneOf(['solid', 'dashed', 'border', 'none']),
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
    };

    static defaultProps: Partial<ITextLinkProps> = {
        underlineVisibility: 'hover',
        underlineStyle: 'solid',
        color: 'blue',
    };

    render() {
        const {
            underlineVisibility,
            underlineStyle,
            color,
            className,
            target,
            href,
            onClick,
            children,
            download,
        } = this.props;

        return (
            <Link
                target={target}
                href={href}
                onClick={onClick}
                children={children}
                className={cn('', {
                    'underline-visibility': underlineVisibility,
                    'underline-style': underlineStyle, color,
                }, className)}
                download={download}
            />
        );
    }
}

export default TextLink;
