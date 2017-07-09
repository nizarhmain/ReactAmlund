import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import TinyMCEInput from 'react-tinymce-input'
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { updateArticle } from '../actions/articleActions';
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
			is_published: true,
			isLoading: true,
			author: this.props.authen.username,
			modalOpen: false 
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onNonContentChange = this.onNonContentChange.bind(this);
		this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
		this.handleClose = this.handleClose.bind(this);

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
	    this.setState({ modalOpen: true });
	  	this.props.updateArticle(this.state).then( () => {
					
					this.props.addFlashMessage({ type: 'success', text: 'The article was successfully created'});
			}, 
				(err) => {
						this.props.addFlashMessage({
							type: 'error',
							text: 'Der opstod en fejl,sørg for at du ikke forlader feltet Titel og indholds feltet tomt'
						});
				});

	  }

	   handleClose(){
			this.setState({ modalOpen: false });
			this.props.deleteFlashMessage();
  		}
 


 
  render() {
   
   return (	
   		
		<div >

		<div className = "update_settings">
			<div className ="ui container segment ">
			<Checkbox label="Is Publish At Update ? " checked={this.state.is_published} onCheck={this.onCheckBoxChange} />
			 <TextField   hintText="Title of The Article" value={this.state.title}  name="title" onChange={this.onNonContentChange} />
			</div>	
		</div>

		<TinyMCEInput  value={this.state.content} tinymceConfig={TINYMCE_CONFIG} onChange={this.onChange} />

	<div className ="submitButton">
      <Modal
        trigger={<Button onClick={this.onSubmit} color='green'>Submit</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'

      >
        <Header icon='browser' content={this.props.messages.text} />
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
      </div> 
				

		</div>				
		
		);
  }
}

function mapStateToProps(state){
  return {
    authen: state.authen,
		messages: state.flashMessages
  };
}

export default connect(mapStateToProps , {updateArticle, addFlashMessage, deleteFlashMessage} )(UpdateArticle);
