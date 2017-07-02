import React from 'react';
import Article from './Article';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';


class ArticleList extends React.Component {


	render(){

		 var emptyMessage = (
				<CircularProgress size={80} thickness={5} />
			);

		 var articlesList = (
				<div className = "ui stackable grid container">
  						{ this.props.articles.map(article => 
  						<div className="four wide column" key={article._id}> <Article article={article}/> </div>)}
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




