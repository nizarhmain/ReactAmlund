import React from 'react';
import ArticleList from './ArticleList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import { fetchPublishedArticles } from '../actions/articleActions';
import generatePageIndex from '../utils/generatePageIndex';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';



class Home extends React.Component {


componentWillMount() {
  let page = this.props.match.params.page;
	this.props.fetchPublishedArticles(page);	
}


onTouch(value){
  this.props.fetchPublishedArticles(value);	
}


  render() {

 let values = generatePageIndex(this.props.pagination);
			let indexes = (
				<div className ="pageIndex">
						{values.map( value => {
              if(value == this.props.match.params.page){
                return   <Link to ={"/management/" + value}  key={value} > <RaisedButton key={value} label={value} backgroundColor="#a4c639" labelColor="#ffffff" onTouchTap={() => this.onTouch(value)} /> </Link> 
              } else {
               return   <Link to ={"/management/" + value}  key={value}>  <RaisedButton  key={value} label={value} onTouchTap={() => this.onTouch(value)} /> </Link>
              }
              })
            } 	
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
