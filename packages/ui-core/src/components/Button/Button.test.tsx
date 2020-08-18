import * as React from 'react';
import { shallow } from 'enzyme';
import Button, { IButtonProps } from './Button';
import detectTouch from '../../utils/detectTouch';
import Balance from 'icons/Basic/24/Balance_24.svg';

jest.mock('../../utils/detectTouch', () => jest.fn().mockReturnValue(false));

const props: IButtonProps = {
    classes: {
        root: 'root-class',
        content: 'content-class',
    },
    theme: 'purple',
    type: 'primary',
    href: 'any',
    target: '_blank',
    actionType: 'reset',
    sizeAll: 'large',
};

describe('<Button />', () => {
    afterAll(() => jest.restoreAllMocks());

    describe('layout', () => {
        it('renders Button with default props', () => {
            const wrapper = shallow(<Button />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders Button with props', () => {
            const wrapper = shallow(<Button {...props} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('it renders Button on touch devices', () => {
            (detectTouch as jest.Mock).mockReturnValueOnce(true);

            const SomeButton = require('./Button').default;
            const wrapper = shallow(<SomeButton />);

            expect(wrapper).toMatchSnapshot();
        });

        it('it renders children', () => {
            const wrapper = shallow(<Button {...props} >button</Button>);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with different width for resolutions', () => {
            const wrapper = shallow(
                <Button
                    {...props}
                    sizeWide="large"
                    sizeDesktop="medium"
                    sizeTablet="medium"
                    sizeMobile="small"
                />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('should render full width button', () => {
            const wrapper = shallow(<Button {...props} fullWidth />);
            expect(wrapper).toMatchSnapshot();
        });

        it('it renders spinner', () => {
            const wrapper = shallow(<Button showSpinner />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with arrow', () => {
            const wrapper = shallow(<Button showArrow>arrow</Button>);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with left icon', () => {
            const wrapper = shallow(<Button showArrow iconLeft={<Balance />}>left icon</Button>);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render tag button with disabled state', () => {
            const wrapper = shallow(<Button disabled href={undefined} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render tag a with disabled state', () => {
            const wrapper = shallow(<Button disabled href="test" />);
            expect(wrapper).toMatchSnapshot();
        });

    });

    describe('handleClick', () => {
        it('calls when disabled is false', () => {
            const onClick = jest.fn();
            const preventDefault = jest.fn();
            const wrapper = shallow(<Button onClick={onClick} />);

            wrapper.simulate('click', { preventDefault });

            expect(onClick).toBeCalledWith({ preventDefault });
            expect(preventDefault).not.toBeCalled();
        });

        it('calls when disabled is true', () => {
            const onClick = jest.fn();
            const preventDefault = jest.fn();
            const wrapper = shallow(<Button disabled onClick={onClick} />);

            wrapper.simulate('click', { preventDefault });
            expect(onClick).not.toBeCalled();
            expect(preventDefault).toBeCalled();
        });
    });
});
