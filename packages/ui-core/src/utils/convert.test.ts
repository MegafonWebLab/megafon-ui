import React from 'react';
import convertToReact, { TransformConfig } from './convert';
import Header from '../components/Header/Header';
import Link from '../components/Link/Link';

const config: TransformConfig = {
    h: {
        component: Header,
        props: ['as', 'color', 'margin', 'hAlign'],
        className: 'class-name',
    },
    a: {
        component: Link,
        props: ['href', 'target'],
    },
};

describe('convertToReact', () => {
    test('should convert to <Link href="/test" target="_blank" />', () => {
        const converted: React.ReactNode = convertToReact(
            '<a href="/test" target="_blank">link</a>',
            config
        );

        expect(Array.isArray(converted)).toBe(true);
        expect(converted[0]).toBeDefined();
        expect(converted[0].type.name).toBe('Link');
        expect(converted[0].props.href).toBe('/test');
        expect(converted[0].props.target).toBe('_blank');
    });

    test('should convert to <Header as=h1 />', () => {
        const converted: React.ReactNode = convertToReact(
            '<h as="h1">title</h>',
            config
        );

        expect(Array.isArray(converted)).toBe(true);
        expect(converted[0]).toBeDefined();
        expect(converted[0].type.name).toBe('Header');
        expect(converted[0].props.as).toBe('h1');
        expect(converted[0].props.className).toBe('class-name');
    });

    test('should return empty array', () => {
        const converted: React.ReactNode[] = convertToReact(
            '<div><h>title</h></div>',
            config
        );

        expect(Array.isArray(converted)).toBe(true);
        expect(converted.length).toBe(0);
    });

    test('should return only allowed tags', () => {
        const converted: React.ReactNode[] = convertToReact(
            '<h as="h1">title<div></div></h>',
            config
        );

        expect(Array.isArray(converted)).toBe(true);
        expect(converted.length).toBe(1);
    });

    test('should cut forbidden props', () => {
        const converted: React.ReactNode = convertToReact(
            '<h as="h1" color="green" forbiddebProp="test" margin>title</h>',
            config
        );

        expect(Array.isArray(converted)).toBe(true);
        expect(converted[0]).toBeDefined();
        expect(converted[0].type.name).toBe('Header');
        expect(converted[0].props.as).toBeDefined();
        expect(converted[0].props.color).toBeDefined();
        expect(converted[0].props.margin).toBeDefined();
        expect(converted[0].props.forbiddebProp).toBeUndefined();
    });
});
