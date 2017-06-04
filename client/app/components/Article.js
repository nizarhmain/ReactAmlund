import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types'; // react prop types are depecrated


export default function Article({ article }) {

    return (
      <div className="article">
      <Card >
    <CardHeader
      title={article.title}
      subtitle={article.created}
      avatar="https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15940719_10209450529474837_3002653333101128053_n.jpg?oh=395714d17626502d8e6ea304b6589ea6&oe=59A671F3"
    />
    <CardMedia
      overlay={<CardTitle title={article.title} subtitle="Overlay subtitle" />}
    >
      <img src={article.cover} />
    </CardMedia>
    <CardText>
      this is just some dummy content
    </CardText>
    <CardActions>
      <FlatButton label="Read More" />
    </CardActions>
  </Card>
  </div>
    );
  
}

Article.propTypes = {
       article: PropTypes.object.isRequired
}

