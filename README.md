# Key Transformer

key-transformer is a utility for transforming object keys and values in JavaScript and TypeScript. It allows you to omit specific keys, apply custom transformations to values, remove empty entries, and handle nested objects with ease.

## Installation

```bash
npm install key-transformer
```

## Usage

```js
import transformKeys from 'key-transformer';

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
    omitByValues: ["active"],
    valueTransformer: (value) =>
        typeof value === "string" ? value.toUpperCase() : value,
});

console.log(result);
// output: { name: 'ALICE', city: 'WONDERLAND' }


```

### API

```js
transformKeys(obj, options?)
```

| options          | Description                                                    | type                | Default |
|------------------|----------------------------------------------------------------|---------------------|---------|
| omit             | Array of keys to omit from the object                          | string[]            | []      |
| omitEmpty        | If true, removes keys with null, undefined, or empty strings   | boolean             | false   |
| omitByValues      | Array of values; Keys with matching values will be omitted     | string[]            | []      |
| valueTransformer | Function to transform each value in the object                 | (value: any) => any | no-op   |
| deep             | If true, recursively applies transformations to nested objects | boolean             | false   |
