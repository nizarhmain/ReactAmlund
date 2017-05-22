var React = require('react');
var ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppLayout from './AppLayout';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



import  {cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack, limeA400, teal500 } from 'material-ui/styles/colors';

require('./index.css');


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
    textColor: darkBlack,
  },
});


// injection of tap even for material ui 
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
      <App />
    ,
  document.getElementById('app')
)
