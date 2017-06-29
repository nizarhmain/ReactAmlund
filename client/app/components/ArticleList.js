import React from 'react';
import Article from './Article';
import {connect} from 'react-redux';

export default class ArticleList extends React.Component {

	
	constructor(props) {
		super(props);
		this.articles = this.props.articles;
	}
	

	render(){

		 var emptyMessage = (
				<h3> there are no articles yet</h3>
			);

		 var articlesList = (
				<div>
				{ this.articles.map(article => <Article article={article} key={article._id} />)}
				</div>
			);

    return (
      
      <div>

        { this.articles.length === 0 ? emptyMessage : articlesList }  

      </div>
    );
    
  
  }
}






