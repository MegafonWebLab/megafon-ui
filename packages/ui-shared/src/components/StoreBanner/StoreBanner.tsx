import * as React from 'react';
import { cnCreate, Grid, GridColumn, Header, Paragraph, Link } from '@megafon/ui-core';
import './StoreBanner.less';
import appStoreImage from './img/app-store.png';
import googlePlayImage from './img/google-play.png';

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
};

type DeviceMaskType = typeof DeviceMask[keyof typeof DeviceMask];

export interface IStoreBannerProps {
    /** Заголовок */
    title: string;
    /** Текст */
    text: string;
    /** Ссылка на App Store */
    linkApple: string;
    /** Ссылка на Google Play */
    linkGoogle: string;
    /** QR-код */
    qrCode?: string;
    /** Цветовая тема компонента */
    theme?: ThemeType;
    /** Изображение телефона */
    deviceMask: DeviceMaskType;
    /** Изображение на дисплее телефона */
    imageSrc: string;
}

const cn = cnCreate('mfui-beta-store-banner');
const StoreBanner: React.FC<IStoreBannerProps> = ({
    title,
    text,
    linkApple,
    linkGoogle,
    qrCode,
    imageSrc,
    theme = Theme.CLEAR_WHITE,
    deviceMask,
}) => (
    <div className={cn({ theme, mask: deviceMask })}>
        <div className={cn('container')}>
            <Grid className={cn('grid')}>
                <GridColumn
                        all="6"
                        mobile="12"
                        rightOffsetWide="1"
                        className={cn('content-wrapper')}
                >
                    <div className={cn('content')}>
                        <Header as="h2" className={cn('title')} color="inherit">
                            {title}
                        </Header>
                        <Paragraph className={cn('text')} hasMargin={false} color="inherit">
                            {text}
                        </Paragraph>
                        <div className={cn('links')}>
                            {qrCode && (
                                <img src={qrCode} className={cn('qr-code')} alt="QR-код"/>
                            )}
                            <div className={cn('stores')}>
                                <Link href={linkApple} className={cn('store-link', { 'app-store': true })}>
                                    <img src={appStoreImage} alt="Ссылка на приложение в App Store"/>
                                </Link>
                                <Link href={linkGoogle} className={cn('store-link')}>
                                    <img src={googlePlayImage} alt="Ссылка на приложение в Google Play" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </GridColumn>
                <GridColumn all="4" desktop="6" tablet="6" mobile="12">
                    <div className={cn('device-wrapper')}>
                        <div className={cn('device')}>
                            <img
                                src={imageSrc}
                                className={cn('screen')}
                                alt="Изображение приложения на экране телефона"
                            />
                        </div>
                    </div>
                </GridColumn>
            </Grid>
        </div>
    </div>
);

export default StoreBanner;
