import React from 'react';
import {AppBar, Tabs, Tab} from 'material-ui';
import styles from './css/navbar.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import LoginDialog from './LoginDialog';
import MyDrawer from './Drawer';
import FlatButton from 'material-ui/FlatButton'; 
import { logout } from '../actions/login';



class NavBar extends React.Component {

logout(e){
	e.preventDefault();
	this.props.logout();
	this.context.router.history.replace('/'); 
}


render(){

		if(!this.props.authen.isAuthenticated){
		return(
			<div>
				 <AppBar
		    		title={<Link to ="/">Amlund.dk</Link>}
		    		className="Navbar"
		    		
		    		// if user is not signed in 
		    		children={ <LoginDialog />}	  			    		

		    		iconElementLeft = {<MyDrawer /> }
		    		
		  		 /> 

 			</div>
			);
	} else {
			return(
			<div>
				 <AppBar
		    		title={<Link to ="/">Amlund.dk</Link>}
		    		className="Navbar"
		    		// if user is not signed in 	    		
		    		iconElementRight = {<FlatButton label="Log Out" onTouchTap = {this.logout.bind(this)}  /> }
		    		iconElementLeft = {<MyDrawer /> }
		  		 /> 

 			</div>
			);
		}
	}



}


NavBar.propTypes = {
        authen: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
	return {
		authen: state.authen
	};
}

NavBar.contextTypes = {
  router: PropTypes.object.isRequired
};


// connecting to redux  
export default connect(mapStateToProps, {logout} )(NavBar);


