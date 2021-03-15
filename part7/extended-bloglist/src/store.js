import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer, { initBlogs } from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";

import blogService from "./services/blogs";

const reducer = combineReducers({
  user: loginReducer,
  blogs: blogReducer,
  notification: notificationReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

blogService.getAll().then((blogs) =>
  blogs.forEach((blog) => {
    store.dispatch(initBlogs(blogs));
  })
);

export default store;
