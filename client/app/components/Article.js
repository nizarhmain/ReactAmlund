import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import { hideArticle, publishArticle, deleteArticle } from '../actions/articleActions';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



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

    <CardMedia className="article_image"
    	overlay={<CardTitle title={this.state.article.title} subtitle={"blev læst " + this.state.article.read + " gange"}/>}>
      <img src={this.state.article.cover} />
    </CardMedia>

    <CardActions>
    <Link to ={"/article/" + this.state.article._id} ><RaisedButton label="Læs mere" /> </Link> 
    
    {this.props.authen.isAuthenticated ?

    <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              className="article_settings"
            >
      {this.state.articleState ? <MenuItem primaryText="Skjule" onTouchTap={this.onHide} style={{color:'grey'}}/> : <MenuItem primaryText="Udgive" onTouchTap={this.onPublish} style={{color:'green'}}/> }     
      <Link to ={"/updatearticle/" + this.state.article._id} >  <MenuItem primaryText="Opdatere" style={{color:'#9FA9FF'}}/></Link> 
      <MenuItem primaryText="Slette" onTouchTap={this.onDelete} style={{color:'red'}}/>
    </IconMenu>

     : ""}
    

    </CardActions>
  
  </Card>
  </div>
    );
  
  }
}

function mapStateToProps(state){
  return {
    authen: state.authen,
  };
}


export default connect(mapStateToProps , {hideArticle, publishArticle, deleteArticle})(Article);
