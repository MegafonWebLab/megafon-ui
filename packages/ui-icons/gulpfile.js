const path = require('path');
const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const del = require('del');
const through = require('through2');
/*
 * Adding cheerio as a package dependency will crash the docz demo.
 * More details: https://github.com/MegafonWebLab/megafon-ui/pull/673#discussion_r686969911
 */
const cheerio = require('cheerio');

const sep = path.sep;
const dest = gulp.dest;
/**
 * Tasks
 */
gulp.task('clean', () => del(['*.svg']));

gulp.task('svg', () => {
    return gulp.src('src/**/*.svg')
        .pipe(svgmin(file => getSvgrConfig(file.path).svgoConfig))
        .pipe(removeSvgMasks())
        .pipe(renameFile())
        .pipe(dest(__dirname));
});

gulp.task('build', gulp.series('clean', 'svg'));

/**
 * Helpers
 */

const changePipe = fn => through.obj(async function (file, encoding, next) {
    await fn.call(this, file, encoding);
    next();
});

const renameFile = () => changePipe(async function (file) {
    const iconsPath = path.join(__dirname, 'src', sep);
    const name = file.path
        .replace(iconsPath, '')
        .toLowerCase()
        .replace('.svg', '')
        .replace(new RegExp('\\' + sep, 'g'), '-')
        .replace(/[^a-z0-9-]+/g, '_');

    file.path = `${iconsPath}${sep}${name}.svg`;
    this.push(file);
});

const getSvgrConfig = (filePath, name) => ({
    svgoConfig: {
        plugins: [{
            cleanupIDs: { prefix: name ? '${id}' : `svg-${path.basename(filePath, '.svg')}` },
        },
        {
            inlineStyles: { onlyMatchedOnce: false }
        }]
    }
});

const removeSvgMasks = () => changePipe(function (file, encoding) {
    const content = file.contents.toString(encoding);
    const $ = cheerio.load(content, { xmlMode: true });
    const $svg = $('svg');

    const mask = $svg.find('[mask]');

    if (mask.length === 0) {
        this.push(file);
        return;
    }

    mask.each((i, item) => getMaskData(item));

    file.contents = Buffer.from($.xml());

    this.push(file);

    function getMaskData(mask) {
        const maskAttr = $(mask).attr('mask');
        const maskId = getIdFromMaskAttr(maskAttr);
        const divs = [];

        if (maskId.length === 0) {
            return;
        }

        findById(maskId, divs);

        if (divs.length === 0) {
            return;
        }

        $(mask).html(divs.map(i => i.removeAttr('id')).join(''));

        $(mask).removeAttr('mask')
    }

    function linkedTag($tag, divs, $parent) {
        const attrs = $tag.attr();
        const { 'xlink:href': xlinkHref } = attrs;

        switch (true) {
            case !!xlinkHref:
                findById(xlinkHref, divs, $parent);
                break;
            default:
                divs.push($tag);
                $tag.remove();
                $parent.remove();
                break;
        }
    }

    function findById(id, divs, $parent) {
        const tag = $svg.find(id);

        if (tag.length === 0) {
            return;
        }

        const child = tag.children();

        switch (child.length) {
            case 1:
                linkedTag(child, divs, tag);
                break;
            case 0:
                divs.push(tag);
                tag.remove();
                $parent && $parent.remove();
                break;
            default:
                child.map(item => linkedTag(item, divs));
                break;
        }
    }

    function getIdFromMaskAttr(attr) {
        return attr.match(/\(.*\)/g).reduce(
            (id, match) => match ? match.slice(1, -1) : id,
            ''
        );
    }
});
