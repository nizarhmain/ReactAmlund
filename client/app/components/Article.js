import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
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


onHide(){
  this.setState({isLoading: true});

  this.props.hideArticle(this.state.article._id).then(() => {
  																															
                                                                  this.setState({articleState: false, isLoading:false});
                                                                    
  																															
                                                                },
                                                                
                                                          (err) => {console.log("there was an error")});
  
     //this.setState({ is_published: false});			
}

onPublish(){
    this.setState({isLoading: true});

  this.props.publishArticle(this.state.article._id).then(() => {
  																															
                                                                  this.setState({articleState: true, isLoading:false});
                                                                   
                                                              },
                                                          (err) => {console.log("there was an error")});
}

onDelete(){
  this.props.deleteArticle(this.state.article._id);
  
}


render(){

    let date  = new Date(this.state.article.created);
    let newDate = date.toLocaleDateString();

    return (
      <div className="article">
   <Card >
    
    {this.props.authen.admin ?
    <CardHeader
      title={this.state.article.title}
      subtitle={newDate}
      children ={this.state.articleState ? <i className="checkmark icon checkMark"></i> : <i className="minus circle icon minusMark"></i> } 
      
    />

    : "" }


    <CardMedia className="article_image"
    	overlay={<CardTitle title={this.state.article.title} subtitle={"blev læst " + this.state.article.read + " gange"}/>}>
      <img src={this.state.article.cover} />
    </CardMedia>

    <CardActions>
    <Link to ={"/article/" + this.state.article._id} ><RaisedButton label="Læs mere" /> </Link> 
    
    {this.props.authen.admin ?

    <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              className="article_settings"
            >
      {this.state.articleState ? <MenuItem primaryText="Skjule" onTouchTap={this.onHide} style={{color:'grey'}}/> : <MenuItem primaryText="Udgive" onTouchTap={this.onPublish} style={{color:'green'}}/> }     
      <Link to ={"/updatearticle/" + this.state.article._id} >  <MenuItem primaryText="Opdater" style={{color:'#9FA9FF'}}/></Link> 
      <MenuItem primaryText="Slet" onTouchTap={this.onDelete} style={{color:'red'}}/>
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
