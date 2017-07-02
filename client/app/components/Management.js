import React from 'react';
import {connect} from 'react-redux';
import ArticleList from './ArticleList';
import { fetchArticles } from '../actions/articleActions';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';


class Management extends React.Component {

componentDidMount() {
	this.props.fetchArticles();	
}

  render() {
    return (
    	
      <div>
      
          <div className = "creatingButton">  
            <Link to ="/createarticle"><RaisedButton label="Skriv en ny artikel" backgroundColor="#a4c639" labelColor="#ffffff"/> </Link>
          </div>
      
      	<ArticleList articles = {this.props.articles} />
 	  </div>
    	
    	
    );
  }
}

function mapStateToProps(state){
	return {
		authen: state.authen,
		articles: state.articles
	};
}

export default connect(mapStateToProps, {fetchArticles})(Management);
