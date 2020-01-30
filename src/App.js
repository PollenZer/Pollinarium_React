import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Contact from './Navigation/Contact/Page.js'
import Datas from './Navigation/Datas/Page.js'
import Home from './Navigation/Home/Page.js'
import Users from './Navigation/Users/Page.js'
import FourOFour from './Navigation/FourOFour/Page.js'
import Test from './test'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336

const style={
  itemMenuList:{
    width:"100%",
    height:"5vh",
    textDecoration:"none",
    fontFamily:"Roboto",
    color:"black",
  },
  backgroundLinear:{
    background: "linear-gradient(to left, red, blue)",
  },
}

class App extends Component {
  constructor(props){
    super(props)
    this.state={left:false}
  }

  toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, 'left': open });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
      <Drawer 
        open={this.state.left} 
        onClose={this.toggleDrawer(false)}
        >
          <div
          style={{width: "35vw"}}
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
          >
            <List>
              <ListItem button >
                <Link to="/home" style={style.itemMenuList} >Home</Link>
              </ListItem>
              <ListItem button >
                <Link to="/users" style={style.itemMenuList} >Users</Link>
              </ListItem>
              <ListItem button >
                <Link to="/datas" style={style.itemMenuList}>Datas</Link>
              </ListItem>
              <ListItem button >
                <Link to="/contact" style={style.itemMenuList}>Contact</Link>
              </ListItem>
            </List>
          </div>
          </Drawer>
      
          <AppBar position="static" color="secondary">
            <Toolbar>
              <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="menu"
                >
                <MenuIcon onClick={this.toggleDrawer(true)}/>
              </IconButton>
              <Typography 
                variant="h6" 
                // className={classes.title}
                >
                News
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/datas" component={Datas} />
            <Route path="/users" component={Users} />
            <Route path="/test" component={Test} />
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
            <Route path="*" component={FourOFour} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
