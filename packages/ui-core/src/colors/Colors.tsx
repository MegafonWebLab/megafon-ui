import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import Grid from 'components/Grid/Grid';
import GridColumn from 'components/Grid/GridColumn';
import Header from 'components/Header/Header';
import Paragraph from 'components/Paragraph/Paragraph';
import Tile from 'components/Tile/Tile';
import ColorItem from './ColorItem/ColorItem';
import colorsData, { ColorsItemType } from './colorsData';
import DiagramDark from './img/diagram-dark.svg';
import DiagramLight from './img/diagram-light.svg';
import './Colors.less';

const { basic, secondary, system, gradientColors, staticColors, staticOpacity, soft } = colorsData;

type Theme = 'light' | 'dark';

// TODO: refactor this
const getThemeFromLocalStorage = (): Theme => {
    let theme = 'light' as Theme;

    if (typeof window !== 'undefined') {
        const localStorageTheme = String(window.localStorage.getItem('theme')) as Theme;

        if (['light', 'dark'].includes(localStorageTheme)) {
            theme = localStorageTheme;
        }
    }

    return theme;
};

const cn = cnCreate('colors');
const Colors: React.FC = () => {
    const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>(getThemeFromLocalStorage());
    const [, setLoad] = React.useState<boolean>(false);

    React.useEffect(() => {
        function load() {
            setLoad(true);
            document.removeEventListener('css-var-load', load);
        }
        document.addEventListener('css-var-load', load);
    }, []);

    const getCurrentColorValue = (code: string) =>
        typeof document !== 'undefined' ? document.documentElement.style.getPropertyValue(`--${code}`) : '';

    React.useEffect(() => {
        // theme switcher from src/gatsby-theme-docz/components/SideBar/index.tsx
        const themeSwitcher = document.querySelector('[data-current-theme]');

        if (themeSwitcher) {
            const themeSwitcherObserver = new MutationObserver(mutationsList => {
                const data = mutationsList[0];
                setCurrentTheme(data.oldValue === 'light' ? 'dark' : 'light');
            });

            const config = {
                attributeOldValue: true,
                attributeFilter: ['data-current-theme'],
            };

            themeSwitcherObserver.observe(themeSwitcher, config);

            return () => themeSwitcherObserver.disconnect();
        }

        return undefined;
    }, []);

    const renderUnderline = () => (
        <div className={cn('underline')}>
            <span className={cn('pointer')} />
        </div>
    );

    const renderBasicColors = (): JSX.Element => {
        const { title, colorsGroup = [] } = basic;

        return (
            <div className={cn('line')}>
                <Header as="h2" className={cn('group-title')}>
                    {title}
                </Header>
                <Grid>
                    {colorsGroup.map(({ description, colors }, index) => (
                        <GridColumn
                            key={description}
                            className={cn('basic-group')}
                            all={!index ? '3' : '9'}
                            mobile="12"
                        >
                            <div className={cn('list')}>
                                {colors.map(({ name, code, border = '' }) => (
                                    <ColorItem
                                        className={cn('item')}
                                        colorName={name}
                                        colorCode={getCurrentColorValue(code)}
                                        key={name}
                                        border={border}
                                    />
                                ))}
                            </div>
                            {renderUnderline()}
                            <div className={cn('description')}>{description}</div>
                        </GridColumn>
                    ))}
                </Grid>
            </div>
        );
    };

    const renderColorBlock = (items: ColorsItemType): JSX.Element => (
        <div className={cn('line')}>
            <Header as="h2" className={cn('group-title')}>
                {items.title}
            </Header>
            <div className={cn('list')}>
                {items.colorsList?.colors.map(({ name, code, gradient = '', border = '' }) => (
                    <ColorItem
                        className={cn('item')}
                        colorName={name}
                        colorCode={getCurrentColorValue(code)}
                        gradient={gradient}
                        key={name}
                        border={border}
                    />
                ))}
            </div>
            {renderUnderline()}
            <div className={cn('description')}>{items.colorsList?.description}</div>
        </div>
    );

    const renderSoftColors = (): JSX.Element => {
        const { colorsList: { colors = [], description } = {} } = soft;

        return (
            <div className={cn('soft-list')}>
                <div className={cn('list', { soft: true })}>
                    {colors.map(({ name, code, parentColor = '' }) => (
                        <ColorItem
                            className={cn('item', { soft: true })}
                            colorName={name}
                            colorCode={getCurrentColorValue(code)}
                            parentColorCode={parentColor}
                            key={name}
                        />
                    ))}
                </div>
                <div className={cn('description')}>{description}</div>
            </div>
        );
    };

    return (
        <div className={cn()}>
            <Header as="h1" className={cn('title')}>
                Colors
            </Header>
            <Paragraph>Палитра цветов, используемая в продуктах МегаФон</Paragraph>

            <div className={cn('inner')}>
                <div className={cn('container')}>
                    {renderBasicColors()}
                    <Grid hAlign="between">
                        <GridColumn all="6" mobile="12" tablet="12">
                            {renderColorBlock(secondary)}
                        </GridColumn>
                        <GridColumn all="10" mobile="12" tablet="12">
                            {renderColorBlock(system)}
                        </GridColumn>
                    </Grid>
                    <Grid>
                        <GridColumn all="5" mobile="12" tablet="12">
                            {renderColorBlock(gradientColors)}
                        </GridColumn>
                        <GridColumn
                            all="3"
                            leftOffsetWide="2"
                            leftOffsetTablet="1"
                            leftOffsetDesktop="1"
                            mobile="12"
                            tablet="12"
                        >
                            {renderColorBlock(staticColors)}
                        </GridColumn>
                    </Grid>
                    <div>{renderColorBlock(staticOpacity)}</div>
                </div>
                <Tile className={cn('soft')} radius="rounded">
                    <Header as="h2" className={cn('group-title')}>
                        Soft
                    </Header>
                    <div className={cn('group')}>
                        <div className={cn('diagram')}>
                            {currentTheme === 'light' && <DiagramLight />}
                            {currentTheme === 'dark' && <DiagramDark />}
                        </div>
                        {renderSoftColors()}
                    </div>
                </Tile>
            </div>
        </div>
    );
};

export default Colors;
