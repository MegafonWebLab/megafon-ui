import React, { createRef } from 'react';
import { mount, shallow } from 'enzyme';
import Button, { IButtonProps } from './Button';
import { detectTouch } from '@megafon/ui-helpers';
import Balance from '@megafon/ui-icons/dist/basic-24-balance_24.svg';

jest.mock('@megafon/ui-helpers', () => ({
    ...jest.requireActual('@megafon/ui-helpers'),
    detectTouch: jest.fn().mockReturnValue(false),
}));

const props: IButtonProps = {
    className: 'class',
    dataAttrs: {
        'data-test': 'test',
        'incorrect-attr': 'test',
    },
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
const cn = '.mfui-beta-button';

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

            const wrapper = shallow(<Button />);

            expect(wrapper).toMatchSnapshot();
        });

        it('it renders children', () => {
            const wrapper = shallow(<Button {...props}>button</Button>);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with different height for resolutions', () => {
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

        it('should render with arrow icon on the right', () => {
            const wrapper = shallow(<Button showArrow>arrow</Button>);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with custom icon', () => {
            const wrapper = shallow(<Button icon={<Balance />} />);

            expect(wrapper.exists(`${cn}_content-type_icon`)).toBeTruthy();
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with custom icon and children', () => {
            const wrapper = shallow(<Button icon={<Balance />}>left icon</Button>);

            expect(wrapper.exists(`${cn}_content-type_icon-text`)).toBeTruthy();
            expect(wrapper).toMatchSnapshot();
        });

        it('should render with custom icon and without arrow icon on the right', () => {
            const wrapper = shallow(<Button showArrow icon={<Balance />}>left icon</Button>);
            expect(wrapper.exists(`${cn}__icon-arrow`)).toBeFalsy();
        });

        it('should render tag button with disabled state', () => {
            const wrapper = shallow(<Button disabled href={undefined} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render tag a with disabled state', () => {
            const wrapper = shallow(<Button disabled href="test" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render tag with target _self and without rel attribute', () => {
            const wrapper = shallow(<Button href="test" target="_self" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render tag without target, href and rel attribute', () => {
            const wrapper = shallow(<Button rel="nofollow" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render tag without target and with rel attribute', () => {
            const wrapper = shallow(<Button href="test" rel="nofollow" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render tag "a" with download attribute', () => {
            const wrapper = shallow(<Button href="test" download />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render green theme when type is "primary" and theme is "black"', () => {
            const wrapper = shallow(<Button type="primary" theme="black" />);
            expect(wrapper.exists(`${cn}_theme_green`)).toBeTruthy();
        });
    });

    describe('snapshots with loader', () => {
        it('it renders loader with white color and medium size on all resolutions', () => {
            const wrapper = shallow(<Button {...props} showLoader />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render loader with default color', () => {
            const wrapper = shallow(<Button type="outline" theme="purple" showLoader />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render loader with black color', () => {
            const wrapper = shallow(<Button type="outline" theme="black" showLoader />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render loader with small size on mobile resolution and medium size on the rest', () => {
            const wrapper = shallow(
                <Button
                    sizeWide="large"
                    sizeDesktop="large"
                    sizeTablet="medium"
                    sizeMobile="small"
                    showLoader
                />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('should call onClick props', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Button onClick={onClick} />);

        wrapper.simulate('click');

        expect(onClick).toBeCalled();
    });

    it('should return a reference to the element', () => {
        const ref: React.RefObject<HTMLButtonElement> = createRef();

        mount(<Button buttonRef={ref} />);

        if (ref.current === null) {
            throw new Error('No ref');
        }

        expect(ref.current.type).toBe('button');
    });
});
