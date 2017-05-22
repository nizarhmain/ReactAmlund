import React from 'react';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import LoginDude from 'material-ui/svg-icons/action/perm-identity';
import TextField from 'material-ui/TextField';
import SignUp from './SignUp'

const customContentStyle = {
  width: '40%',
  maxWidth: 'none',
};
const customButtonStyle = {
};
const boutons = {
  textAlign: 'center',
};
/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open:false};
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
    <RaisedButton
        label="Login"
        secondary={true}
        buttonStyle={customButtonStyle}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,

       <SignUp />,

    ];

    return (
      <div>
      <Tab icon={<LoginDude />}  onTouchTap={this.handleOpen.bind(this)}/>
        <Dialog
          title="Login"
          actions={actions}
          actionsContainerStyle={boutons}
           contentStyle={customContentStyle}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
       <TextField 
            hintText="User Name" fullWidth={true}
          /><br />
             <br />
          <TextField
            hintText=" Password " fullWidth={true} type="password"
          />

          

        </Dialog>



      </div>
    );
  }
}