import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleaware from "redux-thunk";
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

let store = createStore(
  reducer,
  composeEnhacer(applyMiddleware(thunkMiddleaware))
);

export default store;
