import React from 'react';
import '../secondary-expandable-navigation/css/style.css';
import '../secondary-expandable-navigation/css/reset.css';
import '../secondary-expandable-navigation/js/main.js';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import LoginDialog from './LoginDialog';
import MyDrawer from './Drawer';
import FlatButton from 'material-ui/FlatButton'; 
import { logout } from '../actions/login';


class NavBar extends React.Component {
  
  constructor(props) {
    super(props);
  }

  logout(e){
	e.preventDefault();
	this.props.logout();
	this.context.router.history.replace('/'); 
}

  render() {
    return (
      <div className="container">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css" />
        {/* Modernizr */}
        <header>
           <Link className="logo" to ="/">Amlund.dk</Link>
          <nav id="cd-top-nav">
            <ul>
            {this.props.authen.isAuthenticated && <li id="ProfileLink"><Link to ="/profile">Profilen</Link></li>}
            {!this.props.authen.isAuthenticated ? <li><LoginDialog /></li> :  <li><FlatButton label="Log Ud" onTouchTap = {this.logout.bind(this)}/></li> }
            </ul>
          </nav>
          <a id="cd-menu-trigger" href="#0"><span className="cd-menu-text">Menu</span><span className="cd-menu-icon" /></a>
        </header>      


        <nav id="cd-lateral-nav">
          <ul className="cd-navigation">
            <li className="item-has-children">
              <a href="#0">Services</a>
              <ul className="sub-menu">
                <li><a href="#0">Brand</a></li>
                <li><a href="#0">Web Apps</a></li>
                <li><a href="#0">Mobile Apps</a></li>
              </ul>
            </li> {/* item-has-children */}
            <li className="item-has-children">
              <a href="#0">Products</a>
              <ul className="sub-menu">
                <li><a href="#0">Product 1</a></li>
                <li><a href="#0">Product 2</a></li>
                <li><a href="#0">Product 3</a></li>
                <li><a href="#0">Product 4</a></li>
                <li><a href="#0">Product 5</a></li>
              </ul>
            </li> {/* item-has-children */}
            <li className="item-has-children">
              <a href="#0">Stockists</a>
              <ul className="sub-menu">
                <li><a href="#0">London</a></li>
                <li><a href="#0">New York</a></li>
                <li><a href="#0">Milan</a></li>
                <li><a href="#0">Paris</a></li>
              </ul>
            </li> {/* item-has-children */}
          </ul> {/* cd-navigation */}
          <ul className="cd-navigation cd-single-item-wrapper">
          {this.props.authen.isAuthenticated && <li><Link to ="/management">Management</Link></li>}
            <li><Link to ="/">Home</Link></li>
            <li><a href="#0">Tour</a></li>
            <li><a href="#0">Login</a></li>
            <li><a href="#0">Register</a></li>
            <li><a href="#0">Pricing</a></li>
            <li><a href="#0">Support</a></li>
          </ul> {/* cd-single-item-wrapper */}
          <ul className="cd-navigation cd-single-item-wrapper">
            <li><a className="current" href="#0">Journal</a></li>
            <li><a href="#0">FAQ</a></li>
            <li><a href="#0">Terms &amp; Conditions</a></li>
            <li><a href="#0">Careers</a></li>
            <li><a href="#0">Students</a></li>
          </ul> {/* cd-single-item-wrapper */}
          <div className="cd-navigation socials">
            <a className="cd-twitter cd-img-replace" href="#0">Twitter</a>
            <a className="cd-github cd-img-replace" href="#0">Git Hub</a>
            <a className="cd-facebook cd-img-replace" href="#0">Facebook</a>
            <a className="cd-google cd-img-replace" href="#0">Google Plus</a>
          </div> {/* socials */}
        </nav>
        {/* Resource jQuery */}
      </div>
    );
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



