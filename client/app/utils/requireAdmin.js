import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated


export default function(ComposedComponent) {

class AuthenticateAdmin extends React.Component {
	componentWillMount(){
		if(!this.props.admin) {
			this.context.router.history.push('/');
		}
	}


  render() {
    return (
     
    	<ComposedComponent {...this.props} />

    );
  }
}


AuthenticateAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};



function mapStateToProps(state){
   return{
		admin: state.authen.admin
   };
}



return connect(mapStateToProps)(AuthenticateAdmin);

}