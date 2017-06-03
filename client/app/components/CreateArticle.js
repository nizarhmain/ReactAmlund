import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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

  render() {
    return (
      <div>
      <TextField 
            hintText="Title of The Article" fullWidth={true} name="title" onChange={this.onChange}
       />
         <TextField 
            hintText="Content" fullWidth={true} name="content" onChange={this.onChange}
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


