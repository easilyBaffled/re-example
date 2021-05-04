import { combineReducers } from "redux";
import stopwatch from "./stopwatch";

export const stateControls = {
    stopwatch
};

export default combineReducers(
    Object.entries(stateControls).reduce(
        (acc, [name, { reducer }]) => ({
            ...acc,
            [name]: reducer
        }),
        {}
    )
);
