import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const globalTyped: any = global;

const matchMediaPolyfill = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
});

globalTyped.matchMedia = globalTyped.matchMedia || matchMediaPolyfill;
