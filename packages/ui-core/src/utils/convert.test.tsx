import * as React from 'react';
import convertToReact, { TransformConfig } from './convert';

type NodeType = React.ReactElement & {
    type: {
        name: string;
    };
    props: {
        [key: string]: string;
    };
};

type TestHeaderProps = {
    type?: string;
    color?: string;
    margin?: string;
    className?: string;
};
const TestHeaderComponent: React.FC<TestHeaderProps> = ({
    type,
    color,
    margin,
    className,
    children,
}) => {
    const ElementType = type as React.ElementType;

    return (
        <ElementType className={className} style={{ color, margin }}>{children}</ElementType>
    );
};

type TestLinkProps = { href?: string; target?: string };
const TextLinkComponent: React.FC<TestLinkProps> = ({
    href,
    target,
    children,
}) => <a href={href} target={target}>{children}</a>;

const config: TransformConfig = {
    h: {
        component: TestHeaderComponent,
        props: ['type', 'color', 'margin'],
        customProps: { className: 'class-name', testAttr: 'test-attr'},
    },
    a: {
        component: TextLinkComponent,
        props: ['href', 'target'],
    },
};

describe('convertToReact', () => {
    test('should convert to <TextLinkComponent href="/test" target="_blank" />', () => {
        const converted = convertToReact('<a href="/test" target="_blank">link</a>', config);
        const node = converted[0] as NodeType;

        expect(Array.isArray(converted)).toBe(true);
        expect(node).toBeDefined();
        expect(node.type.name).toBe('TextLinkComponent');
        expect(node.props.href).toBe('/test');
        expect(node.props.target).toBe('_blank');
    });

    test('should convert to "<TestHeaderComponent as=h1 />"', () => {
        const converted = convertToReact('<h type="h1">title</h>', config);
        const node = converted[0] as NodeType;

        expect(Array.isArray(converted)).toBe(true);
        expect(node).toBeDefined();
        expect(node.type.name).toBe('TestHeaderComponent');
        expect(node.props.type).toBe('h1');
        expect(node.props.className).toBe('class-name');
    });

    test('should return empty array', () => {
        const converted = convertToReact('<div><h>title</h></div>', config);

        expect(Array.isArray(converted)).toBe(true);
        expect(converted.length).toBe(0);
    });

    test('should return only allowed tags', () => {
        const converted = convertToReact('<h type="h1">title<div></div></h>', config);

        expect(Array.isArray(converted)).toBe(true);
        expect(converted.length).toBe(1);
    });

    test('should cut forbidden props', () => {
        const converted = convertToReact(
            '<h type="h1" color="green" forbiddebProp="test" margin>title</h>',
            config
        );
        const node = converted[0] as NodeType;

        expect(Array.isArray(converted)).toBe(true);
        expect(node).toBeDefined();
        expect(node.type.name).toBe('TestHeaderComponent');
        expect(node.props.type).toBeDefined();
        expect(node.props.color).toBeDefined();
        expect(node.props.margin).toBeDefined();
        expect(node.props.forbiddebProp).toBeUndefined();
    });

    test('should support boolean props', () => {
        const converted = convertToReact('<h type="h1" margin="false">title</h>', config);
        const node = converted[0] as NodeType;

        expect(Array.isArray(converted)).toBe(true);
        expect(node.props.margin).toBe(false);
    });
});
