import React from 'react';
import ArticleList from './ArticleList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import { fetchPublishedArticles } from '../actions/articleActions';
import generatePageIndex from '../utils/generatePageIndex';
import { Link } from 'react-router-dom';



class Home extends React.Component {


componentWillMount() {
  var page = this.props.match.params.page;
	this.props.fetchPublishedArticles(page);	
}


componentDidUpdate() {
  var page = this.props.match.params.page;
	this.props.fetchPublishedArticles(page);	
}


  render() {

	var values = generatePageIndex(this.props.pagination);
			var indexes = (
				<div className ="pageIndex">
						{values.map(value => <Link to ={"/home/" + value} key={value}> {value} </Link> )}		
				</div>
			);


    return (
      <div> 
    	<ArticleList articles = {this.props.articles} />
      
                   {indexes}
              
      </div>
    );
  }
}



function mapStateToProps(state){
  return {
    authen: state.authen,
    articles: state.articles,
    pagination: state.pagination

  };
}


Home.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(mapStateToProps, {fetchPublishedArticles})(Home);
