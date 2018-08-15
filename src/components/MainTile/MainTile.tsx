import * as React from 'react';
import * as PropTypes from 'prop-types';
import './MainTile.less';
import TextLink from '../TextLink/TextLink';
import Header from '../Header/Header';
import Button from '../Button/Button';
import BubbleHint from '../BubbleHint/BubbleHint';
import MainTileInternet from './MainTileInternet';
import MainTileFree from './MainTileFree';
import { cnCreate } from '../../utils/cn';

interface IBadge {
    title: string;
    code: string;
    hint?: string;
}

export interface ISocialIcon {
    svgIcon: JSX.Element;
    title: string;
}

export interface IShowcaseChildren {
    svgIcon: JSX.Element;
    title: string;
    caption: string;
    value: string;
}

interface IShowcaseParams {
    title: string;
    value: string;
    children: Array<Partial<IShowcaseChildren>>;
}

interface IDetail {
    additional_params?: Array<Partial<{
        title: string;
        value: string;
        unit: string;
    }>>;
    showcase_params?: IShowcaseParams[];
    payment: {
        unit: string;
        value: string;
    };
}

interface IPlan {
    badges?: IBadge[];
    shopTag: string;
    title: string;
    link: string;
    linkText: string;
    description?: string;
    descriptionIcon?: JSX.Element;
    socialIcons: Array<Partial<ISocialIcon>>;
    details: IDetail;
}

interface IMainTileProps {
    /** Is plan recommended */
    recommended?: boolean;
    plan: IPlan;
    handleSubmit?(e: React.SyntheticEvent<EventTarget>, plan: IPlan): void;
}

const cn = cnCreate('main-tile');
class MainTile extends React.Component<IMainTileProps, {}> {
    static propTypes = {
        recommended: PropTypes.bool,
        handleSubmit: PropTypes.func,
        plan: PropTypes.shape({
            badges: PropTypes.array,
            shop_tag: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            descriptionIcon: PropTypes.element,
            socialIcons: PropTypes.array,
            details: PropTypes.object,
        }).isRequired,
    };

    handleClick = e => e.target.tagName !== 'A';

    handleSubmit = (e: React.SyntheticEvent<EventTarget>): void => {
        const { plan, handleSubmit } = this.props;

        handleSubmit && handleSubmit(e, plan);
    }

    renderInfo(plan: IPlan) {
        return (
            <div className={cn('info')}>
                <div className={cn('description')}>
                    <Header className={cn('description-title')} as="h2" margin={false}>
                        {plan.title}
                    </Header>
                    {this.props.plan.badges && this.renderBadges()}
                    {plan.description &&
                        <div className={cn('description-wrap')}>
                            {plan.descriptionIcon}
                            <div className={cn('description-text')}>
                                {plan.description}
                            </div>
                        </div>
                    }
                    <TextLink
                        className={cn('description-more')}
                        href={plan.link}
                        target="_blank"
                    >
                        {plan.linkText || `Подробнее`}
                    </TextLink>
                </div>
                <div className={cn('params')}>
                    <ul className={cn('params-list')}>
                        {plan.details.additional_params!.map(param =>
                            <li key={param.title} className={cn('params-item')}>
                                <span data-amount={param.value}>{param.value}</span> {param.unit}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }

    renderFeatures(plan: IPlan) {
        const params = plan.details.showcase_params!.filter(
            param => param.children!.length
        );
        const [first, ...rest] = params;

        return (
            <div className={cn('features')}>
                {first &&
                    <MainTileInternet
                        className={cn('internet')}
                        params={first.children}
                        socialIcons={plan.socialIcons}
                    />
                }
                {rest.map((param: IShowcaseParams, index: number) =>
                    <MainTileFree
                        className={cn('free')}
                        params={param.children}
                        title={param.value}
                        key={param.title + index}
                    />
                )}
            </div>
        );
    }

    renderTotal(plan: IPlan) {
        return (
            <div className={cn('total')}>
                <div className={cn('total-wrap')}>
                    <div className={cn('total-cost')}>
                        {plan.details.payment.value} {plan.details.payment.unit}
                    </div>
                    <div className={cn('total-buttons')}>
                        <Button
                            className={cn('total-button')}
                            onClick={this.handleSubmit}
                            width="full"
                        >
                            Выбрать
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    renderBadges() {
        const badgeTitle = (badge: IBadge) => <div className={cn('badge-title')}>{badge.title}</div>;

        return (
            <div className={cn('badges')}>
                {this.props.plan.badges!.map((badge: IBadge, key: number) =>
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

    renderRecommendedLabel() {
        return (
            <div className={cn('recommendation')}>
                <div className={cn('recommendation-text')}>Рекомендуем</div>
            </div>
        );
    }

    render() {
        const { plan, recommended } = this.props;

        return (
            <div
                className={cn('', { recommended })}
                onClick={this.handleClick}
            >
                <div className={cn('inner')}>
                    {recommended && this.renderRecommendedLabel()}
                    <div className={cn('container')}>
                        {this.renderInfo(plan)}
                        {this.renderFeatures(plan)}
                        {this.renderTotal(plan)}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainTile;
