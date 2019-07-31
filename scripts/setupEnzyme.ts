import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

configure({ adapter: new EnzymeAdapter() });

const globalTyped: any = global;

const matchMediaPolyfill = query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
});

globalTyped.matchMedia = globalTyped.matchMedia || matchMediaPolyfill;
