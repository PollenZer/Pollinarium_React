import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Contact from './Navigation/Contact/Page.js'
import Datas from './Navigation/Datas/Page.js'
import Home from './Navigation/Home/Page.js'
import Users from './Navigation/Users/Page.js'
import FourOFour from './Navigation/FourOFour/Page.js'
import Drawer from '@material-ui/core/Drawer'; //https://material-ui.com/components/drawers/
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import Switcher from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ChromePicker } from 'react-color';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/ColorLens';
import yellow from '@material-ui/core/colors/yellow';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './Fonts/font.css'

// editer les couleurs par default
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: localStorage.getItem("pColor") || yellow[500],
      // main: yellow[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: localStorage.getItem("sColor") || '#11cb5f',
    },
  },
});

// variable CSS
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

const toggleColorList=["Select your primary color","Select your secondary color"]

class App extends Component {
  constructor(props){
    super(props)
    // left = bool douverture de la navbar
    // chooseColor = bool du toggleButton
    // openDialog = bool de louverture du dialog
    this.state={
      left:false,
      pColor: localStorage.getItem("pColor") || '#fff',
      sColor: localStorage.getItem("sColor") || '#fff', 
      openDialog:false,
      toggleColor:toggleColorList[0]
    }
  }

  saveColors = () => {
    this.handleCloseDialog()
  }
  
  handleChangeComplete = color => {
    this.setState({ background: color.hex })
  }  
  // savoir si on veux changer la couleur principale ou secondaire
  handleChangeColorPicking = () => {
    var number = 0 
    number++;
    number = number%2;
    this.setState({toggleColor:toggleColorList[number]})
  }
  handleOpenDialog = () => {
    this.setState({openDialog:true})
  }
  handleCloseDialog = () => {
    this.setState({openDialog:false})
  }

  // gestion de l'ouverture de la navbar : https://material-ui.com/components/drawers/
  toggleDrawer = open => event => {
    this.setState({ ...this.state, 'left': open });
  };

  render() {
    return (
      // theme={theme} : editer les couleurs par default
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
              {/* navbar right side */}
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
              {/* header de l'app web */}
            <AppBar position="static" color="primary">
              <Toolbar>
                  {/* button toggler */}
                  <IconButton
                    onClick={this.toggleDrawer(true)}
                    edge="start" 
                    color="inherit" 
                    aria-label="menu"
                    >
                    <MenuIcon/>
                </IconButton>
                {/* titre de l'app */}
                <Typography 
                  variant="h6" 
                  style={style.titreDeLaPage}
                  >
                  Pollinarium
                </Typography>
                {/* button color maker */}
                <IconButton
                  onClick={this.handleOpenDialog}
                  edge="end" 
                  color="inherit" 
                  aria-label="menu"
                  >
                  {/* color picker */}
                  <SettingsIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Switch>
              {/* gestionnaire des routes */}
              <Route path="/contact" component={Contact} />
              <Route path="/datas" component={Datas} />
              <Route path="/users" component={Users} />
              <Route path="/home" component={Home} />
              <Route path="/" component={Home} />
              <Route path="*" component={FourOFour} />
            </Switch>
          </div>
        </BrowserRouter>

        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          fullScreen={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <AppBar position="static" color="primary">
              <Toolbar>
                {/* button color maker */}
                <IconButton
                  onClick={this.handleCloseDialog}
                  edge="start" 
                  color="inherit" 
                  aria-label="menu"
                  >
                  <CloseIcon/>
                </IconButton> 
                <Typography 
                  variant="h6" 
                  style={style.titreDeLaPage}
                  >
                  Color Editor
                </Typography>
               
              </Toolbar>
            </AppBar>
            {/* select between primary and secondary */}
            <Switcher
              onChange={this.handleChangeColorPicking}
              value="color"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            {this.state.toggleColor}
            <ChromePicker 
              color={ this.state.background }
              onChangeComplete={ this.handleChangeComplete }
            />
          <DialogActions>
            <Button 
              onClick={this.saveColors} 
              color="secondary" 
              autoFocus
              variant="contained"
              >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
}

export default App;
