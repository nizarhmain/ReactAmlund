import React from 'react';
import { getArticle } from '../actions/articleActions';
import {connect} from 'react-redux';



class ReadArticle extends React.Component {
  
constructor(props) {
	super(props);
}

componentDidMount() {	
	var id = this.props.match.params.id;
	this.props.getArticle(id);
}


  render() { 	

  	

    return (	
    	  
      <div>
      		{this.props.article.title}
      </div>				
			
    );
  }
}

function mapStateToProps(state){
	return {
		/*
      article: state.articles.find(article => article._id === this.props.match.params.id)
   		*/
   		article: state.articles[0]
    }
}


export default connect(mapStateToProps, {getArticle})(ReadArticle);
