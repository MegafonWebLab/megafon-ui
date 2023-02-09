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
} as const;

type ThemeType = typeof Theme[keyof typeof Theme];

export const DeviceMask = {
    ANDROID: 'android',
    NEW_IPHONE: 'new-iphone',
    BLACK_IPHONE: 'black-iphone',
    WHITE_IPHONE: 'white-iphone',
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
    /** Ссылка на скачивание приложения в Huawei Store */
    linkHuawei?: LinkHrefType;
    /** Обработчик клика по ссылке в Huawei Store */
    onClickHuawei?: LinkOnClickType;
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
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        appleLink?: string;
        googleLink?: string;
        huaweiLink?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        button?: Record<string, string>;
        linkApple?: Record<string, string>;
        linkGoogle?: Record<string, string>;
        linkHuawei?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-store-banner');
const StoreBanner: React.FC<IStoreBannerProps> = ({
    className,
    classes: {
        root: rootClassName,
        appleLink: appleLinkClassName,
        googleLink: googleLinkClassName,
        huaweiLink: huaweiLinkClassName,
    } = {},
    title,
    text,
    linkApple,
    linkGoogle,
    linkHuawei,
    linkButton,
    textButton = 'Установите приложение',
    rel,
    qrCode,
    imageSrc,
    theme = 'default',
    deviceMask,
    rootRef,
    dataAttrs,
    onClickApple,
    onClickGoogle,
    onClickHuawei,
}) => (
    <div
        className={cn({ theme, mask: deviceMask }, [className, rootClassName])}
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
    linkGoogle: PropTypes.string,
    onClickGoogle: PropTypes.func,
    linkHuawei: PropTypes.string,
    onClickHuawei: PropTypes.func,
    textButton: PropTypes.string,
    linkButton: PropTypes.string,
    rel: PropTypes.string,
    qrCode: PropTypes.string,
    deviceMask: PropTypes.oneOf(Object.values(DeviceMask)).isRequired,
    imageSrc: PropTypes.string.isRequired,
    className: PropTypes.string,
    classes: PropTypes.shape({
        appleLink: PropTypes.string,
        googleLink: PropTypes.string,
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
        linkGoogle: PropTypes.objectOf(PropTypes.string.isRequired),
        linkHuawei: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default StoreBanner;
