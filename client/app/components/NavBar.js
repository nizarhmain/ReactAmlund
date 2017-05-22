import React from 'react';

import {AppBar, Tabs, Tab} from 'material-ui';
import styles from './css/navbar.css';

import {Link } from 'react-router-dom';

import LoginDialog from './LoginDialog';

import MyDrawer from './Drawer';


class NavBar extends React.Component {


render(){
		return(
			<div>
				 <AppBar
		    		title={<Link to ="/">Amlund</Link>}
		    		className="Navbar"
		    		children={

		    				  <LoginDialog />	// opens the login dialog box		    		
		    		}

		    		iconElementLeft = {<MyDrawer /> }
		    	
		  		 /> 

 			</div>
			);
	}



}

export default NavBar;


