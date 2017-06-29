import React from 'react';
import ArticleList from './ArticleList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import { fetchArticles } from '../actions/articleActions';

class Home extends React.Component {


componentDidMount() {
	this.props.fetchArticles();	
}


  render() {
    return (
    	<div>
     this is the home page
 		</div>
    );
  }
}

Home.propTypes = {
       articles: PropTypes.array.isRequired,
       fetchArticles: PropTypes.func.isRequired
}



function mapStateToProps(state){
	return {
		articles: state.articles
	}
}


export default connect(mapStateToProps, {fetchArticles})(Home);
