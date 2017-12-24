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
class AppTheme extends React.Component {
  state = {
    theme: createMuiTheme({
      palette: {
        type: 'light',
        text: {
          // title: '#2ca6cb',
          title: '#3f51b5',
          titleHover: '#7B68EE',
          secondary: '#817c7c',
        }
      },
    })
  }

  onLight = () => {
    const newType = this.state.theme.palette.type === 'light' ? 'dark' : 'light'
    this.setState({
      theme: createMuiTheme({
        palette: {
          type: newType
        },
      })
    })
  }

  render() {
    return (
      <Provider store={store}>
      <MuiThemeProvider theme={this.state.theme}>
        <App onLight={this.onLight}/>
      </MuiThemeProvider>
    </Provider>
    ) 
  }
}

ReactDOM.render(<AppTheme />, document.getElementById('root'));
registerServiceWorker();
