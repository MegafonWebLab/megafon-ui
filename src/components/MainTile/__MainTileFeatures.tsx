import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './MainTileFeatures.less';
import MainTileInternet from './MainTileInternet';
import MainTileFree from './MainTileFree';

export interface ISocialIcon {
    svgIcon: JSX.Element;
    title: string;
}

export interface IShowcaseChildren {
    svgIcon: JSX.Element;
    title: string;
    caption: string;
    value: string;
}

interface IShowcaseParams {
    title: string;
    value: string;
    children: Array<Partial<IShowcaseChildren>>;
}

interface IMainTileFeaturesProps {
    /** Showcase
     * List with args: title: title: string(requred), value: string(requred), children: list
     */
    showcaseParams?: IShowcaseParams[];
    /** Social icons
     * List with args: svgIcon: JSX.Element, title: string
     */
    socialIcons?: Array<Partial<ISocialIcon>>;
}

const cn = cnCreate('main-tile-features');
class MainTileFeatures extends React.Component<IMainTileFeaturesProps, {}> {
    static propTypes = {
        showcaseParams: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
                children: PropTypes.arrayOf({
                    svgIcon: PropTypes.element,
                    title: PropTypes.string,
                    caption: PropTypes.string,
                    value: PropTypes.string,
                }),
            })
        ),
        socialIcons: PropTypes.arrayOf(
            PropTypes.shape({
                svgIcon: PropTypes.element.isRequired,
                title: PropTypes.string.isRequired,
            })
        ),
    };

    render() {
        const params = this.props.showcaseParams!.filter(
            param => param.children!.length
        );
        const [first, ...rest] = params;

        return (
            <div className={cn('')}>
                {first &&
                    <MainTileInternet
                        className={cn('internet')}
                        params={first.children}
                        socialIcons={this.props.socialIcons}
                    />
                }
                {rest.map((param: IShowcaseParams, index: number) =>
                    <MainTileFree
                        className={cn('free')}
                        params={param.children}
                        title={param.value}
                        key={param.title + index}
                    />
                )}
            </div>
        );
    }
}

export default MainTileFeatures;
