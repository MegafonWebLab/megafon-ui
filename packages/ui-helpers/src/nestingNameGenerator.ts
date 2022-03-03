/* eslint-disable no-console */
const DOUBLE_INDEX_CHANGE = 2;

type NestingNameGeneratorReturnType = (...args: (number | string)[]) => string;

const nestingNameGenerator = (blockName: string): NestingNameGeneratorReturnType => {
    const stringPattern = /^[a-zA-Z]+$/;

    if (!stringPattern.test(String(blockName))) {
        console.warn(`Wrong block name ${blockName}. Block name should contain only letters in camelCase format.`);
    }

    const generateId = (...args: (number | string)[]): string => {
        let id = blockName;
        let index = 0;

        while (index < args.length) {
            const nextIndex = index + 1;

            const currentArgument = args[index];
            const nextArgument = args[nextIndex];

            const isCurrentArgumentString = typeof currentArgument === 'string';
            const isNextArgumentNumber = typeof nextArgument === 'number';

            const isElementNameIncorrect = !isCurrentArgumentString || !stringPattern.test(String(currentArgument));
            const isElementIndexIncorrect = isNextArgumentNumber && nextArgument < 1;

            const indexChange = isNextArgumentNumber ? DOUBLE_INDEX_CHANGE : 1;

            if (isElementNameIncorrect) {
                console.warn(
                    `Wrong element name ${currentArgument} of ${blockName} in args:${args}. Element name should contain only letters in camelCase format.`,
                );
            }

            if (isElementIndexIncorrect) {
                console.warn(
                    `Wrong element index ${nextArgument} of ${blockName} in args:${args}. Index should be above zero and in number format.`,
                );
            }

            id = isNextArgumentNumber ? `${id}-${currentArgument}[${nextArgument}]` : `${id}-${currentArgument}`;

            index += indexChange;
        }

        return id;
    };

    return generateId;
};

export default nestingNameGenerator;
