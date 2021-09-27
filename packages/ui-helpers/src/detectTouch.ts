export default function detectTouch(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    const { DocumentTouch } = window;
    const prefixes: string[] = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = (queryParam: string): boolean => window.matchMedia(queryParam).matches || false;

    if ('ontouchstart' in window || (DocumentTouch && document instanceof DocumentTouch)) {
        return true;
    }

    const query: string = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');

    return mq(query);
}
