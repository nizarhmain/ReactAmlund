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
					      <ListItem primaryText={this.props.authen.name} disabled={true} secondaryText="Username" /> 
					      <ListItem primaryText={this.props.authen.email} disabled={true} secondaryText="Email"/>
					      <ListItem primaryText={this.props.authen.name} disabled={true} secondaryText="Name"/> 

        {this.props.authen.admin ? (
                <ListItem  disabled={true} secondaryText="You are an Administrator"/> 
              ) : (
                ""
              )}


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



export default connect(mapStateToProps)(Profile);
