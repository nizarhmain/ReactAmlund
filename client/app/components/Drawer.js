import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MediaQuery from 'react-responsive';
import {fullWhite} from 'material-ui/styles/colors';


const customStyle = {
 paddingTop: 15,
 paddingBottom:15,
};

export default class MyDrawer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  }
  handleClose() {
    this.setState({open: false});
  }
  render() {
    return (
      <div>
        <FlatButton
          className="menu"
          icon = {<MenuIcon color={fullWhite}/>}
          onTouchTap={this.handleToggle.bind(this)}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Menu onItemTouchTap={this.handleClose.bind(this)}>
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
            </Menu>
        </Drawer>

        <MediaQuery query='(max-device-width: 1224px)'>
        <Drawer
          docked={false}
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          
              <Menu onItemTouchTap={this.handleClose.bind(this)}  menuItemStyle={customStyle}>
                  <MenuItem>Menu Item</MenuItem>
                  <MenuItem>Menu Item 2</MenuItem>
              </Menu>
           
        </Drawer>


        </MediaQuery>

      </div>
    );
  }
}