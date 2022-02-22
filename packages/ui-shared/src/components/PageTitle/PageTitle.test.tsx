import React from 'react';
import { shallow, mount } from 'enzyme';
import PageTitle from './PageTitle';

const breadcrumbs = [
    {
        title: 'Тарифы',
        href: '#',
    },
    {
        title: 'Управляй !',
        href: '#',
    },
    {
        title: 'Менеджер',
        href: '#',
    },
];

const badge = 'badge';

describe('PageTitle', () => {
    it('should render component', () => {
        const wrapper = shallow(<PageTitle title="title" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with optional props', () => {
        const wrapper = shallow(
            <PageTitle
                title="title"
                breadcrumbs={breadcrumbs}
                badge={badge}
                className="custom-class-name"
                classes={{ breadcrumbs: 'breadcrumbs-custom-class-name' }}
                dataAttrs={{
                    root: { 'data-testid': 'root-test' },
                    breadcrumbs: { 'data-testid': 'breadcrumbs-test' },
                    breadcrumbsLink: { 'data-testid': 'breadcrumbsLink-test' },
                }}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with limited width', () => {
        const wrapper = shallow(
            <PageTitle title="title" breadcrumbs={breadcrumbs} badge={badge} isFullWidth={false} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should return ref to component', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        const wrapper = mount(<PageTitle title="title" rootRef={ref} />);
        const rootNode = wrapper.getDOMNode();

        expect(ref.current).toBe(rootNode);
    });
});
