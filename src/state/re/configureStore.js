import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { configureGithubStorage } from "./utils/ghStorageMiddleware";
import { isJson } from "../../utils/predicates";

const deserialize = (mightBeString) =>
    isJson(mightBeString) ? JSON.parse(mightBeString) : mightBeString;
// console.log(storage);
const githubStorage = configureGithubStorage({
    repo: "routine-parse-tag-sort",
    path: "src/list.md"
});

const mergedStorage = {
    getItem: (...args) =>
        githubStorage.getItem(...console.tap(args)).then(console.tap),
    setItem: (...args) =>
        console.tap(storage.setItem(...args), "setItem").then((res) => {
            console.log({ args, res });
            githubStorage.setItem(...args);
            return res;
        }),
    deleteItem: (...args) =>
        storage.deleteItem(...args).then((res) => {
            githubStorage.deleteItem(...args);
            return res;
        })
};

const defaultPersistConfig = {
    key: "root",
    storage: mergedStorage,
    stateReconciler: hardSet,
    debug: true,
    deserialize
};

const configureStore = (
    reducer,
    loadingIndicator,
    persistConfig = defaultPersistConfig
) => {
    const persistedReducer = persistReducer(persistConfig, reducer);
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);

    const StoreProvider = ({ children }) => (
        <Provider store={store}>
            <PersistGate loading={loadingIndicator} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );

    return { store, persistor: {}, StoreProvider };
};
export default configureStore;
