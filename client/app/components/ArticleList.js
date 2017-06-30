import React from 'react';
import Article from './Article';
import {connect} from 'react-redux';

class ArticleList extends React.Component {


	render(){

		 var emptyMessage = (
				<h3> there are no articles yet</h3>
			);

		 var articlesList = (
				<div className = "ui grid">
  { this.props.articles.map(article => <div className="four wide column"> <Article article={article} key={article._id} /> </div>)}
				</div>
			);

    return (
      
      <div>
      	
        { this.props.articles.length === 0 ? emptyMessage : articlesList }  

      </div>
    );
    
  
  }
}

function mapStateToProps(state){
	return {
		articles: state.articles
	};
}

export default connect(mapStateToProps)(ArticleList);




