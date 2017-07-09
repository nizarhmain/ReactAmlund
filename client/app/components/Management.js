import React from 'react';
import {connect} from 'react-redux';
import ArticleList from './ArticleList';
import { fetchArticles } from '../actions/articleActions';
import RaisedButton from 'material-ui/RaisedButton';
import generatePageIndex from '../utils/generatePageIndex';
import { Link } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';

class Management extends React.Component {

componentWillMount() {
  let page = this.props.match.params.page;
	this.props.fetchArticles(page);	
}


onTouch(value){
  this.props.fetchArticles(value);	
}


  render() {

    let values = generatePageIndex(this.props.pagination);
			let indexes = (
				<div className ="pageIndex">
						{values.map( value => {
              if(value == this.props.match.params.page){
                return   <Link to ={"/management/" + value}  key={value}> <RaisedButton key={value} label={value} backgroundColor="#a4c639" labelColor="#ffffff" onTouchTap={() => this.onTouch(value)} /> </Link> 
              } else {
               return   <Link to ={"/management/" + value}  key={value}>  <RaisedButton  key={value} label={value} onTouchTap={() => this.onTouch(value)} /> </Link>
              }
              })
            } 	
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
