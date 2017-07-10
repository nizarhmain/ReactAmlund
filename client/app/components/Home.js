import React from 'react';
import ArticleList from './ArticleList';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import PropTypes from 'prop-types'; // react prop types are depecrated
import { fetchPublishedArticles } from '../actions/articleActions';
import {generatePageIndex, generateNewIndexes } from '../utils/generatePageIndex';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';



class Home extends React.Component {

constructor(props){
    super(props);
      this.state = {  
        pages : generatePageIndex(props.pagination.pages),
        currentPage: props.pagination.currentPage,
        notFound: false
      }
    
}


componentWillMount() {
  let page = this.props.match.params.page;
	this.props.fetchPublishedArticles(page).then( () =>  this.setState({ pages : generateNewIndexes(page, this.props.pagination.pages) }),
            (err) => {  this.setState({ notFound : true })  }

  ) ;
}


onTouch(value){
  this.props.fetchPublishedArticles(value);	
    if(this.props.pagination.pages == value ){
      console.log("we're at the end");
    } else {
  this.setState({ pages : generateNewIndexes(value, this.props.pagination.pages) });
    }
}



  render() {

 let values = generatePageIndex(this.props.pagination);
			let indexes = (
				<div className ="pageIndex">
						{this.state.pages.map( value => {
              if(value == this.props.pagination.currentPage){
                return   <Link to ={"/home/" + value}  key={value} > <RaisedButton key={value} label={value} backgroundColor="#a4c639" labelColor="#ffffff" onTouchTap={() => this.onTouch(value)} /> </Link> 
              } else {
               return   <Link to ={"/home/" + value}  key={value}>  <RaisedButton  key={value} label={value} onTouchTap={() => this.onTouch(value)} /> </Link>
              }
              })
            } 	
				</div>
			);


    return (
      <div> 

      {this.state.notFound ? <NotFound/> : 
      <div>
          <ArticleList articles = {this.props.articles} />
          
                      {indexes}
      </div>
      }
    	
              
      </div>
    );
  }
}



function mapStateToProps(state){
  return {
    articles: state.articles,
    pagination: state.pagination

  };
}


Home.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(mapStateToProps, {fetchPublishedArticles})(Home);
