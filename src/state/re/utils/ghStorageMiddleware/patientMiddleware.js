import throttle from "lodash/throttle";

let p = null;
const handleReq = (reqFn, time = 2000) =>
    throttle((state) => {
        if (!p)
            p = reqFn(state).then(() => {
                p = null;
            });
    }, time);

export const waited = (reqFn) => {
    const req = handleReq(reqFn);
    return (store) => (next) => (action) => {
        const res = next(action);
        req(store.getState());
        return res;
    };
};
