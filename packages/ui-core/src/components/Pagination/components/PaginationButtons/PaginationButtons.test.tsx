import React from 'react';
import { shallow } from 'enzyme';
import PaginationButtons from './PaginationButtons';

const hiddenButton = 'hidden';
const items = [1, hiddenButton, 4, 5];

describe('PaginationButtons', () => {
    it('should render component', () => {
        const wrapper = shallow(
            <PaginationButtons
                items={items}
                onClick={jest.fn()}
                activeButton={4}
                hiddenButton={hiddenButton}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call click handler', () => {
        const clickHandler = jest.fn();

        const wrapper = shallow(
            <PaginationButtons
                items={items}
                onClick={clickHandler}
                activeButton={4}
                hiddenButton={hiddenButton}
            />
        );
        const button = wrapper.find('PaginationButton').first();

        button.simulate('click');

        expect(clickHandler).toHaveBeenCalled();
    });
});
