import * as React from 'react';
import convertToReact, { TransformConfig } from './convert';
import Header from '../components/Header/Header';
import Link from '../components/Link/Link';

type NodeType = React.ReactElement & {
    type: {
        name: string;
    };
    props: {
        [key: string]: string;
    };
};

const config: TransformConfig = {
    h: {
        component: Header,
        props: ['as', 'color', 'margin', 'hAlign'],
        customProps: { className: 'class-name', testAttr: 'test-attr'},
    },
    a: {
        component: Link,
        props: ['href', 'target'],
    },
};

describe('convertToReact', () => {
    test('should convert to <Link href="/test" target="_blank" />', () => {
        const converted = convertToReact('<a href="/test" target="_blank">link</a>', config);
        const node = converted[0] as NodeType;

        expect(Array.isArray(converted)).toBe(true);
        expect(node).toBeDefined();
        expect(node.type.name).toBe('Link');
        expect(node.props.href).toBe('/test');
        expect(node.props.target).toBe('_blank');
    });

    test('should convert to "<Header as=h1 />"', () => {
        const converted = convertToReact('<h as="h1">title</h>', config);
        const node = converted[0] as NodeType;

        expect(Array.isArray(converted)).toBe(true);
        expect(node).toBeDefined();
        expect(node.type.name).toBe('Header');
        expect(node.props.as).toBe('h1');
        expect(node.props.className).toBe('class-name');
        expect(node.props.testAttr).toBe('test-attr');
    });

    test('should return empty array', () => {
        const converted = convertToReact('<div><h>title</h></div>', config);

        expect(Array.isArray(converted)).toBe(true);
        expect(converted.length).toBe(0);
    });

    test('should return only allowed tags', () => {
        const converted = convertToReact('<h as="h1">title<div></div></h>', config);

        expect(Array.isArray(converted)).toBe(true);
        expect(converted.length).toBe(1);
    });

    test('should cut forbidden props', () => {
        const converted = convertToReact(
            '<h as="h1" color="green" forbiddebProp="test" margin>title</h>',
            config
        );
        const node = converted[0] as NodeType;

        expect(Array.isArray(converted)).toBe(true);
        expect(node).toBeDefined();
        expect(node.type.name).toBe('Header');
        expect(node.props.as).toBeDefined();
        expect(node.props.color).toBeDefined();
        expect(node.props.margin).toBeDefined();
        expect(node.props.forbiddebProp).toBeUndefined();
    });

    test('should support boolean props', () => {
        const converted = convertToReact('<h as="h1" margin="false">title</h>', config);
        const node = converted[0] as NodeType;

        expect(Array.isArray(converted)).toBe(true);
        expect(node.props.margin).toBe(false);
    });
});
