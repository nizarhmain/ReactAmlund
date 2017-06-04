import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar2';
import Footer from './components/Footer';
import CreateArticle from './components/CreateArticle';
import Profile from './components/Profile';
import Home from './components/Home';
import requireAuth from './utils/requireAuth';

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
              <Route exact path="/" component={Home} />
              <Route path="/createarticle" component={requireAuth(CreateArticle)} />
              <Route path="/profile" component={requireAuth(Profile)} />			      	
				   </main>

      		
      		  </div>
     	 </Router>
    );
  }
}
