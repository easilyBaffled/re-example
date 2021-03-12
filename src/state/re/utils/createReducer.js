/**
 *
 * @param {Object.<string, function(T, ...[*]=): T >} actors
 * @param {T} initialState
 * @return {function(T, { type: string, payload: ...[*]= }): T}
 */
export const createReducer = (actors, initialState) => (
    state = initialState,
    { type, id, payload } = {}
) => {
    try {
        return type in actors
            ? { ...state, ...actors[type](state, payload, id) }
            : state;
    } catch (e) {
        const data = {
            type,
            action: actors[type],
            payload
        };

        // console.log( typeof actors[ type ], { payload, state });
        e.message = `${JSON.stringify(data, null, 4)}
  ${e.message}`;

        throw e;
    }
};
