import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Instructions, {
    pictureMaskTypes,
    pictureAlignTypes,
    IInstructionsProps,
    InstructionItemType,
} from './Instructions';

type LocalWindowType = Omit<Window, 'innerWidth'> & {
    innerWidth: number;
};

const items: InstructionItemType[] = [
    {
        title: 'Test1',
        mediaUrl: 'ImgUrl1',
        isVideo: true,
    },
    {
        title: 'Test2',
        mediaUrl: 'ImgUrl2',
        isVideo: false,
    },
];

const props: IInstructionsProps = {
    title: 'Test instruction title',
    instructionItems: items,
};

describe('<Instructions />', () => {
    describe('desktop resolution', () => {
        it('should render with default props', () => {
            const wrapper = shallow(<Instructions {...props} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should render with right side picture', () => {
            const newProps = {
                ...props,
                pictureAlign: pictureAlignTypes.RIGHT,
            };

            const wrapper = shallow(<Instructions {...newProps} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should render with pictureMask', () => {
            const newProps = {
                ...props,
                pictureMask: pictureMaskTypes.BLACK_IPHONE,
            };

            const wrapper = shallow(<Instructions {...newProps} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should render with pictureMask Iphone 12', () => {
            const newProps = {
                ...props,
                pictureMask: pictureMaskTypes.IPHONE_12,
            };

            const wrapper = shallow(<Instructions {...newProps} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('active slide will be changed', () => {
            const wrapper = shallow(<Instructions {...props} />);

            wrapper.find('.mfui-instructions__articles-item').at(1).simulate('click');

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('mobile resolution', () => {
        const localWindow = window as LocalWindowType;
        const windowInnerWidth = window.innerWidth;

        localWindow.innerWidth = 1023;

        jest.spyOn(Date, 'now').mockImplementation(() => 1);

        afterAll(() => {
            jest.restoreAllMocks();
            localWindow.innerWidth = windowInnerWidth;
        });

        it('should render with default props', () => {
            const wrapper = mount(<Instructions {...props} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should rerender when window resize', () => {
            const wrapper = mount(<Instructions {...props} />);

            expect(wrapper).toMatchSnapshot();

            localWindow.innerWidth = 1280;

            act(() => {
                window.dispatchEvent(new Event('resize'));
            });

            wrapper.update();
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('should render component with additional text', () => {
        const wrapper = shallow(<Instructions {...props} additionalText="additionalText" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(<Instructions {...props} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });

    it('should render with classes props', () => {
        const wrapper = shallow(
            <Instructions
                {...props}
                classes={{
                    instructionItem: 'test-class_articleItem',
                    desktopInstructionItem: 'test-class_desktopInstructionItem',
                    mobileInstructionItem: 'test-class_mobileInstructionItem',
                    activeInstructionItem: 'test-class_activeArticleItem',
                    desktopItemTitle: 'desktopItemTitle',
                    mobileItemTitle: 'mobileItemTitle',
                    instructionItemImg: 'instructionItemImg',
                    additionalText: 'additionalText',
                }}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });
    it('should call getSwiper handler', () => {
        const handleSwiper = jest.fn();
        mount(<Instructions {...props} getSwiper={handleSwiper} />);

        expect(handleSwiper).toHaveBeenCalled();
    });
});
