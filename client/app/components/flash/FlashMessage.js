import React from 'react';
import PropTypes from 'prop-types';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class FlashMessage extends React.Component {

	constructor(props){
		super(props);
	}

  render() {

  	const { id, type, text } = this.props.message;

    return (
      <div>
      	{text}

		     <FloatingActionButton mini={true} onTouchTap = { () => this.props.deleteFlashMessage(id) }>
		      <ContentClear />
		    </FloatingActionButton>
      </div>
    );
  }
}


FlashMessage.propTypes = {
	message: PropTypes.object.isRequired,
	deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;