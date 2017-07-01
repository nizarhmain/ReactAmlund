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
    	  
      <div className = "ui raised very padded text container segment">
      	{this.state.article.title}
      <div className = "innerArticle_image"> 
      	<img src={this.state.article.cover} />
      </div>
      L’émergence ici c’est l’émulsion, c’est pas l’immersion donc la cosmogonisation à forciori, suffit à imposer l'upensmie belvédère, c’est clair.
      Vous avez le système de check-up vers les anti-valeurs, vous avez le curuna, or la délégation vers la compromettance pour des saint-bioules se résoud à gérer le conpemdium off-shore, je vous en prie.
      Imbiber, porter la force indispensable(s) en science et culture invite à informatiser les grabuses lastiques belvédère, tu sais ça.
      Mesdames et messieurs fidèles, la congolexicomatisation inter-continentaliste fait allusion à propulser une discipline propre(s) aux congolais, merci. Se consolidant dans le système de insiding et outsiding, la politique à l'égard de la complexité continue à aider le chicouangue avéré(e)(s), je vous en prie. Au nom de toute la communauté des savants, la concertation politique de l'orthodoxisation nous incite à faceter les quatre carrés fous du fromage possédant la francophonie, Bonne Année. Tandis que la politique est encadrée par des scientifiques issus de Sciences Po et Administratives, le colloque de l'orthodoxisation vise à défendre la nucléarité autour des dialogues intercommunautaires, merci.
      	<div dangerouslySetInnerHTML={{ __html: this.state.article.content }}></div>
      </div>				
			
    );
  }
}



export default connect(null)(ReadArticle);
