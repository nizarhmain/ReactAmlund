import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import { hideArticle, publishArticle } from '../actions/articleActions';
import PropTypes from 'prop-types'; // react prop types are depecrated



export class Article extends React.Component{

constructor(props) {
  super(props);
  this.state = this.props.article;
  this.onHide = this.onHide.bind(this);
  this.onPublish = this.onPublish.bind(this);
}


onHide(e){
  this.setState({
    is_published: false
  });
  this.props.hideArticle(this.state._id);
   
}

onPublish(e){
  this.setState({
    is_published: true
  });
  this.props.publishArticle(this.state._id);
  
}


render(){
    return (
      <div className="article">
      <Card >
    <CardHeader
      title={this.state.title}
      subtitle={this.state.created}
      avatar="https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15940719_10209450529474837_3002653333101128053_n.jpg?oh=395714d17626502d8e6ea304b6589ea6&oe=59A671F3"
      
    />

    <CardMedia
      overlay={<CardTitle title={this.state.title} subtitle="Overlay subtitle" />}
    >
      <img src={this.state.cover} />
    </CardMedia>
    <CardText>
      this is just some dummy content
    </CardText>
   
   <CardText>
    State : {this.state.is_published ? "" : "not"} published
   </CardText> 
    <CardActions>
      <RaisedButton label="Read"  default="true" />
      State : {this.state.is_published ? "" : "not"} published
      {this.state.is_published ?  <RaisedButton label="Hide"  backgroundColor="#e2e2d0" labelColor="#fff" onTouchTap={this.onHide}/>
 :        <RaisedButton label="Publish"  backgroundColor="#00e600" labelColor="#fff"  onTouchTap={this.onPublish}/> }
       <RaisedButton label="Update" backgroundColor="#3399ff"labelColor="#fff"/>
        <RaisedButton label="Delete"  backgroundColor="#ff3300"labelColor="#fff"/>
    </CardActions>
  </Card>
  </div>
    );
  
  }
}


Article.propTypes = {
        hideArticle: PropTypes.func.isRequired,
        publishArticle: PropTypes.func.isRequired,
};


export default connect(null , {hideArticle, publishArticle})(Article);
