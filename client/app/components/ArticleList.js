import React from 'react';
import Article from './Article';
import PropTypes from 'prop-types'; // react prop types are depecrated


export default function ArticleList({articles}) {

	const emptyMessage = (
		<h3> there are no articles yet</h3>
		);

	const articlesList = (
		<div>
		{ articles.map(article => <Article article={article} key={article._id} />)}
		</div>
		);

    return (
      <div>
      { articles.length === 0 ? emptyMessage : articlesList }
      </div>
    );
  
}

ArticleList.propTypes = {
       articles: PropTypes.array.isRequired
}





