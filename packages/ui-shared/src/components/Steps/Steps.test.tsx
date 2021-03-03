import * as React from 'react';
import { shallow } from 'enzyme';
import Steps, { ISteps } from './Steps';

const props: ISteps = {
    title: 'title',
    items: [
        {
            text: 'text-1',
        },
        {
            text: 'text with <a href="#" target="_self">link</a>',
        },
        {
            text: 'bold <b>text</b>',
        },
    ],
};

describe('Steps', () => {
    it('should render component', () => {
        const wrapper = shallow(<Steps {...props} />);

        expect(wrapper).toMatchSnapshot();
    });
});
