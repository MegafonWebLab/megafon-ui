import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

configure({ adapter: new EnzymeAdapter() });

const globalTyped: any = global;

const matchMediaPolyfill = () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
});

globalTyped.matchMedia = globalTyped.matchMedia || matchMediaPolyfill;
