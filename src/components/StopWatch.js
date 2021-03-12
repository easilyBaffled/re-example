import { connect } from "react-redux";
import { stateControls } from "../state";
import {
    thunks,
    getRunning,
    getFormattedElapsedTime,
    getFormattedStartTime,
    INITIAL_STARTED_AT
} from "../state/stopwatch";
import memoize from "lodash/memoize";
import mapValues from "lodash/mapValues";

const match = memoize((obj) =>
    typeof obj[true] === "function" ? obj[true]() : obj[true]
);

const {
    stopwatch: { actions }
} = stateControls;
export const StopWatch = ({
    startedAt,
    elapsedTime,
    isRunning,
    start,
    resume,
    stop,
    reset
}) => (
    <div>
        <div className="controls">
            {match({
                [true]: () => "test",
                [startedAt === INITIAL_STARTED_AT]: () => (
                    <button onClick={start}>start</button>
                ),
                [startedAt !== INITIAL_STARTED_AT]: () => (
                    <button onClick={resume}>resume</button>
                ),
                [isRunning]: () => <button onClick={stop}>pause</button>
            })}
            <button onClick={reset}>reset</button>
        </div>
        <div className="data-display">
            <h3>Started At: {startedAt}</h3>
            <h3>Time Elapsed: {elapsedTime}</h3>
        </div>
    </div>
);

const actionMapper = (actionsMap) => (dispatch) =>
    mapValues(actionsMap, (a) => () => dispatch(a));

const ConnectedComponent = connect(
    (s) => ({
        startedAt: getFormattedStartTime(s),
        elapsedTime: getFormattedElapsedTime(s),
        isRunning: getRunning(s)
    }),
    actionMapper({
        start: thunks.startStopWatch(actions),
        resume: thunks.resumeStopwatch(actions),
        stop: actions.stop(),
        reset: actions.reset()
    })
)(StopWatch);

export default ConnectedComponent;
