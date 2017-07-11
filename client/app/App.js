const React = require('react');
const ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppLayout from './AppLayout';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/login';
import jwt from 'jsonwebtoken';



import  {cyan500, cyan700,
  pinkA200, purple300, grey50,

  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack, limeA400, teal500 } from 'material-ui/styles/colors';

require('./index.css');


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#a4c639',
    textColor: darkBlack,
  },
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );


// injection of tap even for material ui 
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// keep the jwt token saved in the localstorage 
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  const userInfo = jwt.decode(localStorage.jwtToken);
  // we only store the stuff we need in the redux, we don't need the rest occupying memory in the store
  store.dispatch(setCurrentUser(userInfo._doc));
}



class App extends React.Component {
  // render method returns a UI
  // we tranform this thing from jsx to normal javascript with babel
  render(){
    return (
      
            <MuiThemeProvider  muiTheme={muiTheme}> 
             <AppLayout />
            </MuiThemeProvider>
      
      );
  }
}

ReactDOM.render(
  // redux provider store
    <Provider store = { store }>
      <App />
    </Provider>
    ,
  document.getElementById('app')
)
