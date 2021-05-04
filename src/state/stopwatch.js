import { createSelector } from "reselect";
import { set } from "./re/utils/shortcuts";
import { time } from "../utils/stringFormatting";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const STOPWATCH_INTERVAL = 50;
export const INITIAL_ELAPSED_TIME = "00:00:00:00";
export const INITIAL_STARTED_AT = "--";

export const initialState = {
    elapsedTime: 0,
    startedAt: 0,
    running: false
};

export default createSlice({
    name: "stopwatch",
    initialState,
    reducers: {
        resume(s) {
            s.running = true;
        },
        start(s) {
            s.running = true;
            s.startedAt = Date.now();
        },
        stop(s, { payload: { elapsedTime = STOPWATCH_INTERVAL } }) {
            s.running = false;
            s.elapsedTime += elapsedTime;
        },
        reset: () => initialState,
        addTime(s, { payload: { elapsedTime = STOPWATCH_INTERVAL } }) {
            s.elapsedTime += elapsedTime;
        }
    }
});

export const actors = {
    resume: set`running${true}`,
    start: () => ({
        running: true,
        startedAt: Date.now()
    }),
    stop: (s, elapsedTime = STOPWATCH_INTERVAL) => ({
        running: false,
        elapsedTime: s.elapsedTime + elapsedTime
    }),
    reset: () => initialState,
    addTime: (s, elapsedTime = STOPWATCH_INTERVAL) => ({
        elapsedTime: s.elapsedTime + elapsedTime
    })
};

export const thunks = {
    startStopWatch: (actions) => {
        return (dispatch, getState) => {
            dispatch(actions.start());
            let timer = () => {
                if (getState().stopwatch.running) {
                    dispatch(actions.addTime());
                    setTimeout(timer, STOPWATCH_INTERVAL);
                }
            };
            timer();
        };
    },
    resumeStopwatch: (actions) => {
        return (dispatch, getState) => {
            dispatch(actions.resume());
            let timer = () => {
                if (getState().stopwatch.running) {
                    dispatch(actions.addTime());
                    setTimeout(timer, STOPWATCH_INTERVAL);
                }
            };
            timer();
        };
    }
};

export const getElapsedTime = (s) => s.stopwatch.elapsedTime;
export const getStartedAt = (s) => s.stopwatch.startedAt;
export const getRunning = (s) => s.stopwatch.running;
export const getFormattedStartTime = createSelector(getStartedAt, (startedAt) =>
    startedAt ? time.hhmmss(startedAt) : INITIAL_STARTED_AT
);
export const getFormattedElapsedTime = createSelector(
    getElapsedTime,
    (elapsedTime) =>
        elapsedTime ? time.duration(elapsedTime) : INITIAL_ELAPSED_TIME
);
