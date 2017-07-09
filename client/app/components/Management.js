import React from 'react';
import {connect} from 'react-redux';
import ArticleList from './ArticleList';
import { fetchArticles } from '../actions/articleActions';
import RaisedButton from 'material-ui/RaisedButton';
import generatePageIndex from '../utils/generatePageIndex';
import { Link } from 'react-router-dom';


class Management extends React.Component {



componentWillMount() {
  var page = this.props.match.params.page;
	this.props.fetchArticles(page);	
}


componentDidUpdate() {

  var page = this.props.match.params.page;
	this.props.fetchArticles(page);	  
}

  render() {

    var values = generatePageIndex(this.props.pagination);
			var indexes = (
				<div className ="pageIndex">
						{values.map(value => <Link to ={"/management/" + value} key={value}> {value} </Link> )}		
				</div>
			);



    return (
    	
      <div>
          <div className = "creatingButton">  
            <Link to ="/createarticle"><RaisedButton label="Skriv en ny artikel" backgroundColor="#a4c639" labelColor="#ffffff"/> </Link>
          </div>
      

           

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

export default connect(mapStateToProps, {fetchArticles})(Management);
