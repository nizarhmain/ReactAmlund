import React from 'react';
import TinyMCE from 'react-tinymce';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { createArticle } from '../actions/articleActions';
import Dialog from 'material-ui/Dialog';

class CreateArticle extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      title: '',
      cover: '',
      content: '',
      author: this.props.authen.user.name,
      open: false,
      open2: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.handleOpen2 = this.handleOpen2.bind(this);
  }


  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };

 handleOpen2(){
    this.setState({open2: true});
  };

  handleClose2(){
    this.setState({open2: false});
  };

  onChange(e){
    this.setState({ [e.target.name] : e.target.value});
  }

  onSubmit(e){
     e.preventDefault();
     this.props.createArticle(this.state).then( () => {
            this.handleOpen2();
           },
           (err) => {
            this.handleOpen();
           });
  }

  handleEditorChange(e){
    this.setState({ content : e.target.getContent()});
  }

  render() {
    const actions = [
          <FlatButton
            label="OK"
            primary={true}
            onTouchTap={this.handleClose}
          />,
        ];

    const actions2 = [
          <FlatButton
            label="OK"
            primary={true}
            onTouchTap={this.handleClose2}
          />,
        ];


    return (
      <div>
      <h1 className="ui header"> Skriv en Ny artikel</h1>
      <p> {this.props.authen.user.name }</p>
      <TextField 
            hintText="Title of The Article"  name="title" onChange={this.onChange}
       />

       <TextField 
            hintText="Url of the cover image "  name="cover" onChange={this.onChange}
       />

     <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'wordcount fullscreen visualblocks template preview emoticons link image code nonbreaking textcolor colorpicker insertdatetime media pagebreak',
          toolbar: 'fontselect fullscreen fontsizeselect visualblocks template preview undo redo | bold italic | alignleft aligncenter alignright | pagebreak code link image forecolor backcolor emoticons insertdatetime media',
          nonbreaking_force_tab: true, table_grid: false, height: 1500, image_advtab: true
        }}
        

        onChange={this.handleEditorChange.bind(this)}
      />
        
        <Dialog
          title="OOPS, there was an Error Creating the Article"
          titleStyle={{color: 'red'}}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        </Dialog>

        <Dialog
          title="Article Successfully Created"
          titleStyle={{color: 'green'}}
          actions={actions2}
          modal={true}
          open={this.state.open2}
        >
        </Dialog>

          <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this.onSubmit}
        />     
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    authen: state.authen,
  };
}

// connecting to redux  
export default connect(mapStateToProps, {createArticle} )(CreateArticle);


