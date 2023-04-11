const regex = /[\u{FE00}-\u{FE0F}]|[\u{1F3FB}-\u{1F3FF}]/gu;
const regexSymbolWithCombiningMarks = /(\P{Mark})(\p{Mark}+)/gu;
const joiner = '200d';

// eslint-disable-next-line no-magic-numbers
const isJoiner = (char: string) => char.charCodeAt(0).toString(16) === joiner;

const countGraphemes = (text: string): number => {
    const normalizedText = text
        .normalize('NFC')
        .replace(regex, '')
        .replace(regexSymbolWithCombiningMarks, (_, symbol) => symbol);

    const tokens = Array.from(normalizedText);
    let length = 0;
    let isComplexChar = false;

    for (let i = 0; i < tokens.length; i++) {
        const char = tokens[i];
        const nextChar = tokens[i + 1];

        if (!nextChar) {
            length += 1;
            // eslint-disable-next-line no-continue
            continue;
        }

        if (isJoiner(nextChar)) {
            isComplexChar = true;
            // eslint-disable-next-line no-continue
            continue;
        }

        if (!isJoiner(char) && isComplexChar) {
            isComplexChar = false;
        }

        if (!isComplexChar) {
            length += 1;
        }
    }

    return length;
};

export default countGraphemes;
