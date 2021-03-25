import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createFireBaseRealTimePersistConfig } from "./utils/firebasePersitance";

const configureStore = (
    reducer,
    loadingIndicator,
    persistConfig = createFireBaseRealTimePersistConfig()
) => {
    console.log(persistConfig);
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
