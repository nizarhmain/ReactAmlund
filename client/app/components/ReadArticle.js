import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';



class ReadArticle extends React.Component {
  
constructor(props) {
    super(props);

    this.state = {
      article: {}
    };
  }

componentDidMount() {	
	var id = this.props.match.params.id;
	axios.get('http://localhost:3000/articles/post/' + id).then(res => {
		this.setState({article: res.data.article})
      });
}


  render() { 	

    return (	
    <div>
      <div className = "ui raised very padded container segment">
      	
          <h1 className="ui header">{this.state.article.title}</h1>

      <div className = "innerArticle_image"> 
      	<img src={this.state.article.cover} />
      </div>
      	<div dangerouslySetInnerHTML={{ __html: this.state.article.content }}></div>
      </div>				
		</div>
    );
  }
}



export default connect(null)(ReadArticle);
