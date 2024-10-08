type TransformKeysOptions = {
    omit?: string[];
    valueTransformer?: (value: any) => any;
    deep?: boolean;
    omitEmpty?: boolean;
    omitByValues?: any[];
};

function transformKeys(
    obj: Record<string, any>,
    options: TransformKeysOptions = {}
): Record<string, any> {
    const {
        omit = [],
        valueTransformer = (val) => val,
        deep = false,
        omitEmpty = false,
        omitByValues = [],
    } = options;
    const result: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
        if (omit.includes(key)) {
            return;
        }

        let value = obj[key];

        if (
            omitEmpty &&
            (value === null || value === undefined || value === "")
        ) {
            return;
        }

        if (omitByValues.includes(value)) {
            return;
        }

        if (deep && typeof value === "object" && value !== null) {
            value = transformKeys(value, options);
        } else {
            value = valueTransformer(value);
        }

        result[key] = value;
    });

    return result;
}

export default transformKeys;
