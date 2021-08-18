import * as React from 'react';
import { shallow } from 'enzyme';
import { IconPositionEnum } from './types';
import BenefitsIconsTile, { IBenefitsIconsTile } from './BenefitsIconsTile';
import Checked from '@megafon/ui-icons/dist/system-24-checked_24.svg';

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
