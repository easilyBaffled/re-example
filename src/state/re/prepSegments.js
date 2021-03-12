import { createActions } from "./utils/createActions";
import { createReducer } from "./utils/createReducer";

const ensureSegmentIsComplete = ({
    initialState,
    actors,
    actions = createActions(actors),
    reducer = createReducer(actors, initialState)
}) => ({
    initialState,
    actors,
    actions,
    reducer
});
export const prepSegments = (segmentsObj) =>
    Object.entries(segmentsObj).reduce(
        (acc, [name, parts]) => (
            (acc[name] = ensureSegmentIsComplete(parts)), acc
        ),
        {}
    );
