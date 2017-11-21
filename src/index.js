import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducers from './reducers'
import './index.css';
import App from './pages/App/';

let store = createStore(appReducers, applyMiddleware(thunk))
const theme = createMuiTheme();
function AppTheme() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Provider>
    );
}

ReactDOM.render(<AppTheme />, document.getElementById('root'));
registerServiceWorker();
