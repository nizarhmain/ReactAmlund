import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import { hideArticle, publishArticle, deleteArticle } from '../actions/articleActions';
import PropTypes from 'prop-types'; // react prop types are depecrated



export class Article extends React.Component{

constructor(props) {
  super();
    this.state = {
      article: props.article,
      articleState: props.article.is_published,
      isLoading: false
    };
  this.onHide = this.onHide.bind(this);
  this.onPublish = this.onPublish.bind(this);
  this.onDelete = this.onDelete.bind(this);

}


onHide(e){
  this.setState({isLoading: true});
  console.log(this.state.isLoading);
  this.props.hideArticle(this.state.article._id).then(() => {
  																																console.log("its hidden ");
                                                                  this.setState({articleState: false, isLoading:false});
                                                                    
  																															
                                                                },
                                                                
                                                          (err) => {console.log("there was an error")});
  
     //this.setState({ is_published: false});			
}

onPublish(e){
    this.setState({isLoading: true});
console.log(this.state.isLoading);
  this.props.publishArticle(this.state.article._id).then(() => {
  																																console.log("its published ");
                                                                  this.setState({articleState: true, isLoading:false});
                                                                   
                                                              },
                                                          (err) => {console.log("there was an error")});
}

onDelete(e){
  this.props.deleteArticle(this.state.article._id);
  
}


render(){
    return (
      <div className="article">
      <Card >
    <CardHeader
      title={this.state.article.title}
      subtitle={this.state.article.created}
      avatar="https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15940719_10209450529474837_3002653333101128053_n.jpg?oh=395714d17626502d8e6ea304b6589ea6&oe=59A671F3"
      
    />

    <CardMedia
      overlay={<CardTitle title={this.state.article.title} subtitle="Overlay subtitle" />}
    >
      <img src={this.state.article.cover} />
    </CardMedia>
    <CardText>
      this is just some dummy content
    </CardText>
    <CardActions>
      <RaisedButton label="Read"  default="true" />
      
      {this.state.articleState ?  <RaisedButton label="Hide"  backgroundColor="#e2e2d0" labelColor="#fff" onTouchTap={this.onHide}
      	disabled={this.state.isLoading}
      />
 :        <RaisedButton label="Publish"  backgroundColor="#00e600" labelColor="#fff"  onTouchTap={this.onPublish} disabled={this.state.isLoading}/> }
       <RaisedButton label="Update" backgroundColor="#3399ff"labelColor="#fff"/>
        <RaisedButton label="Delete"  backgroundColor="#ff3300"labelColor="#fff" onTouchTap={this.onDelete}/>
    </CardActions>
  </Card>
  </div>
    );
  
  }
}


Article.propTypes = {
        hideArticle: PropTypes.func.isRequired,
        publishArticle: PropTypes.func.isRequired,
        deleteArticle: PropTypes.func.isRequired,

};


export default connect(null , {hideArticle, publishArticle, deleteArticle})(Article);
