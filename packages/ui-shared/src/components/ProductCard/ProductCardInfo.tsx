import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Header, Tooltip, TextLink } from '@megafon/ui-core';
import './ProductCardInfo.less';

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

export interface IProductCardInfoProps {
    /** Заголовок */
    title: string;
    /** Ссылка */
    link: string;
    /** Target - аргумента тега <a> */
    linkTarget?: '_self' | '_blank' | '_parent' | '_top';
    /** Текст ссылки */
    linkText?: string;
    /** Описание */
    description?: string | JSX.Element;
    /** Иконка описания */
    descriptionIcon?: JSX.Element;
    /** Бейджи
     * title: string;
     * code: string;
     * hint?: string;
     */
    badges?: IBadge[];
    /** Дополнительные параметры
     * title: string;
     * value: string | number;
     * unit: string | JSX.Element;
     */
    additionalParams?: IAdditionalParams[];
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительный класс элемента описания */
    classNameDescription?: string;
    /** Дополнительный класс элемента описания текста */
    classNameDescriptionText?: string;
    /** Дополнительный класс элемента параметров */
    classNameParams?: string;
    /** Дополнительный класс элемента конкретного параметра */
    classNameParamsItem?: string;
    /** Обработчик клика */
    onClickMoreInfo?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-beta-product-card-info');
class ProductCardInfo extends React.Component<IProductCardInfoProps, {}> {
    static propTypes = {
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        linkTarget: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
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
        linkTarget: '_self',
        linkText: 'Подробнее',
        additionalParams: [],
    };

    renderBadges = (): React.ReactNode => (
        <div className={cn('badges')}>
            {this.props.badges!.map((badge, index) =>
                <div key={`${badge.title}${index}`} className={cn('badge', { type: badge.code })}>
                    {badge.hint
                        ? this.renderTooltip(badge.title, badge.hint)
                        : <div className={cn('badge-title')}>{badge.title}</div>
                    }
                </div>
            )}
        </div>
    )

    renderTooltip = (title: string, hint: string): React.ReactNode => {
        const triggerElement = React.createRef<HTMLDivElement>();

        return(
            <>
                <div ref={triggerElement} className={cn('badge-title', { 'tooltip': true })}>{title}</div>
                <Tooltip
                    className={cn('badge-tooltip')}
                    placement="right"
                    triggerElement={triggerElement}
                >
                    <div dangerouslySetInnerHTML={{ __html: hint }} />
                </Tooltip>
            </>
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
            classNameParams, classNameParamsItem, linkTarget,
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
                        target={linkTarget}
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
