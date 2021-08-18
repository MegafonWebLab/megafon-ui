/* eslint-disable @typescript-eslint/no-empty-function */
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalTyped: any = global;

const matchMediaPolyfill = () => () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
});

globalTyped.matchMedia = globalTyped.matchMedia || matchMediaPolyfill;
