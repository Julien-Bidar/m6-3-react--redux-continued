import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import App from "./components/App/App";

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './components/App';

// ReactDOM.render(<App />, document.getElementById('root'));
