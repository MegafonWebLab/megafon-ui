import * as React from 'react';
import './Icons.less';
import Header from '../components/Header/Header';
import Cancel from 'icons/System/32/Cancel_32.svg';
import Copy from 'icons/Basic/24/Whats-left_24.svg';
import { cnCreate } from '../utils/cn';
export const reqSvgs = require.context('icons', true, /\.svg$/);

const cn = cnCreate('icons');
interface IIconsState {
    sections: {};
    activeElement: Partial<activeElementType>;
    activeIcon: number;
    copyIndex: copyBoard;
}

type svgDataType = { size: string; path: string; importPath: string };

type IconEntry = Array<string | svgDataType[]>;

type Entries = IconEntry[];

type activeElementType = { name: string; svgList: svgDataType[] };

enum copyBoard {
    NO,
    SVG,
    JSX,
}

const sizeDictionary = {
    16: 'X',
    24: 'M',
    32: 'L',
};

const importIcon = 'import Icon from \'@megafon/megafon-ui/icons/';

class Icons extends React.Component<{}, IIconsState> {
    copyToClipBoard: (str: string, copyIndex: copyBoard) => void;

    constructor(props: {}) {
        super(props);
        this.state = {
            sections: {},
            activeElement: {},
            activeIcon: 0,
            copyIndex: copyBoard.NO,
        };
    }

    static getDerivedStateFromProps(props: {}, state: IIconsState) {
        const { activeElement: { svgList }, activeIcon } = state;

        if (svgList && !svgList[activeIcon]) {
            return { ...state, activeIcon: 0 };
        }
    }

    componentDidMount() {
        const sections = reqSvgs.keys().reduce((sectDictionary, item) => {
            const pathList = item.split('/').slice(1);
            const [sectionName, svgSize] = pathList;
            const [svgIcon] = pathList.reverse();
            const svgName = svgIcon.replace('.svg', '').replace(/_[0-9]{2}/, '');
            const sectionCamelCase = sectionName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');

            if (sectionCamelCase.search('.svg') !== -1) {
                return sectDictionary;
            }

            if (!sectDictionary[sectionCamelCase]) {
                sectDictionary[sectionCamelCase] = {};
            }

            if (!sectDictionary[sectionCamelCase][svgName]) {
                sectDictionary[sectionCamelCase][svgName] = [];
            }

            const importPath = item
                .replace('./', '')
                .toLowerCase()
                .replace('.svg', '')
                .replace(new RegExp('/', 'g'), '-')
                .replace(/[^a-z0-9-]+/g, '_');

            sectDictionary[sectionCamelCase][svgName] = sectDictionary[sectionCamelCase][svgName].concat({
                size: svgSize, path: item, importPath,
            });

            return sectDictionary;
        }, {});

        this.setState({ sections });

        this.copyToClipBoard = this.createElToClipboard();
    }

    createElToClipboard = () => {
        const el = document.createElement('textarea');
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        return (str: string, copyIndex: copyBoard) => () => {
            el.value = str;
            el.select();
            document.execCommand('copy');
            this.setState({ copyIndex });
        };
    }

    handleIconClick = (svgData: {}) => (e: React.SyntheticEvent): void => {
        e.preventDefault();
        this.setState({ activeElement: svgData, copyIndex: copyBoard.NO });
    }

    handleClickClose = () => {
        this.setState({ activeElement: {}, activeIcon: 0, copyIndex: copyBoard.NO });
    }

    handleClickInfoIcon = (index: number) => () => {
        this.setState({ activeIcon: index, copyIndex: copyBoard.NO });
    }

    renderIcons(entries: Entries) {
        const { activeElement } = this.state;

        return entries.map((entry: IconEntry) => {
            const [name, svgList] = entry;
            const [svg] = svgList as svgDataType[];
            const Svg = reqSvgs(svg.path).default;

            return (
                <div
                    key={svg.path}
                    className={cn('icon-container', { active: activeElement.name === name })}
                    onClick={this.handleIconClick({ name, svgList })}
                >
                    <div className={cn('icon')}><Svg /></div>
                    {name}
                </div>
            );
        });
    }

    renderInfoIcon(svg: svgDataType) {
        const { copyIndex } = this.state;
        const Svg = reqSvgs(svg.path).default;
        const styles = { width: `${Number(svg.size) * 2}px` };
        const importStr = importIcon + svg.importPath;

        return (
            <div className={cn('info-icon-wrapper')} key={svg.path}>
                <div className={cn('info-icon')} style={styles}><Svg /></div>
                <div className={cn('info-code')}>
                    <div className={cn('info-import')}>
                        Svg <code className={cn('info-code-style')}>{importStr}.svg';</code>
                        <a title="copy to clipboard">
                            <Copy
                                className={cn('info-copy', { active: copyIndex === copyBoard.SVG })}
                                onClick={this.copyToClipBoard(`${importStr}.svg'`, copyBoard.SVG)}
                            />
                        </a>
                    </div>
                    <div className={cn('info-import')}>
                        JSX <code className={cn('info-code-style')}>{importStr}';</code>
                        <a title="copy to clipboard">
                            <Copy
                                className={cn('info-copy', { active: copyIndex === copyBoard.JSX })}
                                onClick={this.copyToClipBoard(`${importStr}'`, copyBoard.JSX)}
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { sections, activeElement: { svgList }, activeIcon } = this.state;

        return (
            <React.Fragment>
                <div className={cn('')}>
                    {Object.keys(sections).map((section: string) =>
                        <div key={section}>
                            <Header as="h2">{section}</Header>
                            <div className={cn('icons')}>
                                {this.renderIcons(Object.entries(sections[section]))}
                            </div>
                        </div>
                    )}
                </div>
                {svgList &&
                    <div className={cn('info')}>
                        <div className={cn('info-icons')}>
                            <React.Fragment>
                                {this.renderInfoIcon(svgList[activeIcon])}
                                <div className={cn('info-sizes')}>
                                    {svgList.map((svg: svgDataType, i: number) =>
                                        <div
                                            className={cn('info-size', { active: activeIcon === i })}
                                            key={svg.size}
                                            onClick={this.handleClickInfoIcon(i)}
                                        >
                                            {sizeDictionary[svg.size]}
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        </div>
                        <div className={cn('info-close')} onClick={this.handleClickClose}>
                            <Cancel />
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default Icons;
