import "./styles.css";
import configureStore from "./state/re/configureStore";
import rootReducer from "./state";
import { connect } from "react-redux";
import JSONTree from "react-json-tree";
import StopWatch from "./components/StopWatch";
const { StoreProvider } = configureStore(rootReducer);

export function App(props) {
    return (
        <div className="App">
            <JSONTree data={props} />
            <StopWatch />
        </div>
    );
}

const ConnectedApp = connect((s) => s)(App);

export default function AppWithStore() {
    return (
        <StoreProvider>
            <ConnectedApp />
        </StoreProvider>
    );
}
