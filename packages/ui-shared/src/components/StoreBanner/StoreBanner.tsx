/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { Grid, GridColumn, Header, Paragraph } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import * as React from 'react';
import StoreButton, { Theme as StoreButtonTheme, Props as StoreButtonPropsType } from '../StoreButton/StoreButton';
import './StoreBanner.less';

export const Theme = {
    CLEAR_WHITE: 'clearWhite',
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
    linkApple: LinkHrefType;
    /** Обработчик клика по ссылке в App Store */
    onClickApple?: LinkOnClickType;
    /** Ссылка на скачивание приложения в Google Play */
    linkGoogle: LinkHrefType;
    /** Обработчик клика по ссылке в Google Play */
    onClickGoogle?: LinkOnClickType;
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
    };
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
}
const cn: (
    param1?: string | Record<string, unknown>,
    param2?: (string | undefined)[] | Record<string, unknown> | string,
    param3?: string,
) => string = cnCreate('mfui-beta-store-banner');
const StoreBanner: React.FC<IStoreBannerProps> = ({
    title,
    text,
    linkApple,
    onClickApple,
    linkGoogle,
    onClickGoogle,
    qrCode,
    imageSrc,
    theme = Theme.CLEAR_WHITE,
    deviceMask,
    className,
    classes: { root: rootClassName, appleLink: appleLinkClassName, googleLink: googleLinkClassName } = {},
    rootRef,
    dataAttrs,
}) => (
    <div
        className={cn({ theme, mask: deviceMask }, [className, rootClassName])}
        ref={rootRef}
        {...filterDataAttrs(dataAttrs)}
    >
        <div className={cn('container')}>
            <div className={cn('grid')}>
                <Grid>
                    <GridColumn all="6" mobile="12" rightOffsetWide="1">
                        <div className={cn('content')}>
                            <Header as="h2" className={cn('title')} color="inherit">
                                {title}
                            </Header>
                            <Paragraph className={cn('text')} hasMargin={false} color="inherit">
                                {text}
                            </Paragraph>
                            <div className={cn('links')}>
                                {qrCode && <img src={qrCode} className={cn('qr-code')} alt="QR-код" />}
                                <div className={cn('stores')}>
                                    <StoreButton
                                        theme={StoreButtonTheme.APP_STORE}
                                        href={linkApple}
                                        onClick={onClickApple}
                                        className={cn('store-link', { 'app-store': true }, appleLinkClassName)}
                                    />
                                    <StoreButton
                                        theme={StoreButtonTheme.GOOGLE_PLAY}
                                        href={linkGoogle}
                                        className={cn('store-link', { 'google-play': true }, googleLinkClassName)}
                                        onClick={onClickGoogle}
                                    />
                                </div>
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
    linkApple: PropTypes.string.isRequired,
    onClickApple: PropTypes.func,
    linkGoogle: PropTypes.string.isRequired,
    onClickGoogle: PropTypes.func,
    qrCode: PropTypes.string,
    theme: PropTypes.oneOf(Object.values(Theme)),
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
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
};

export default StoreBanner;
