import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createFireBaseRealTimePersistConfig } from "@easilybaffled/firebase-persist";

var firebaseConfig = {
    apiKey: "AIzaSyBR6bhmSfG6aBnk1TDOQyaPLQeIGlZxV1A",
    authDomain: "re-template.firebaseapp.com",
    projectId: "re-template",
    storageBucket: "re-template.appspot.com",
    messagingSenderId: "515961302597",
    appId: "1:515961302597:web:e7c0fe5bb4ba834340bd2c",
    databaseURL: "https://re-template-default-rtdb.firebaseio.com/"
};

const configureStore = (
    reducer,
    loadingIndicator,
    persistConfig = createFireBaseRealTimePersistConfig(firebaseConfig, 100)
) => {
    console.log(persistConfig);
    const persistedReducer = persistReducer(persistConfig, reducer);
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    console.log(store.getState());
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
