import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {createStore} from 'redux';
import {Store} from 'redux';
import { rootReducer } from './store/reducer';
import {Provider} from 'react-redux';
import { Reducer } from './services/reducer';

const initialState = {
  rootState: {
    loggedIn: false,
    commune: {},
    user: {}
  }
};

const store : Store < any > = createStore(rootReducer, initialState);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
