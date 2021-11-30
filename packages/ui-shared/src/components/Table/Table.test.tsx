import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { mount, shallow } from 'enzyme';
import Table, { ITable } from './Table';
import TableCell from './TableCell';
import TableRow from './TableRow';

const cn = cnCreate('mfui-table');

const props = {
    className: 'custom-class',
    fixColumn: false,
    minCellSize: 'small',
} as ITable;

describe('<Table />', () => {
    it('should render with default props', () => {
        const wrapper = shallow(
            <Table>
                <TableRow head>
                    <TableCell>Заголовок 1</TableCell>
                    <TableCell>Заголовок 2</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Текст 1</TableCell>
                    <TableCell>Текст 2</TableCell>
                </TableRow>
            </Table>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(
            <Table {...props}>
                <TableRow head>
                    <TableCell>Заголовок 1</TableCell>
                    <TableCell>Заголовок 2</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Текст 1</TableCell>
                    <TableCell>Текст 2</TableCell>
                </TableRow>
            </Table>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render cells as converted string with nbsp', () => {
        const wrapper = shallow(
            <Table {...props}>
                <TableRow head>
                    <TableCell>Заголовок&nbsp;1</TableCell>
                    <TableCell>Заголовок&nbsp;2</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Текст&nbsp;1</TableCell>
                    <TableCell>Текст&nbsp;2</TableCell>
                </TableRow>
            </Table>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render cells as react node', () => {
        const wrapper = shallow(
            <Table {...props}>
                <TableRow head>
                    <TableCell>
                        <span>Заголовок 1</span>
                    </TableCell>
                    <TableCell>
                        <span>Заголовок 2</span>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <span>Текст 2</span>
                    </TableCell>
                    <TableCell>
                        <span>Текст 2</span>
                    </TableCell>
                </TableRow>
            </Table>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with touch mod', () => {
        const onTouchStart = window.ontouchstart;
        window.ontouchstart = jest.fn();

        const wrapper = mount(
            <Table>
                <TableRow head>
                    <TableCell>Заголовок 1</TableCell>
                    <TableCell>Заголовок 2</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Текст 1</TableCell>
                    <TableCell>Текст 2</TableCell>
                </TableRow>
            </Table>,
        );

        expect(wrapper.children().hasClass(`${cn()}_touch`)).toBeTruthy();

        window.ontouchstart = onTouchStart;
    });
});
