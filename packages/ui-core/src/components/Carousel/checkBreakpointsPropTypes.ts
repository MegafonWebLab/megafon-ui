import * as PropTypes from 'prop-types';

type ObjectType = {
    [key: string]: any;
};

const checkBreakpointsPropTypes =
    (settingsPropTypes: ObjectType) =>
    (object: ObjectType, key: string, componentName: string): Error | null => {
        if (!object[Number(key)]) {
            return new Error(
                `Invalid key name 'breakpoints.${key}' of type ${typeof key} supplied to ${componentName}, expected number`,
            );
        }

        PropTypes.checkPropTypes(settingsPropTypes, object[key], 'prop', componentName);

        return null;
    };

export default checkBreakpointsPropTypes;
