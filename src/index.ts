type TransformKeysOptions = {
    omit?: string[];
    valueTransformer?: (value: any) => any;
    deep?: boolean;
    omitEmpty?: boolean;
    omitByValue?: any[];
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
        omitByValue = [],
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

        if (omitByValue.includes(value)) {
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

const obj = {
    name: "Alice",
    age: 25,
    city: "Wonderland",
    hobby: null,
    status: "active",
};
const result = transformKeys(obj, {
    omit: ["age"],
    omitEmpty: true,
    omitByValue: ["active"],
    valueTransformer: (value) =>
        typeof value === "string" ? value.toUpperCase() : value,
});

console.log(result);
// output: { name: 'ALICE', city: 'WONDERLAND' }
