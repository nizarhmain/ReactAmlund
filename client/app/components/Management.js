import React from 'react';
import {connect} from 'react-redux';
import ArticleList from './ArticleList';
import { fetchArticles } from '../actions/articleActions';

class Management extends React.Component {

componentDidMount() {
	this.props.fetchArticles();	
}

  render() {
    return (
    	
      <div>
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
