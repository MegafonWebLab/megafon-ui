import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import Grid from 'components/Grid/Grid';
import GridColumn from 'components/Grid/GridColumn';
import Header from 'components/Header/Header';
import Paragraph from 'components/Paragraph/Paragraph';
import Tile from 'components/Tile/Tile';
import ColorItem from './ColorItem/ColorItem';
import colorsData, { ColorsItemType } from './colorsData';
import Diagram from './diagram.svg';
import './Colors.less';

const { basic, secondary, system, gradientColors, staticColors, staticOpacity, soft } = colorsData;

const cn = cnCreate('colors');
const Colors = () => {
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
                                        colorCode={code}
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
                        colorCode={code}
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
                            colorCode={code}
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
                Цвета
            </Header>
            <Paragraph>Палитра цветов, используемая в продуктах МегаФон</Paragraph>
            <div className={cn('inner')}>
                <div className={cn('container')}>
                    {renderBasicColors()}
                    <Grid hAlign="between">
                        <GridColumn all="6" mobile="12" tablet="12">
                            {renderColorBlock(secondary)}
                        </GridColumn>
                        <GridColumn all="5" mobile="12" tablet="12">
                            {renderColorBlock(system)}
                        </GridColumn>
                    </Grid>
                    <Grid>
                        <GridColumn all="5" mobile="12" tablet="12">
                            {renderColorBlock(gradientColors)}
                        </GridColumn>
                        <GridColumn
                            all="3"
                            leftOffsetWide="1"
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
                        <Diagram className={cn('diagram')} />
                        {renderSoftColors()}
                    </div>
                </Tile>
            </div>
        </div>
    );
};

export default Colors;
