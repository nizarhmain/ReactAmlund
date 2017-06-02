import React from 'react';
import {AppBar, Tabs, Tab} from 'material-ui';
import styles from './css/navbar.css';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import { login } from '../actions/login';
import { setCurrentUser } from '../actions/login';
import LoginDialog from './LoginDialog';
import MyDrawer from './Drawer';


class NavBar extends React.Component {


render(){

    const { login } = this.props;

		return(
			<div>
				 <AppBar
		    		title={<Link to ="/">Amlund</Link>}
		    		className="Navbar"
		    		children={

		    				  <LoginDialog login = {login} setCurrentUser = {setCurrentUser} />	// opens the login dialog box		    		
		    		}

		    		iconElementLeft = {<MyDrawer /> }
		    	
		  		 /> 

 			</div>
			);
	}



}

NavBar.propTypes = {
        login: PropTypes.func.isRequired,
        setCurrentUser: PropTypes.func.isRequired
}

// connecting to redux  
export default connect(null , { login, setCurrentUser})(NavBar);


