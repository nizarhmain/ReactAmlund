import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';


export default class AppLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<Router>
		      <div>
      			<header>
      				<NavBar />
      			</header>
      	
				      	<main>				      	
				      	</main>

      			<footer>
      	  			  <Footer />
      			</footer>
      		  </div>
     	 </Router>
    );
  }
}
