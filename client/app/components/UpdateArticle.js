import React from 'react';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import TinyMCEInput from 'react-tinymce-input'
import { Field, reduxForm } from 'redux-form';  // ES6
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { updateArticle } from '../actions/articleActions';
import FlashMessage from './flash/FlashMessage';
import {addFlashMessage, deleteFlashMessage } from '../actions/flashMessages';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'



const TINYMCE_CONFIG = {
  'language'  : 'en',
  'theme'     : 'modern',
  'toolbar'   : 'fontselect indent ltr rtl fullscreen fontsizeselect visualblocks template preview undo redo | bold italic | alignleft aligncenter alignright | pagebreak code link image forecolor backcolor emoticons insertdatetime media',
  'menubar'   : false,
  'statusbar' : true,
  'resize'    : false,
  'plugins'   : 'link,visualblocks,directionality,template,fullscreen,preview,emoticons,link,image,code,nonbreaking,textcolor,colorpicker,insertdatetime,media,pagebreak',
  'height'    : 1500,
  'theme_modern_toolbar_location' : 'top',
  'theme_modern_toolbar_align': 'left',
  'indentation' : '20pt',
  'nonbreaking_force_tab': true,
  'table_grid': false,
  'image_advtab': true

};

export class UpdateArticle extends React.Component {

		

	constructor(props) {
		super(props);

		this.state = {
			_id: '',
			title: '',
			content : '',
			is_published: false,
			isLoading: true,
			author: this.props.authen.user.name
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onNonContentChange = this.onNonContentChange.bind(this);
		this.onCheckBoxChange = this.onCheckBoxChange.bind(this);

	}

	componentWillMount() {
		var id = this.props.match.params.id;
		axios.get('http://localhost:3000/articles/post/' + id).then(res => {
		this.setState({content: res.data.article.content, _id:res.data.article._id,
						title: res.data.article.title,	 isLoading: false})
			});

	}

	  onChange(newValue) {
	    this.setState({ content: newValue });
	  }

	  onNonContentChange(e){
	  	 this.setState({ [e.target.name] : e.target.value});
	  }

	  onCheckBoxChange(){
	  	this.setState({is_published: !this.state.is_published});
	  }

	  onSubmit(e){
	  	e.preventDefault();
	  	this.props.updateArticle(this.state);
	  }
 


 
  render() {
   
   return (	
   		
		<div >

		<div className = "update_settings">
			<div className ="ui container segment ">
			<Checkbox label="Is Publish At Update ? "  onCheck={this.onCheckBoxChange} />
			 <TextField   hintText="Title of The Article" value={this.state.title}  name="title" onChange={this.onNonContentChange} />
			</div>	
		</div>

		<TinyMCEInput  value={this.state.content} tinymceConfig={TINYMCE_CONFIG} onChange={this.onChange} />


		<RaisedButton
          label="Submit"
          className ="submitButton"
          primary={true}
          onTouchTap={this.onSubmit}
        	/>  
					
		</div>				
		
		);
  }
}

function mapStateToProps(state){
  return {
    authen: state.authen
  };
}

export default connect(mapStateToProps , {updateArticle} )(UpdateArticle);
