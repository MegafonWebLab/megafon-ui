import React from 'react';
import convertToReact, { Config } from 'utils/convert';
import Header from '../components/Header/Header';

const config: Config = {
    h: {
        component: Header,
        props: ['as', 'color', 'margin', 'hAlign'],
    },
};

describe('convertToReact', () => {
    test('should convert to <Header as=h1 />', () => {
        const converted: React.ReactNode = convertToReact(
            '<h as="h1">title</h>',
            config
        );

        expect(Array.isArray(converted)).toBe(true);
        expect(converted[0]).toBeDefined();
        expect(converted[0].type.name).toBe('Header');
        expect(converted[0].props.as).toBe('h1');
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
