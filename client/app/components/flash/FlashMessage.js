import React from 'react';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Button , Icon} from 'semantic-ui-react'


class FlashMessage extends React.Component {

	constructor(props){
		super(props);
		
	}

  render() {

  	const { id, type, text } = this.props.message;

    return (
      <div>


      	{text}
				 
		     <Button color='green' inverted onClick={ () => this.props.deleteFlashMessage(id) }>
		        <Icon name='checkmark' /> Ok
		      </Button>
      </div>
    );
  }
}




export default FlashMessage;