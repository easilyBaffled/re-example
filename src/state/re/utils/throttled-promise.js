import throttle from "lodash/throttle";

export const throttlePromise = (reqFn, time = 2000) => {
    let p = null;
    return throttle((...args) => {
        if (!p)
            p = reqFn(...args).then(() => {
                p = null;
            });
    }, time);
};
