import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

function App() {
  return (
    <div className="App">
      <div>{store.getState()}</div>
      <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
    </div>
  );
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
