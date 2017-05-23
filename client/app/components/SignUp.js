import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types'; // react prop types are depecrated
import CircularProgress from 'material-ui/CircularProgress';
import { validateInput } from '../../../server/shared/validations/signup';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        username: '',
        password: '',
        email:'',
        name: '',
        passwordConfirmation: '',
        errors: '',
        isLoading: false,
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


  // client side validation
  isValid(){        // returns a true or false 
    const { errors, isValid } = validateInput(this.state);
    // if it ain't valid we populate the state with the errors received
    if(!isValid){
      this.setState({errors});
      console.log("we got some errors boi ");
    }
    return isValid;
  }

  // when we submit the form with the even trigger on the button
  onSubmit(e){

    if(this.isValid()){
       this.setState({errors : {}, isLoading: true });
        e.preventDefault();
        this.props.userSignupRequest(this.state)
        .then(
          // if everything is succesfull
            () => {  this.setState({ testState: 'does nothing', isLoading: false});      
                      this.context.router.history.replace('/privet');                          
             },   
             // if we get an error back with errors with it with populate the state with the data            
            (err) => { 
                  this.setState({ errors: err.response.data, isLoading: false });
          }
        );
    }
  }

  render() {
    const { errors } = this.state;

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
        disabled = {this.state.isLoading}
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
            hintText="Your Full Name" fullWidth={true} name="name" value={this.state.name} onChange={this.onChange}
            errorText={errors.name}
          /><br />

          <TextField 
            hintText="Choose a User Name" fullWidth={true} name="username" value={this.state.username} onChange={this.onChange}
             errorText={errors.username}
          /><br />
           <TextField 
            hintText="Type your email " fullWidth={true} name="email" value={this.state.email} onChange={this.onChange}
             errorText={errors.email}
          />
             <br />
          <TextField
            hintText="Choose a Password" fullWidth={true} type="password" name="password" value={this.state.password} onChange={this.onChange}
           errorText={errors.password}
          />
          <TextField 
            hintText="Repeat your password" fullWidth={true} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.onChange}
           errorText={errors.passwordConfirmation}
          /><br />
             <br />

             {this.state.isLoading && <CircularProgress / >}

        </Dialog>



      </div>


    );

  }

}

 SignUp.propTypes = {
        userSignupRequest: PropTypes.func.isRequired
    }

SignUp.contextTypes = {
  router: PropTypes.object.isRequired
}
