import React from 'react';
import TinyMCE from 'react-tinymce';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // react prop types are depecrated
import { createArticle } from '../actions/articleActions';

class CreateArticle extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      title: '',
      cover: '',
      content: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  onChange(e){
    this.setState({ [e.target.name] : e.target.value});
  }

  onSubmit(e){
     e.preventDefault();
     this.props.createArticle(this.state);
  }

  handleEditorChange(e){
    this.setState({ content : e.target.getContent()});
  }

  render() {
    return (
      <div>
      <h1> Creating an article </h1>
      <TextField 
            hintText="Title of The Article"  name="title" onChange={this.onChange}
       />

       <TextField 
            hintText="Url of the cover image "  name="cover" onChange={this.onChange}
       />

     <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'wordcount visualblocks template preview emoticons link image code nonbreaking textcolor colorpicker insertdatetime media pagebreak',
          toolbar: 'fontselect fontsizeselect visualblocks template preview undo redo | bold italic | alignleft aligncenter alignright | pagebreak code link image forecolor backcolor emoticons insertdatetime media',
          nonbreaking_force_tab: true, table_grid: false, height: 480
        }}
        

        onChange={this.handleEditorChange.bind(this)}
      />
        
          <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this.onSubmit}
        />     
      </div>
    );
  }
}

CreateArticle.propTypes = {
        createArticle: PropTypes.func.isRequired 
}

// connecting to redux  
export default connect(null, {createArticle} )(CreateArticle);


