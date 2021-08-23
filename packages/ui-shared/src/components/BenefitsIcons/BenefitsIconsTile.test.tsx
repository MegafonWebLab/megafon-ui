import { shallow } from 'enzyme';
import Checked from 'icons/System/24/Checked_24.svg';
import * as React from 'react';
import BenefitsIconsTile, { IBenefitsIconsTile } from './BenefitsIconsTile';
import { IconPositionEnum } from './types';

const props: IBenefitsIconsTile = {
    title: 'title',
    text: 'text',
    iconPosition: IconPositionEnum.LEFT_SIDE,
    icon: <Checked />,
    className: 'class-name',
};

describe('<BenefitsIconsTile />', () => {
    it('renders BenefitsIconsTile', () => {
        const wrapper = shallow(<BenefitsIconsTile {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders BenefitsIconsTile without title', () => {
        const wrapper = shallow(<BenefitsIconsTile {...props} title={undefined} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders BenefitsIconsTile without text', () => {
        const wrapper = shallow(<BenefitsIconsTile {...props} text={undefined} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders BenefitsIconsTile with react node in text field', () => {
        const newProps = {
            ...props,
            text: [<div key="test">test</div>],
        };

        const wrapper = shallow(<BenefitsIconsTile {...newProps} />);
        expect(wrapper).toMatchSnapshot();
    });
});
