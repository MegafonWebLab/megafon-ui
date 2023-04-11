import * as React from 'react';
import { Button, Grid, GridColumn, Header, Paragraph } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs, convert, titleConvertConfig, textConvertConfig } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import StoreButton, { Theme as StoreButtonTheme, Props as StoreButtonPropsType } from '../StoreButton/StoreButton';
import './StoreBanner.less';

export const Theme = {
    DEFAULT: 'default',
    GREEN: 'green',
    SPB_SKY_1: 'spbSky1',
    SPB_SKY_0: 'spbSky0',
} as const;

type ThemeType = typeof Theme[keyof typeof Theme];

export const DeviceMask = {
    ANDROID: 'android',
    NEW_IPHONE: 'new-iphone',
    BLACK_IPHONE: 'black-iphone',
    WHITE_IPHONE: 'white-iphone',
    IPHONE_12: 'iphone-12',
} as const;

type DeviceMaskType = typeof DeviceMask[keyof typeof DeviceMask];

type LinkHrefType = StoreButtonPropsType['href'];
type LinkOnClickType = StoreButtonPropsType['onClick'];

export interface IStoreBannerProps {
    /** Заголовок */
    title: string;
    /** Текст */
    text: string;
    /** Ссылка на скачивание приложения в  App Store */
    linkApple?: LinkHrefType;
    /** Обработчик клика по ссылке в App Store */
    onClickApple?: LinkOnClickType;
    /** Ссылка на скачивание приложения в Google Play */
    linkGoogle?: LinkHrefType;
    /** Обработчик клика по ссылке в Google Play */
    onClickGoogle?: LinkOnClickType;
    /** Ссылка на скачивание приложения в Samsung Galaxy Store */
    linkGalaxyStore?: LinkHrefType;
    /** Обработчик клика по ссылке в Samsung Galaxy Store */
    onClickGalaxyStore?: LinkOnClickType;
    /** Ссылка на скачивание приложения в Huawei AppGallery */
    linkHuawei?: LinkHrefType;
    /** Обработчик клика по ссылке в Huawei AppGallery */
    onClickHuawei?: LinkOnClickType;
    /** Ссылка на скачивание приложения в RuStore */
    linkRuStore?: LinkHrefType;
    /** Обработчик клика по ссылке в RuStore */
    onClickRuStore?: LinkOnClickType;
    /** Ссылка на скачивание приложения в Mi App Store */
    linkMiStore?: LinkHrefType;
    /** Обработчик клика по ссылке в Mi App Store */
    onClickMiStore?: LinkOnClickType;
    /**  Текст кнопки */
    textButton?: string;
    /**  Ссылка для  кнопки */
    linkButton?: string;
    /**  Rel - атрибут тега <a> для всех кнопок баннера */
    rel?: string;
    /** Ссылка на картинку с QR-кодом */
    qrCode?: string;
    /** Цветовая тема компонента */
    theme?: ThemeType;
    /** Изображение телефона */
    deviceMask: DeviceMaskType;
    /** Изображение на дисплее телефона */
    imageSrc: string;
    /** Выравнивание контента слева на мобильном разрешении */
    isContentLeftMobile?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        appleLink?: string;
        galaxyStoreLink?: string;
        googleLink?: string;
        huaweiLink?: string;
        miStoreLink?: string;
        ruStoreLink?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        button?: Record<string, string>;
        linkApple?: Record<string, string>;
        linkGalaxyStore?: Record<string, string>;
        linkGoogle?: Record<string, string>;
        linkHuawei?: Record<string, string>;
        linkMiStore?: Record<string, string>;
        linkRuStore?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-store-banner');
const StoreBanner: React.FC<IStoreBannerProps> = ({
    className,
    classes: {
        root: rootClassName,
        appleLink: appleLinkClassName,
        galaxyStoreLink: galaxyStoreLinkClassName,
        googleLink: googleLinkClassName,
        huaweiLink: huaweiLinkClassName,
        miStoreLink: miStoreLinkClassName,
        ruStoreLink: ruStoreLinkClassName,
    } = {},
    title,
    text,
    linkApple,
    linkGalaxyStore,
    linkGoogle,
    linkHuawei,
    linkMiStore,
    linkRuStore,
    linkButton,
    textButton = 'Установите приложение',
    rel,
    qrCode,
    imageSrc,
    theme = 'default',
    deviceMask,
    isContentLeftMobile,
    rootRef,
    dataAttrs,
    onClickApple,
    onClickGalaxyStore,
    onClickGoogle,
    onClickHuawei,
    onClickMiStore,
    onClickRuStore,
}) => (
    <div
        className={cn({ theme, mask: deviceMask, 'content-left-mobile': isContentLeftMobile }, [
            className,
            rootClassName,
        ])}
        ref={rootRef}
        {...filterDataAttrs(dataAttrs?.root)}
    >
        <div className={cn('container')}>
            <div className={cn('grid')}>
                <Grid>
                    <GridColumn all="6" mobile="12" rightOffsetWide="1">
                        <div className={cn('content')}>
                            <Header as="h2" className={cn('title')} color="inherit">
                                {convert(title, titleConvertConfig)}
                            </Header>
                            <Paragraph className={cn('text')} hasMargin={false} color="inherit">
                                {convert(text, textConvertConfig)}
                            </Paragraph>
                            <div className={cn('links', { three: !!linkApple && !!linkGoogle && !!linkHuawei })}>
                                {!linkButton && qrCode && <img src={qrCode} className={cn('qr-code')} alt="QR-код" />}
                                {!linkButton && (
                                    <div className={cn('stores')}>
                                        {linkApple && (
                                            <StoreButton
                                                dataAttrs={{ root: dataAttrs?.linkApple }}
                                                theme={StoreButtonTheme.APP_STORE}
                                                href={linkApple}
                                                rel={rel}
                                                onClick={onClickApple}
                                                className={cn('store-link', { 'app-store': true }, appleLinkClassName)}
                                            />
                                        )}
                                        {linkGoogle && (
                                            <StoreButton
                                                dataAttrs={{ root: dataAttrs?.linkGoogle }}
                                                theme={StoreButtonTheme.GOOGLE_PLAY}
                                                href={linkGoogle}
                                                rel={rel}
                                                className={cn(
                                                    'store-link',
                                                    { 'google-play': true },
                                                    googleLinkClassName,
                                                )}
                                                onClick={onClickGoogle}
                                            />
                                        )}
                                        {linkRuStore && (
                                            <StoreButton
                                                dataAttrs={{ root: dataAttrs?.linkRuStore }}
                                                theme={StoreButtonTheme.RU_STORE}
                                                href={linkRuStore}
                                                rel={rel}
                                                className={cn('store-link', { 'ru-store': true }, ruStoreLinkClassName)}
                                                onClick={onClickRuStore}
                                            />
                                        )}
                                        {linkGalaxyStore && (
                                            <StoreButton
                                                dataAttrs={{ root: dataAttrs?.linkGalaxyStore }}
                                                theme={StoreButtonTheme.GALAXY_STORE}
                                                href={linkGalaxyStore}
                                                rel={rel}
                                                className={cn(
                                                    'store-link',
                                                    { 'mi-store': true },
                                                    galaxyStoreLinkClassName,
                                                )}
                                                onClick={onClickGalaxyStore}
                                            />
                                        )}
                                        {linkHuawei && (
                                            <StoreButton
                                                dataAttrs={{ root: dataAttrs?.linkHuawei }}
                                                theme={StoreButtonTheme.HUAWEI_STORE}
                                                href={linkHuawei}
                                                rel={rel}
                                                className={cn(
                                                    'store-link',
                                                    { 'huawei-store': true },
                                                    huaweiLinkClassName,
                                                )}
                                                onClick={onClickHuawei}
                                            />
                                        )}
                                        {linkMiStore && (
                                            <StoreButton
                                                dataAttrs={{ root: dataAttrs?.linkMiStore }}
                                                theme={StoreButtonTheme.MI_STORE}
                                                href={linkMiStore}
                                                rel={rel}
                                                className={cn('store-link', { 'mi-store': true }, miStoreLinkClassName)}
                                                onClick={onClickMiStore}
                                            />
                                        )}
                                    </div>
                                )}
                                {linkButton && (
                                    <Button
                                        dataAttrs={{ root: dataAttrs?.button }}
                                        className={cn('button')}
                                        href={linkButton}
                                        rel={rel}
                                        theme={theme === 'green' ? 'purple' : 'green'}
                                    >
                                        {textButton}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn all="4" desktop="6" tablet="6" mobile="12">
                        <div className={cn('device-wrapper')}>
                            <div className={cn('device-mask')} />
                            <img
                                src={imageSrc}
                                className={cn('screen')}
                                alt="Изображение приложения на экране телефона"
                            />
                        </div>
                    </GridColumn>
                </Grid>
            </div>
        </div>
    </div>
);

StoreBanner.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    linkApple: PropTypes.string,
    onClickApple: PropTypes.func,
    linkGalaxyStore: PropTypes.string,
    onClickGalaxyStore: PropTypes.func,
    linkGoogle: PropTypes.string,
    onClickGoogle: PropTypes.func,
    linkHuawei: PropTypes.string,
    onClickHuawei: PropTypes.func,
    linkMiStore: PropTypes.string,
    onClickMiStore: PropTypes.func,
    linkRuStore: PropTypes.string,
    onClickRuStore: PropTypes.func,
    textButton: PropTypes.string,
    linkButton: PropTypes.string,
    rel: PropTypes.string,
    qrCode: PropTypes.string,
    deviceMask: PropTypes.oneOf(Object.values(DeviceMask)).isRequired,
    imageSrc: PropTypes.string.isRequired,
    className: PropTypes.string,
    classes: PropTypes.shape({
        appleLink: PropTypes.string,
        galaxyStoreLink: PropTypes.string,
        googleLink: PropTypes.string,
        huaweiLink: PropTypes.string,
        miStoreLink: PropTypes.string,
        ruStoreLink: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    theme: PropTypes.oneOf(Object.values(Theme)),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        button: PropTypes.objectOf(PropTypes.string.isRequired),
        linkApple: PropTypes.objectOf(PropTypes.string.isRequired),
        linkGalaxyStore: PropTypes.objectOf(PropTypes.string.isRequired),
        linkGoogle: PropTypes.objectOf(PropTypes.string.isRequired),
        linkHuawei: PropTypes.objectOf(PropTypes.string.isRequired),
        linkMiStore: PropTypes.objectOf(PropTypes.string.isRequired),
        linkRuStore: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default StoreBanner;
