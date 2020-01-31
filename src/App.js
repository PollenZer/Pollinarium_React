import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Contact from './Navigation/Contact/Page.js'
import Datas from './Navigation/Datas/Page.js'
import Home from './Navigation/Home/Page.js'
import Users from './Navigation/Users/Page.js'
import FourOFour from './Navigation/FourOFour/Page.js'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/ColorLens';
import yellow from '@material-ui/core/colors/yellow';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './Fonts/font.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: localStorage.getItem("color") || yellow[500],
      // main: yellow[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const style={
  itemMenuList:{
    width:"100%",
    height:"7vh",
    textDecoration:"none",
    // fontFamily:"Roboto",
    color:"black",
    verticalAlign:'middle',
    lineHeight:"7vh",
    textAlign:"center",
    fontFamily:"RobotoR",
  },
  backgroundLinear:{
    background: "linear-gradient(to left, red, blue)",
  },
  closeDrawerButton:{
    margin:'9px'
  },
  titreDeLaPage:{
    margin:'auto auto',
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
      <ThemeProvider theme={theme}>
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
              <IconButton
                onClick={this.toggleDrawer(false)}
                edge="start" 
                color="inherit" 
                style={style.closeDrawerButton}
                aria-label="menu"
                >
                <CloseIcon />
              </IconButton>
              <Divider />
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
        
            <AppBar position="static" color="primary">
              <Toolbar>
                  <IconButton
                    onClick={this.toggleDrawer(true)}
                    edge="start" 
                    color="inherit" 
                    aria-label="menu"
                    >
                    <MenuIcon/>
                </IconButton>
                <Typography 
                  variant="h6" 
                  style={style.titreDeLaPage}
                  >
                  Pollinarium
                </Typography>
                <IconButton
                  onClick={this.toggleDrawer(true)}
                  edge="end" 
                  color="inherit" 
                  aria-label="menu"
                  >
                  <SettingsIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route path="/contact" component={Contact} />
              <Route path="/datas" component={Datas} />
              <Route path="/users" component={Users} />
              <Route path="/home" component={Home} />
              <Route path="/" component={Home} />
              <Route path="*" component={FourOFour} />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
