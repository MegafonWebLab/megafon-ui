import * as React from 'react';
import { shallow } from 'enzyme';
import Tile, { ITileProps, Theme, Radius, Shadow } from './Tile';

const props: ITileProps = {
    className: 'test-class',
    href: 'test-link',
    theme: Theme.DARK,
    radius: Radius.ROUNDED,
    shadowLevel: Shadow.HIGH,
    isInteractive: true,
    onClick: jest.fn(),
    target: '_blank',
};

describe('<Tile />', () => {
    describe('snapshots', () => {
        it('renders component', () => {
            const wrapper = shallow(<Tile>Some test content</Tile>);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders component with props', () => {
            const wrapper = shallow(<Tile {...props}>Some test content</Tile>);
            expect(wrapper).toMatchSnapshot();
        });

        it('it renders with data attributes', () => {
            const wrapper = shallow(<Tile dataAttrs={{ root: { 'data-test': 'test', 'incorrect-attr': 'test' } }} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handlers', () => {
        it('calls onClick', () => {
            const handleClick = jest.fn();

            const wrapper = shallow(<Tile onClick={handleClick}>Some test content</Tile>);

            wrapper.simulate('click');
            expect(handleClick).toBeCalled();
        });
    });
});
