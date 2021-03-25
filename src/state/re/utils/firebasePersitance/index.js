import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
    createDefaultPersistConfig,
    deserializePersit
} from "./configuredPersist";
import { initRealtimeFirebaseDB } from "./firebaseConnection";

export default createDefaultPersistConfig;

export const createFireBaseRealTimePersistConfig = () => {
    const dbStorage = initRealtimeFirebaseDB();

    const mergedStorage = {
        getItem: dbStorage.getItem,
        setItem: (key, value) =>
            storage.setItem(key, value).then(() => {
                dbStorage.setItem(deserializePersit(value));
            }),
        deleteItem: (...args) =>
            storage.deleteItem(...args).then((res) => {
                dbStorage.deleteItem();
                return res;
            })
    };

    return createDefaultPersistConfig({ storage: mergedStorage });
};
