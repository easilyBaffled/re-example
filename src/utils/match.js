/**
 * Flatten deep and complex if/ternary operations
 * @param {Object.<boolean, function>} obj
 * @return {*}
 */
export const match = (obj) => obj[true]();
