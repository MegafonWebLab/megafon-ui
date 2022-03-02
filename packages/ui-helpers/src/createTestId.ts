/* eslint-disable no-console */
const DOUBLE_INDEX_CHANGE = 2;

type CreateTestIdType = (args: (number | string)[]) => string;

const createTestId = (blockName: string): CreateTestIdType => {
    const stringPatter = /^[a-zA-Z]+$/;

    if (!stringPatter.test(String(blockName))) {
        console.warn(`Wrong block name ${blockName}. Block name should contain only letters in camelCase format.`);
    }

    const getId = (args: (number | string)[]): string => {
        let id = blockName;
        let index = 0;

        while (index < args.length) {
            const nextIndex = index + 1;

            const currentArgument = args[index];
            const nextArgument = args[nextIndex];

            const isCurrentArgumentString = typeof currentArgument === 'string';
            const isNextArgumentNumber = typeof nextArgument === 'number';

            const isElementNameIncorrect = !isCurrentArgumentString || !stringPatter.test(String(currentArgument));
            const isElementIndexIncorrect = isNextArgumentNumber && nextArgument < 1;

            const indexChange = isNextArgumentNumber ? DOUBLE_INDEX_CHANGE : 1;

            if (isElementNameIncorrect) {
                console.warn(
                    `Wrong element name ${currentArgument}. Element name should contain only letters in camelCase format.`,
                );
            }

            if (isElementIndexIncorrect) {
                console.warn(`Wrong element index ${nextArgument}. Index should be above zero and in number format.`);
            }

            id = isNextArgumentNumber ? `${id}-${currentArgument}[${nextArgument}]` : `${id}-${currentArgument}`;

            index += indexChange;
        }

        return id;
    };

    return getId;
};

export default createTestId;
