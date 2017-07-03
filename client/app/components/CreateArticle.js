import React from 'react';
import TinyMCE from 'react-tinymce';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { createArticle } from '../actions/articleActions';
import Dialog from 'material-ui/Dialog';
import FlashMessage from './flash/FlashMessage';
import {addFlashMessage, deleteFlashMessage } from '../actions/flashMessages';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class CreateArticle extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      title: '',
      cover: '',
      content: '',
      author: this.props.authen.user.name,
      modalOpen: false 
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  onChange(e){
    this.setState({ [e.target.name] : e.target.value});
  }

  onSubmit(e){
     e.preventDefault();
     this.setState({ modalOpen: true });
     this.props.createArticle(this.state).then( () => {
            this.props.addFlashMessage({
                        type: 'success',
                        text: 'The article was successfully created!'
                      });
           },
           (err) => {
           		this.props.addFlashMessage({
                        type: 'error',
                        text: 'OOPS there was an error !'
                      });
           });
  }

  handleEditorChange(e){
    this.setState({ content : e.target.getContent()});
  }


  handleClose(e){
  	this.setState({ modalOpen: false });
  	this.props.deleteFlashMessage();
  }

  render() {
    const actions = [
          <FlatButton
            label="OK"
            primary={true}
            onTouchTap={this.handleClose}
          />,
        ];

    return (
      <div>   

      <h1 className="ui header"> Skriv en Ny artikel</h1>
      <h2 className ="ui header"> Written By : {this.props.authen.user.name } </h2>

      <div className = "update_settings">
			<div className ="ui container segment ">
			 <TextField hintText="Title of The Article"  name="title" onChange={this.onChange} />
			 <TextField hintText="Url of the cover image "  name="cover" onChange={this.onChange} />				
			</div>	
	 </div>


     <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'wordcount fullscreen visualblocks template preview emoticons link image code nonbreaking textcolor colorpicker insertdatetime media pagebreak',
          toolbar: 'fontselect fullscreen fontsizeselect visualblocks template preview undo redo | bold italic | alignleft aligncenter alignright | pagebreak code link image forecolor backcolor emoticons insertdatetime media',
          nonbreaking_force_tab: true, table_grid: false, height: 1500, image_advtab: true
        }}
        

        onChange={this.handleEditorChange.bind(this)}
      />
     
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

// connecting to redux  
export default connect(mapStateToProps, {createArticle, addFlashMessage, deleteFlashMessage} )(CreateArticle);


