import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';


class ReadArticle extends React.Component {
	
constructor(props) {
		super(props);

		this.state = {
			article: {},
			isLoading: true
		};
	}

componentWillMount() {	
	var id = this.props.match.params.id;
	axios.get('http://localhost:3000/articles/post/' + id).then(res => {
		this.setState({article: res.data.article, isLoading: false})
			});
}


	render() { 	

		return (	
		<div >
			<div className = "ui raised very padded container segment">
			 {this.state.isLoading ? <CircularProgress size={80} thickness={5} /> : 
					<div>
						 <h1 className="ui header">{this.state.article.title}</h1>

						<div className = "innerArticle_image"> 
							<img src={this.state.article.cover} />
						</div>
							<div dangerouslySetInnerHTML={{ __html: this.state.article.content }}></div>
					</div>
				}	
					
			</div>				
		</div>
		);
	}
}



export default connect(null)(ReadArticle);
