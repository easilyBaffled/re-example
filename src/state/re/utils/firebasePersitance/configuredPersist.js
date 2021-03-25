import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { isJson } from "../../../../utils/predicates";

const deserialize = (mightBeString) =>
    isJson(mightBeString) ? JSON.parse(mightBeString) : mightBeString;

export const deserializePersit = (jsonString) =>
    Object.entries(JSON.parse(jsonString)).reduce(
        (acc, [k, v]) => ({
            ...acc,
            [k]: JSON.parse(v)
        }),
        {}
    );

export const createDefaultPersistConfig = (persistConfig) => {
    const defaultPersistConfig = {
        key: "root",
        storage,
        stateReconciler: hardSet,
        debug: true,
        deserialize
    };

    return { ...defaultPersistConfig, ...persistConfig };
};
