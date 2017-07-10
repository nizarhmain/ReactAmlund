import React from 'react';
import {connect} from 'react-redux';
import ArticleList from './ArticleList';
import NotFound from './NotFound';
import { fetchArticles } from '../actions/articleActions';
import RaisedButton from 'material-ui/RaisedButton';
import {generatePageIndex, generateNewIndexes } from '../utils/generatePageIndex';
import { Link } from 'react-router-dom';

class Management extends React.Component {

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
  if( page == null) {
    page = 1
  }
	this.props.fetchArticles(page).then( () =>  this.setState({ pages : generateNewIndexes(page, this.props.pagination.pages) }),
     (err) => {  this.setState({ notFound : true })  }
  ) ;
}

onTouch(value){
  this.props.fetchArticles(value);	
  if(this.props.pagination.pages == value ){
      console.log("we're at the end");
      // don't generate no more
    } else {
  this.setState({pages : generateNewIndexes(value, this.props.pagination.pages) });
    }
}



  render() {
    
     
			let indexes = (
				<div className ="pageIndex">
						{this.state.pages.map( value => {
              if(value == this.props.pagination.currentPage){
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

        
          <div> 

                {this.state.notFound ? <NotFound/> : 
                <div>
                    <ArticleList articles = {this.props.articles} />
                    
                                {indexes}
                </div>
                }
    	
              
      </div>      

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

export default connect(mapStateToProps, {fetchArticles})(Management);
