import * as React from 'react';
import { mount } from 'enzyme';
import SelectItem from './SelectItem';

describe('<SelectItem />', () => {
    it('it renders SelectItem', () => {
        const wrapper = mount(<SelectItem value={1} />);
        expect(wrapper).toMatchSnapshot();
    });

//     it('it renders right icon', () => {
//         const wrapper = mount(<SelectItem {...props} />);
//         expect(wrapper).toMatchSnapshot();
//     });

//     it('it renders left icon', () => {
//         const wrapper = mount(<SelectItem {...props} />);
//         expect(wrapper).toMatchSnapshot();
//     });

//     it('it calls hover handler', () => {
//         const onHover = jest.fn();
//         const wrapper = mount(<SelectItem {...props} onHover={onHover} />);
//         wrapper.simulate('mouseenter');
//         expect(onHover.mock.calls).toHaveLength(1);
//     });

//     it('it calls select handler', () => {
//         const onSelect = jest.fn();
//         const wrapper = mount(<SelectItem {...props} onSelect={onSelect} />);
//         wrapper.simulate('click');
//         expect(onSelect.mock.calls).toHaveLength(1);
//     });

//     it('it checks shouldComponentUpdate', () => {
//         const wrapper = mount(<SelectItem {...props} />);
//         wrapper.setProps({
//             ...props,
//             active: true,
//         });
//         expect(wrapper).toMatchSnapshot();
//     });

//     it('it checks shouldComponentUpdate return false', () => {
//         const wrapper = mount(<SelectItem {...props} />);
//         wrapper.setProps(props);
//         expect(wrapper).toMatchSnapshot();
// });
});
