import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Steps from './Steps';
import StepsItem from './StepsItem';

describe('Steps', () => {
    it('should render component', () => {
        const wrapper = shallow(
            <Steps title="title" className="test-class">
                <StepsItem index={1} text="text" />
            </Steps>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(
            <Steps title="title" rootRef={ref}>
                <StepsItem index={1} text="text" />
            </Steps>,
        );

        expect(ref.current).not.toBeNull();
    });
});
