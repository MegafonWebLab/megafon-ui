import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Select from './Select';

const props = {
    className: 'test-class',
    label: 'test-label',
    labelId: '1',
    noticeText: 'test-notice-text',
    required: true,
    placeholder: 'test-placeholder',
    classes: {
        control: 'test-control-class',
        root: 'test-root-class',
    },
    items: [
        {
            value: 1,
            title: 'test-name-1',
        },
        {
            value: 2,
            title: 'test-name-2',
        },
    ],
    dataAttrs: {
        'data-test': 'test',
        'incorrect-attr': 'test',
    },
};

const controlSelector = '.mfui-beta-select__control';
describe('<Select />', () => {
    it('it renders Select', () => {
        const wrapper = mount(<Select items={props.items} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with disabled state', () => {
        const handleClick = jest.fn();
        const wrapper = shallow(<Select items={[]} isDisabled />);

        wrapper.find(controlSelector).simulate('click');
        expect(handleClick).not.toHaveBeenCalled();
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with data attributes', () => {
        const wrapper = shallow(<Select dataAttrs={props.dataAttrs} />);
        expect(wrapper).toMatchSnapshot();
    });
});
