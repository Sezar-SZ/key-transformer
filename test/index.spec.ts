import { describe, expect, it } from "vitest";
import transformKeys from "../src";

describe("transformKeys", () => {
    it("should omit specified keys", () => {
        const obj = { name: "Alice", age: 25, city: "Wonderland" };
        const result = transformKeys(obj, { omit: ["age"] });

        expect(result).toEqual({ name: "Alice", city: "Wonderland" });
    });

    it("should apply valueTransformer correctly", () => {
        const obj = { name: "Alice", age: 25 };
        const result = transformKeys(obj, {
            valueTransformer: (value) =>
                typeof value === "string" ? value.toUpperCase() : value,
        });

        expect(result).toEqual({ name: "ALICE", age: 25 });
    });

    it("should omit empty values if omitEmpty is true", () => {
        const obj = { name: "Alice", age: null, city: "", hobby: undefined };
        const result = transformKeys(obj, { omitEmpty: true });

        expect(result).toEqual({ name: "Alice" });
    });

    it("should keep empty values if omitEmpty is false", () => {
        const obj = { name: "Alice", age: null, city: "" };
        const result = transformKeys(obj, { omitEmpty: false });

        expect(result).toEqual({ name: "Alice", age: null, city: "" });
    });

    it("should handle deep transformation of nested objects", () => {
        const obj = {
            name: "Alice",
            details: { hobby: "Reading", city: "Wonderland" },
        };
        const result = transformKeys(obj, {
            deep: true,
            valueTransformer: (value) =>
                typeof value === "string" ? value.toUpperCase() : value,
        });

        expect(result).toEqual({
            name: "ALICE",
            details: { hobby: "READING", city: "WONDERLAND" },
        });
    });

    it("should handle deep omit on nested objects", () => {
        const obj = { name: "Alice", details: { hobby: "Reading", age: 25 } };
        const result = transformKeys(obj, {
            deep: true,
            omit: ["age"],
        });

        expect(result).toEqual({
            name: "Alice",
            details: { hobby: "Reading" },
        });
    });

    it("should return an empty object if all keys are omitted", () => {
        const obj = { name: "Alice", age: 25 };
        const result = transformKeys(obj, { omit: ["name", "age"] });

        expect(result).toEqual({});
    });

    it("should not modify the original object", () => {
        const obj = { name: "Alice", age: 25 };
        const result = transformKeys(obj, { omit: ["age"] });

        expect(obj).toEqual({ name: "Alice", age: 25 });
        expect(result).toEqual({ name: "Alice" });
    });
});
