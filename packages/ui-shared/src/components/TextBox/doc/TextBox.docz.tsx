import * as React from 'react';
import { Header, Paragraph, List, ListItem, Link } from '@megafon/ui-core';
import Heart from '@megafon/ui-icons/basic-16-heart_16.svg';
import Like from '@megafon/ui-icons/basic-16-like_16.svg';
import Star from '@megafon/ui-icons/basic-16-promo_16.svg';
import TextBoxPicture from '../TextBoxPicture';
import Image from './i/img.png';

export const Content = (): JSX.Element => (
    <>
        <Header as="h3" margin>
            В рамках системы Личный кабинет (Сервис-Гид) (WEB) Вам доступны следующие возможности:
        </Header>
        <Paragraph>
            Услуга SMS (Short Message Service) позволяет обмениваться с телефона небольшими текстовыми сообщениями. Вы
            можете отправить SMS-сообщение даже на городской телефон. Услуга «Голосовое SMS» превратит обычное текстовое
            сообщение в голосовое и зачитает его адресату.
        </Paragraph>
        <Header as="h3" margin>
            В рамках системы Личный кабинет (Сервис-Гид) (WEB) Вам доступны следующие возможности:
        </Header>
        <Header as="h5" margin>
            Путешествуй без забот
        </Header>
        <TextBoxPicture url={Image} />
        <Paragraph>
            Бесплатные входящие вызовы и безлимитные звонки на номера московского МегаФона, минуты и SMS по России.
            <Link href="https://megafon.ru">Click me</Link>
        </Paragraph>
        <List>
            <ListItem>Тарифы</ListItem>
            <ListItem>Интернет</ListItem>
            <ListItem>Связь</ListItem>
            <ListItem>Услуги</ListItem>
        </List>
        <Paragraph size="small">Доступно для: WhatsApp, Viber, eMotion, Facebook Messenger, Telegram, ТамТам</Paragraph>
    </>
);

export const ContentForExampleWithPicture = (): JSX.Element => (
    <Paragraph>
        Услуга SMS (Short Message Service) позволяет обмениваться с телефона небольшими текстовыми сообщениями. Вы
        можете отправить SMS-сообщение даже на городской телефон. Услуга «Голосовое SMS» превратит обычное текстовое
        сообщение в голосовое и зачитает его адресату.
    </Paragraph>
);

export const textWithIconItems = [
    {
        text: 'Привлечение новых клиентов и повышение лояльности действующих',
        icon: <Heart style={{ fill: '#00B956' }} />,
    },
    {
        text: 'Специальные предложения для ваших клиентов',
        icon: <Star style={{ fill: '#00B956' }} />,
    },
    {
        text: 'Понятная и простая реализация партнерства',
        icon: <Like style={{ fill: '#00B956' }} />,
    },
];
