import React from 'react';
import PropTypes from 'prop-types'; // react prop types are depecrated
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';

const style = {
  height: 600,
  width: 450 ,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


class Profile extends React.Component {


  render() {
    return (
      
      <div>
      	<h2>Your Profile Settings : </h2>
    		<Paper style={style} zDepth={4} children={
    			    <List >
					      <ListItem primaryText={this.props.authen.user.username} disabled={true} secondaryText="Username" /> 
					      <ListItem primaryText={this.props.authen.user.email} disabled={true} secondaryText="Email"/>
					      <ListItem primaryText={this.props.authen.user.name} disabled={true} secondaryText="Name"/> 
					      <ListItem primaryText={this.props.authen.user._id} disabled={true} secondaryText="ID"/> 
					 </List> } 
			  />
	    			    
  		</div>
    );
  }
}

Profile.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		authen: state.authen
	};
}


Profile.propTypes = {
        authen: PropTypes.object.isRequired,
}


export default connect(mapStateToProps)(Profile);
