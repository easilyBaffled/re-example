console.tap = (v, ...rest) => (console.log(v, ...rest), v);
console.tap.label = (label, style) => (v, ...rest) => (
    console.log(`%c${label}`, style, v, ...rest), v
);
console.tap.passThrough = (func) => (v, ...rest) => (
    console.log(v, ...rest), func(v)
);
