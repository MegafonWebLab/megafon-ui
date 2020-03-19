import * as React from 'react';
import Checked from 'icons/System/24/Checked_24.svg';

export const infoProps = {
    title: 'Включайся!',
    link: 'https://www.google.com/',
    description: 'Амедиатека',
    descriptionIcon: <Checked style={{ width: '40px', height: '40px'}}/>,
    additionalParams: [
        {
            value: '300',
            unit: 'минут',
            title: 'Звонки на все номера России',
        }, {
            value: '300',
            unit: 'SMS',
            title: 'SMS на номера Домашнего региона',
        }, {
            value: '4',
            unit: 'ГБ',
            title: 'На любые сервисы',
        },
    ],
};

export const featuresProps = {
    firstParam: {
        title: 'Безлимитный интернет',
        caption: 'на видео, соц-сети и мессенджеры',
    },
    secondParam: {
        children: [{
            title: 'Youtube, Rutube, Vimeo',
            svgIcon: (
            <Checked style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '32px',
                height: '32px',
                fill: '#00b956',
                pointerEvents: 'none',
            }}/>
            ),
        }],
    },
};

export const featuresIconsProps = {
    firstParam: {
        title: 'Безлимитный интернет',
        caption: 'на мессенджеры',
        children: [{
            svgIcon: <Checked style={{ width: '24px', height: '24px'}}/>,
            title: 'Youtube',
        }, {
            svgIcon: <Checked style={{ width: '24px', height: '24px'}}/>,
            title: 'VK',
        }, {
            svgIcon: <Checked style={{ width: '24px', height: '24px'}}/>,
            title: 'Mail',
        }, {
            svgIcon: <Checked style={{ width: '24px', height: '24px'}}/>,
            title: 'Google',
        }, {
            svgIcon: <Checked style={{ width: '24px', height: '24px'}}/>,
            title: 'Yandex',
        }, {
            svgIcon: <Checked style={{ width: '24px', height: '24px'}}/>,
            title: 'Snapchat',
        }, {
            svgIcon: <Checked style={{ width: '24px', height: '24px'}}/>,
            title: 'WhatsApp',
        }],
    },
    secondParam: {
        title: 'Бесплатно',
        children: [
        {
            title: 'Безлимитный интернет',
            caption: 'на видео, соц-сети и мессенджеры',
            svgIcon: (
                <Checked style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '32px',
                    height: '32px',
                    fill: '#00b956',
                    pointerEvents: 'none',
                }}/>
            ),
        }],
    },
};

export const totalProps = {
    payment: {
        value: '600 ₽',
        unit: 'в месяц',
    },
    onSubmit() {},
};

export const oldTotalProps = {
    payment: {
        value: '600 ₽',
        oldValue: '750 ₽',
        unit: 'в месяц',
    },
    onClickMore() {},
    onClickConnect() {},
};
