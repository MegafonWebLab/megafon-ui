import * as React from 'react';
import './Icons.less';
import Header from '../components/Header/Header';
import Cancel from 'icons/System/32/Cancel_32.svg';
import Copy from 'icons/System/24/Copy_24.svg';
import cnCreate from 'utils/cnCreate';

// tslint:disable-next-line:no-string-literal
export const reqSvgs = require['context']('icons', true, /\.svg$/);

const cn = cnCreate('icons');
interface IIconsState {
    sections: {};
    activeElement: Partial<activeElementType>;
    activeIcon: number;
    copyIndex: copyBoard;
}

type svgDataType = { size: string; path: string; text: string };

type IconEntry = [string, svgDataType[]];

type Entries = IconEntry[];

type activeElementType = { name: string; svgList: svgDataType[] };

enum copyBoard {
    NO,
    SVG,
    JSX,
}

const sizeDictionary = {
    16: 'S',
    24: 'M',
    32: 'L',
};

const importIcon = 'import Icon from \'@megafon/ui-core/dist/icons/';

class Icons extends React.Component<{}, IIconsState> {
    copyToClipBoard?: (str: string, copyIndex: copyBoard) => void = undefined;

    constructor(props: {}) {
        super(props);
        this.state = {
            sections: {},
            activeElement: {},
            activeIcon: 0,
            copyIndex: copyBoard.NO,
        };
    }

    static getDerivedStateFromProps(_props: {}, state: IIconsState) {
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

            const text = item
                .replace('./', '')
                .toLowerCase()
                .replace('.svg', '')
                .replace(new RegExp('/', 'g'), '-')
                .replace(/[^a-z0-9-]+/g, '_');

            sectDictionary[sectionCamelCase][svgName] = sectDictionary[sectionCamelCase][svgName].concat({
                size: svgSize, path: item, text,
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
            const [svg] = svgList;
            const Svg = reqSvgs(svg.path).default;

            return (
                <button
                    key={svg.path}
                    className={cn('icon-container', { active: activeElement.name === name })}
                    onClick={this.handleIconClick({ name, svgList })}
                >
                    <div className={cn('icon')}><Svg /></div>
                    {name}
                </button>
            );
        });
    }

    renderInfoIcon(svg: svgDataType) {
        const { copyIndex } = this.state;
        const importStr = importIcon + svg.text;

        return (
            <div className={cn('info-icon-wrapper')} key={svg.path}>
                <div className={cn('info-import')}>
                    Svg <code className={cn('info-code-style')}>{importStr}.svg';</code>
                    <a title="Скопировать в буфер">
                        <Copy
                            className={cn('info-copy', { active: copyIndex === copyBoard.SVG })}
                            onClick={this.copyToClipBoard &&
                                    this.copyToClipBoard(`${importStr}.svg;'`, copyBoard.SVG)}
                        />
                    </a>
                </div>
                <div className={cn('info-import')}>
                    JSX <code className={cn('info-code-style')}>{importStr}';</code>
                    <a title="Скопировать в буфер">
                        <Copy
                            className={cn('info-copy', { active: copyIndex === copyBoard.JSX })}
                            onClick={this.copyToClipBoard
                                && this.copyToClipBoard(`${importStr};'`, copyBoard.JSX)}
                        />
                    </a>
                </div>
            </div>
        );
    }

    render() {
        const { sections, activeElement: { svgList }, activeIcon } = this.state;
        const Svg = svgList && reqSvgs(svgList[activeIcon].path).default;

        return (
            <React.Fragment>
                <div className={cn()}>
                    {Object.keys(sections).map((section: string) =>
                        <div key={section}>
                            <Header as="h2" className={cn('icon-title')}>{section}</Header>
                            <div className={cn('icons')}>
                                {this.renderIcons(Object.entries(sections[section]))}
                            </div>
                        </div>
                    )}
                </div>
                {svgList &&
                    <div className={cn('info')}>
                        <div className={cn('info-sizes-wrap')}>
                            <div>Размер</div>
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
                        </div>
                        {this.renderInfoIcon(svgList[activeIcon])}
                        <div className={cn('info-icon-wrap')}>
                            <div style={{width: `${Number(svgList[activeIcon].size) * 2}px` }}>
                                <Svg />
                            </div>
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
