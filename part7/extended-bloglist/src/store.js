import { createStore, applyMiddleware } from "redux";
import notificationReducer from "./reducers/notificationReducer";
import thunk from "redux-thunk";

const store = createStore(notificationReducer, applyMiddleware(thunk));

export default store;
