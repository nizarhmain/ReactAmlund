import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        username: '',
        password: '',
        email:'',
        passwordConfirmation: ''
    }
    // since we lost the scope for the on change
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };

  onChange(e){
    this.setState({ [e.target.name] : e.target.value});
  }

  // when we submit the form with the even trigger on the button
  onSubmit(e){
    e.preventDefault();
    if(this.state.password === this.state.passwordConfirmation){
        console.log("it's all good ");
        
        axios.post('http://localhost:3000/users/register', {
          name: this.state.username,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        })
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){ 
          console.log(error);}
          );

    } else {
        console.log("passwords don't match");
    }
    
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onSubmit}
      />,
    ];

    return (
      <div>
        <FlatButton label="Sign Up !" onTouchTap={this.handleOpen.bind(this)} />
        <Dialog
          title="Sign Up your account "
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <TextField 
            hintText="Choose a User Name" fullWidth={true} name="username" value={this.state.username} onChange={this.onChange}
          /><br />
           <TextField 
            hintText="Type your email " fullWidth={true} name="email" value={this.state.email} onChange={this.onChange}
          />
             <br />
          <TextField
            hintText="Choose a Password" fullWidth={true} type="password" name="password" value={this.state.password} onChange={this.onChange}
          />
          <TextField 
            hintText="Repeat your password" fullWidth={true} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.onChange}
          /><br />
             <br />
        </Dialog>
      </div>
    );
  }
}