import { combineReducers } from "redux";
import * as stopwatch from "./stopwatch";
import { prepSegments } from "./re/prepSegments";

export const stateControls = prepSegments({
    stopwatch
});

export default combineReducers(
    Object.entries(stateControls).reduce(
        (acc, [name, { reducer }]) => ({
            ...acc,
            [name]: reducer
        }),
        {}
    )
);
