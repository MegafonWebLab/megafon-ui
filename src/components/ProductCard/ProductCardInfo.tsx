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
    value: string | number;
    unit: string | JSX.Element;
}

interface IProductCardInfoProps {
    /** Title */
    title: string;
    /** Link */
    link: string;
    /** Link text */
    linkText?: string;
    /** Description
     * string or JSX.element with custom styles
     */
    description?: string | JSX.Element;
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
    className?: string;
    classNameDescription?: string;
    classNameDescriptionText?: string;
    classNameParams?: string;
    classNameParamsItem?: string;
    onClickMoreInfo?(e: React.SyntheticEvent<EventTarget>): void;
}

const cn = cnCreate('mfui-product-card-info');
class ProductCardInfo extends React.Component<IProductCardInfoProps, {}> {
    static propTypes = {
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        linkText: PropTypes.string,
        description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                unit: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
            })
        ),
        className: PropTypes.string,
        classNameDescription: PropTypes.string,
        classNameDescriptionText: PropTypes.string,
        classNameParams: PropTypes.string,
        classNameParamsItem: PropTypes.string,
        onClickMoreInfo: PropTypes.func,
    };

    static defaultProps: Partial<IProductCardInfoProps> = {
        linkText: 'Подробнее',
        additionalParams: [],
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

    handleClickMoreInfo = (e: React.SyntheticEvent<EventTarget>): void => {
        const { onClickMoreInfo } = this.props;

        onClickMoreInfo && onClickMoreInfo(e);
    }

    render() {
        const {
            badges, description, descriptionIcon,
            link, linkText, title, additionalParams,
            className, classNameDescription, classNameDescriptionText,
            classNameParams, classNameParamsItem,
        } = this.props;

        return (
            <div className={cn('', {}, className)}>
                <div className={cn('description', {}, classNameDescription)}>
                    <Header className={cn('description-title')} as="h2" margin={false}>
                        {title}
                    </Header>
                    {badges && this.renderBadges()}
                    {description &&
                        <div className={cn('description-wrap')}>
                            {descriptionIcon && React.cloneElement(descriptionIcon, {
                                className: cn('description-icon'),
                            })}
                            {typeof description === 'string'
                                ? <div
                                    className={cn('description-text', {}, classNameDescriptionText)}
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                                : <div
                                    className={cn('description-text', {}, classNameDescriptionText)}
                                >{description}</div>
                            }

                        </div>
                    }
                    <TextLink
                        className={cn('description-more')}
                        href={link}
                        target="_blank"
                        onClick={this.handleClickMoreInfo}
                    >
                        {linkText}
                    </TextLink>
                </div>
                <div className={cn('params', {}, classNameParams)}>
                    <ul className={cn('params-list')}>
                        {additionalParams!.map((param: IAdditionalParams, key: number): React.ReactNode =>
                            <li key={param.title + key} className={cn('params-item', {}, classNameParamsItem)}>
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
