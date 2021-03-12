export const update = (updater) => (state, payload) => ({
    ...state,
    ...updater(payload)
});

export const composeUpdaters = (...funcs) => (state, prop) =>
    funcs.reduce((s, fn) => fn(s, prop), state);

export const set = ([propName], defaultValue) => (
    state,
    prop = typeof defaultValue === "function" ? defaultValue() : defaultValue
) => ({
    ...state,
    [propName]: prop
});

export const append = ([propName]) => (state, prop) => ({
    ...state,
    [propName]: state[propName].concat(prop)
});
