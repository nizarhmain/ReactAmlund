import React from 'react';
import styles from '../NexusBar/css/component.css';
import '../NexusBar/js/classie.js';
import '../NexusBar/js/gnmenu.js';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import LoginDialog from './LoginDialog';
import MyDrawer from './Drawer';
import FlatButton from 'material-ui/FlatButton'; 
import { logout } from '../actions/login';

class NavBar2 extends React.Component {


  constructor(props) {
    super(props);
    
  }


logout(e){
	e.preventDefault();
	this.props.logout();
	this.context.router.history.replace('/'); 
}

componentDidMount() {
	new gnMenu( document.getElementById( 'gn-menu' ) );
}

  render() {

      return (
      			<div>
      				
      <div className="container">
        <ul id="gn-menu" className="gn-menu-main">
          <li className="gn-trigger">
            <a className="gn-icon gn-icon-menu"><span>Menu</span></a>
            <nav className="gn-menu-wrapper">
              <div className="gn-scroller">
                <ul className="gn-menu">
                  <li className="gn-search-item">
                    <input placeholder="Search" type="search" className="gn-search" />
                    <a className="gn-icon gn-icon-search"><span>Search</span></a>
                  </li>
                  <li>
                    <a className="gn-icon gn-icon-download">Downloads</a>
                    <ul className="gn-submenu">
                      <li><a className="gn-icon gn-icon-illustrator">Vector Illustrations</a></li>
                      <li><a className="gn-icon gn-icon-photoshop">Photoshop files</a></li>
                    </ul>
                  </li>
                  <li><a className="gn-icon gn-icon-cog">Settings</a></li>
                  <li><a className="gn-icon gn-icon-help">Help</a></li>
                  <li>
                    <a className="gn-icon gn-icon-archive">Archives</a>
                    <ul className="gn-submenu">
                      <li><a className="gn-icon gn-icon-article">Articles</a></li>
                      <li><a className="gn-icon gn-icon-pictures">Images</a></li>
                      <li><a className="gn-icon gn-icon-videos">Videos</a></li>
                    </ul>
                  </li>
                </ul>
              </div>{/* /gn-scroller */}
            </nav>
          </li>
          <li><Link to ="/">Amlund.dk</Link></li>
         	{this.props.authen.isAuthenticated && <li id="ProfileLink"><Link to ="/profile">Profile</Link></li>}
      		
          {!this.props.authen.isAuthenticated ? <li><LoginDialog /></li> :  <li><FlatButton label="Log Out" onTouchTap = {this.logout.bind(this)}/></li> }
        </ul>

      </div>
      			</div>
    	);
  }
}


NavBar2.propTypes = {
        authen: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
	return {
		authen: state.authen
	};
}

NavBar2.contextTypes = {
  router: PropTypes.object.isRequired
};


// connecting to redux  
export default connect(mapStateToProps, {logout} )(NavBar2);




