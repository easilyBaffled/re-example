import mergeWith from "lodash/mergeWith";

export const customizers = {
    replace: (newValues) => (oldValues) => newValues,
    concat: (newValues) => (oldValues) => oldValues.concat(newValues)
};

function customizer(prevValue, newValue) {
    if (typeof newValue === "function") return newValue(prevValue);

    if (Array.isArray(prevValue)) return prevValue.concat(newValue);
}

export const merge = (...args) => mergeWith({}, ...args, customizer);
