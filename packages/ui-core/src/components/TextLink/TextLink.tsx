import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './TextLink.less';
import Link, { ILinkProps } from '../Link/Link';

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
class TextLink extends React.PureComponent<Partial<ITextLinkProps>> {
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

    render(): JSX.Element {
        const {
            underlineVisibility,
            underlineStyle,
            color,
            className,
            target,
            href,
            rel,
            onClick,
            children,
            download,
        } = this.props;

        return (
            <Link
                target={target}
                href={href}
                rel={rel}
                onClick={onClick}
                className={cn(
                    '',
                    {
                        'underline-visibility': underlineVisibility,
                        'underline-style': underlineStyle,
                        color,
                    },
                    className,
                )}
                download={download}
            >
                {children}
            </Link>
        );
    }
}

export default TextLink;
