import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CreateArticle from './components/CreateArticle';
import Management from './components/Management';
import Profile from './components/Profile';
import ReadArticle from './components/ReadArticle';
import UpdateArticle from './components/UpdateArticle';
import Home from './components/Home';
import requireAuth from './utils/requireAuth';
import requireAdmin from './utils/requireAdmin';



export default class AppLayout extends React.Component {

  constructor(props) {
	super(props);
  }

  render() {
	return (
		<Router>
			  <div>
					<NavBar />
		   
		  <main>
			  <Route path="/home/:page" component={Home} />
			  <Route exact path="/createarticle" component={requireAdmin(CreateArticle)} />
			  <Route path="/management/:page" component={requireAdmin(Management)} />
			  <Route exact path="/profile" component={requireAuth(Profile)} />     
			  <Route path="/article/:id" component={ReadArticle} />      
			  <Route path="/updatearticle/:id" component={requireAuth(UpdateArticle)} />   
		   </main>
		   
		  
		   

			
			  </div>
		 </Router>
	);
  }
}
