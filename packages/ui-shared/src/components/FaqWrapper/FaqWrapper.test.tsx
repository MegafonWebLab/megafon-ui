import * as React from 'react';
import { render } from '@testing-library/react';
import FaqWrapper from './FaqWrapper';

describe('<FaqWrapper />', () => {
    it('should render FaqWrapper', () => {
        const { container } = render(<FaqWrapper>children</FaqWrapper>);

        expect(container).toMatchSnapshot();
    });
});
