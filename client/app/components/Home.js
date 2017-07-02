import React from 'react';
import ArticleList from './ArticleList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import { fetchPublishedArticles } from '../actions/articleActions';

class Home extends React.Component {


componentDidMount() {
	this.props.fetchPublishedArticles();	
}


  render() {
    return (
    	<ArticleList articles = {this.props.articles} />
    );
  }
}



function mapStateToProps(state){
  return {
    authen: state.authen,
    articles: state.articles
  };
}


export default connect(mapStateToProps, {fetchPublishedArticles})(Home);
