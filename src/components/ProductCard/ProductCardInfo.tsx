import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductCardInfo.less';
import BubbleHint from '../BubbleHint/BubbleHint';
import TextLink from '../TextLink/TextLink';
import Header from '../Header/Header';

interface IBadge {
    title: string;
    code: string;
    hint?: string;
}

interface IAdditionalParams {
    title: string;
    value: string;
    unit: string;
}

interface IProductCardInfoProps {
    /** Title */
    title: string;
    /** Link */
    link: string;
    /** Link text */
    linkText?: string;
    /** Description */
    description?: string;
    /** Description Svg */
    descriptionIcon?: JSX.Element;
    /** Badges
     * list of objects with args: title(required), code(required), hint
     */
    badges?: IBadge[];
    /** Additional params
     * list of params with args: title(required), value(required), unit(required)
     */
    additionalParams?: IAdditionalParams[];
}

const cn = cnCreate('product-card-info');
class ProductCardInfo extends React.Component<IProductCardInfoProps, {}> {
    static propTypes = {
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        linkText: PropTypes.string,
        description: PropTypes.string,
        descriptionIcon: PropTypes.element,
        badges: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                code: PropTypes.string.isRequired,
                hint: PropTypes.string,
            })
        ),
        additionalParams: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
                unit: PropTypes.string.isRequired,
            })
        ),
    };

    static defaultProps: Partial<IProductCardInfoProps> = {
        linkText: 'Подробнее',
    };

    renderBadges() {
        const badgeTitle = (badge: IBadge) => <div className={cn('badge-title')}>{badge.title}</div>;

        return (
            <div className={cn('badges')}>
                {this.props.badges!.map((badge: IBadge, key: number) =>
                    <div key={`${badge.title}${key}`} className={cn('badge', { type: badge.code })}>
                        {badge.hint
                            ? this.renderBubbleHint(badgeTitle(badge), badge.hint)
                            : badgeTitle(badge)
                        }
                    </div>
                )}
            </div>
        );
    }

    renderBubbleHint(title: JSX.Element, hint: string) {
        return (
            <BubbleHint
                popupWidth="small"
                placement="right"
                trigger={title}
            >
                <div dangerouslySetInnerHTML={{ __html: hint }} />
            </BubbleHint>
        );
    }

    render() {
        return (
            <div className={cn('')}>
                <div className={cn('description')}>
                    <Header className={cn('description-title')} as="h2" margin={false}>
                        {this.props.title}
                    </Header>
                    {this.props.badges && this.renderBadges()}
                    {this.props.description &&
                        <div className={cn('description-wrap')}>
                            {this.props.descriptionIcon}
                            <div className={cn('description-text')}>
                                {this.props.description}
                            </div>
                        </div>
                    }
                    <TextLink
                        className={cn('description-more')}
                        href={this.props.link}
                        target="_blank"
                    >
                        {this.props.linkText}
                    </TextLink>
                </div>
                <div className={cn('params')}>
                    <ul className={cn('params-list')}>
                        {this.props.additionalParams!.map((param: IAdditionalParams, key: number): React.ReactNode =>
                            <li key={param.title + key} className={cn('params-item')}>
                                <span data-amount={param.value}>{param.value}</span> {param.unit}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ProductCardInfo;
