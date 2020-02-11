import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Contact from './Navigation/Contact/Page.js'
import Datas from './Navigation/Datas/Page.js'
import Home from './Navigation/Home/Page.js'
import Users from './Navigation/Users/Page.js'
import FourOFour from './Navigation/FourOFour/Page.js'
import Drawer from '@material-ui/core/Drawer'; //https://material-ui.com/components/drawers/
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Switcher from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ChromePicker } from 'react-color';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import MenuIcon from '@material-ui/icons/Menu';
import MuiAlert from '@material-ui/lab/Alert';
import SettingsIcon from '@material-ui/icons/ColorLens';
import materialPColor from '@material-ui/core/colors/purple';
import materialSColor from '@material-ui/core/colors/yellow';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './Fonts/font.css'

// editer les couleurs par default
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: localStorage.getItem("pColor") || materialPColor[500],
    },
    secondary: {
      main: localStorage.getItem("sColor") || materialSColor[600],
    },
  },
});

// constante CSS
const style={
  itemMenuList:{
    width:"100%",
    height:"7vh",
    textDecoration:"none",
    color:"black",
    verticalAlign:'middle',
    lineHeight:"7vh",
    textAlign:"center",
    fontFamily:"RobotoR",
  },
  backgroundLinear:{
    background: "linear-gradient(to left, red, blue)",
  },
  inline:{
    display:"inline",
    fontFamily:"RobotoR",
  },
  center:{
    textAlign:"-webkit-center",
  },
  closeDrawerButton:{
    margin:'9px',
  },
  titreDeLaPage:{
    margin:'auto auto',
  },
  whichColor:{
    margin:'0 auto',
    fontFamily:"RobotoR"
  }
}

const toggleColorList=["Select your primary color","Select your secondary color"]

class App extends Component {
  constructor(props){
    console.log('website loading')
    super(props)
    // left = bool douverture de la navbar
    // chooseColor = bool du toggleButton
    // openDialog = bool de louverture du dialog
    this.state={
      left:false,
      // https://www.youth4work.com/Talent/html5/Forum/113066-difference-between-local-storage-and-session-storage-in-html5
      // sessionStorage : expire on browser closing
      // localStorage : no expiration
      pColor: localStorage.getItem("pColor") || '#fff',
      sColor: localStorage.getItem("sColor") || '#fff', 
      openDialog:false,
      whichColor:0,
      background:"#fff",
      openSnack:false,
    }
  }


  // le minimum si je veux cacher les warning hehe
  // componentDidUpdate = () => {
    // console.clear()
  // }

  // min inclus / max exclus
  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  componentDidMount = () => {
    var defaultColor = "rgba("+this.randomNum(0,256)+","+this.randomNum(0,256)+","+this.randomNum(0,256)+","+this.randomNum(0,11)/10+")"
    this.setState({background:defaultColor})
  }

  saveColors = () => {
    if(this.state.background===undefined||this.state.background==="undefined"||this.state.background===null){
      alert("Aucune couleur n'a ete selectionnee => couleurs remises pas defaut")
      localStorage.setItem("pColor","")
      localStorage.setItem("sColor","")
    }else{
      // switchColor = true : secondary / switchColor = false : primary
      var switchColor = document.getElementById("switchColor").checked
      // secondary
      if(switchColor){
        localStorage.setItem("sColor",this.state.background)
        // primary
      }else{
        localStorage.setItem("pColor",this.state.background)
      }
      this.setState({openSnack:true})
      setTimeout(()=>{
        this.setState({openSnack:false})
      },5000)
    }
  }
  
  handleChangeComplete = color => {
    this.setState({ background: color.hex })
  }  
  // savoir si on veux changer la couleur principale ou secondaire
  handleChangeColorPicking = () => {
    var number = this.state.whichColor
    number++
    number%=2
    this.setState({whichColor:number})
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
                color="secondary"
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
          <AppBar 
            position="static" 
            color="primary"
            >
              <Toolbar>
                {/* button color maker */}
                <IconButton
                  onClick={this.handleCloseDialog}
                  edge="start" 
                  color="inherit" 
                  aria-label="menu"
                  >
                  <ArrowBack/>
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
            <div style={style.center}>
              <div style={style.inline}>
                Primary
              </div>
              <Switcher
                id="switchColor"
                onChange={this.handleChangeColorPicking}
                style={style.inline} 
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <div style={style.inline}>
                Secondary
              </div>
            </div>
              <Typography 
                style={style.whichColor} 
                >
                {toggleColorList[this.state.whichColor]}
              </Typography>
            <center>
              <ChromePicker 
                color={this.state.background}
                onChangeComplete={ this.handleChangeComplete }
              />
            </center>
          <DialogActions>
            <Button 
              style={style.whichColor}
              onClick={this.saveColors} 
              color="secondary" 
              autoFocus
              variant="contained"
              >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={this.state.openSnack} onClick={()=>{this.setState({openSnack:false})}} autoHideDuration={3000}>
          <MuiAlert elevation={6} variant="filled" severity="success">
            Press f5 to see your new color setup 🤔
          </MuiAlert>
        </Snackbar>
      </ThemeProvider>
    );
  }
}

export default App;

// TODO couple color : rgba(35,167,199,1) || #dc1fbd