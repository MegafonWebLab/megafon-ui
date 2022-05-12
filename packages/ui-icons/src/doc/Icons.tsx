import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import Copy from '../System/24/Copy_24.svg';
import Cancel from '../System/32/Cancel_32.svg';
import './Icons.less';

// eslint-disable-next-line dot-notation
export const reqSvgs = require['context']('../', true, /\.svg$/);

const cn = cnCreate('icons');
interface IIconsState {
    sections: Record<string, Record<string, svgDataType[]>>;
    activeElement: Partial<activeElementType>;
    activeIcon: number;
    copyIndex: copyBoard;
}

type svgDataType = { size: string; path: string; importPath: string };

type IconEntry = [string, svgDataType[]];

type Entries = IconEntry[];

type activeElementType = { name: string; svgList: svgDataType[] };

enum copyBoard {
    NO,
    SVG,
}

const sizeDictionary = {
    16: 'S',
    24: 'M',
    32: 'L',
};

const importIcon = "import Icon from '@megafon/ui-icons/";

class Icons extends React.Component<Record<string, unknown>, IIconsState> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            sections: {},
            activeElement: {},
            activeIcon: 0,
            copyIndex: copyBoard.NO,
        };
    }

    static getDerivedStateFromProps(_props: Record<string, unknown>, state: IIconsState) {
        const {
            activeElement: { svgList },
            activeIcon,
        } = state;

        if (svgList && !svgList[activeIcon]) {
            return { ...state, activeIcon: 0 };
        }

        return state;
    }

    componentDidMount() {
        const sections = reqSvgs.keys().reduce((initialSectDictionary, item) => {
            const sectDictionary = { ...initialSectDictionary };
            const pathList = item.split('/').slice(1);
            const [sectionName, svgSize] = pathList;
            const [svgIcon] = pathList.reverse();
            const svgName = svgIcon
                .replace('.svg', '')
                .replace(/_[0-9]{2}/, '')
                .toLowerCase();
            const sectionCamelCase = sectionName
                .split('-')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join('');

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
                size: svgSize,
                path: item,
                importPath,
            });

            return sectDictionary;
        }, {});

        this.setState({ sections });
    }

    copyToClipBoard = (str: string, copyIndex: copyBoard) => () => {
        const el = document.createElement('textarea');
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);

        el.value = str;
        el.select();
        document.execCommand('copy');
        el.remove();
        this.setState({ copyIndex });
    };

    handleIconClick =
        (svgData: Record<string, unknown>) =>
        (e: React.SyntheticEvent): void => {
            e.preventDefault();
            this.setState({ activeElement: svgData, copyIndex: copyBoard.NO });
        };

    handleClickClose = () => {
        this.setState({ activeElement: {}, activeIcon: 0, copyIndex: copyBoard.NO });
    };

    handleClickInfoIcon = (index: number) => () => {
        this.setState({ activeIcon: index, copyIndex: copyBoard.NO });
    };

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
                    type="button"
                >
                    <div className={cn('icon')}>
                        <Svg />
                    </div>
                    {name.replace('_direct_url', '')}
                </button>
            );
        });
    }

    renderInfoIcon(svg: svgDataType) {
        const { copyIndex } = this.state;
        const importStr = importIcon + svg.importPath;

        return (
            <div className={cn('info-icon-wrapper')} key={svg.path}>
                <div className={cn('info-icon-id')}>
                    Icon ID <code className={cn('info-code-style')}>{svg.importPath}</code>
                </div>

                <div className={cn('info-import')}>
                    SVG <code className={cn('info-code-style')}>{`${importStr}.svg';`}</code>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a title="Скопировать в буфер">
                        <Copy
                            className={cn('info-copy', { active: copyIndex === copyBoard.SVG })}
                            onClick={this.copyToClipBoard(`${importStr}.svg';`, copyBoard.SVG)}
                        />
                    </a>
                </div>
            </div>
        );
    }

    render() {
        const {
            sections,
            activeElement: { svgList },
            activeIcon,
        } = this.state;
        const Svg = svgList && reqSvgs(svgList[activeIcon].path).default;

        return (
            <>
                <div className={cn()}>
                    {Object.keys(sections).map((section: string) => (
                        <div key={section}>
                            <h2 className={cn('icon-title')}>{section}</h2>
                            <div className={cn('icons')}>{this.renderIcons(Object.entries(sections[section]))}</div>
                        </div>
                    ))}
                </div>
                {svgList && (
                    <div className={cn('info')}>
                        <div className={cn('info-sizes-wrap')}>
                            <div>Размер</div>
                            <div className={cn('info-sizes')}>
                                {svgList.map((svg: svgDataType, i: number) => (
                                    <div
                                        className={cn('info-size', { active: activeIcon === i })}
                                        key={svg.size}
                                        onClick={this.handleClickInfoIcon(i)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        {sizeDictionary[svg.size]}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {this.renderInfoIcon(svgList[activeIcon])}
                        <div className={cn('info-icon-wrap')}>
                            {/* eslint-disable-next-line no-magic-numbers */}
                            <div style={{ width: `${Number(svgList[activeIcon].size) * 2}px` }}>
                                <Svg />
                            </div>
                        </div>
                        <div className={cn('info-close')} onClick={this.handleClickClose} role="button" tabIndex={0}>
                            <Cancel />
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Icons;
