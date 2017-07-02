import React from 'react';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import TinyMCEInput from 'react-tinymce-input'
import { Field, reduxForm } from 'redux-form';  // ES6

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
			value : "",
		}
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		var id = this.props.match.params.id;
		axios.get('http://localhost:3000/articles/post/' + id).then(res => {
		this.setState({value: res.data.article.content, isLoading: false})
			});

	}

	  onChange(newValue) {
	    this.setState({ value: newValue });
	  }
 


 
  render() {
   
   return (	
   		
		<div >


		<h1> </h1>			
				
		<TinyMCEInput  value={this.state.value} tinymceConfig={TINYMCE_CONFIG} onChange={this.onChange} />
			

					
		</div>				
		
		);
  }
}


function mapStateToProps(state){
	return {
		artiklen: state.artiklen,
		authen: state.authen		
	};
}

export default connect(null)(UpdateArticle);
