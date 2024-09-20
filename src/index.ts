type TransformKeysOptions = {
    omit?: string[];
    valueTransformer?: (value: any) => any;
    omitEmpty?: boolean;
    deep?: boolean;
};

function transformKeys(
    obj: Record<string, any>,
    options: TransformKeysOptions = {}
): Record<string, any> {
    const {
        omit = [],
        valueTransformer = (val) => val,
        omitEmpty = false,
        deep = false,
    } = options;
    const result: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
        if (omit.includes(key)) {
            return;
        }

        let value = obj[key];

        if (deep && typeof value === "object" && value !== null) {
            value = transformKeys(value, options);
        } else {
            value = valueTransformer(value);
        }

        if (
            omitEmpty &&
            (value === null || value === undefined || value === "")
        ) {
            return;
        }

        result[key] = value;
    });

    return result;
}

export default transformKeys;
