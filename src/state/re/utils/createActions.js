import { match } from "../../../utils/match";

const payloadUnpacker = (payload) =>
    match({
        true: () => payload,
        [payload.length === 0]: () => undefined,
        [payload.length === 1]: () => payload[0]
    });

/**
 * Convert Actors - state updating functions used by the reducer - into redux action functions
 * by using the actor name as the action `type`.
 * @param {Object.<string, function>} updaters
 * @return {Object.<string, function(...[*]=): {payload: ...[*]=, type: string}>}
 */
export const createActions = (updaters) =>
    Object.keys(updaters).reduce(
        (acc, type) => ({
            ...acc,
            [type]: (...payload) => ({
                type,
                payload: payloadUnpacker(payload)
            })
        }),
        {}
    );
