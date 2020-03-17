import React, { Component } from 'react';
import CryptoJS from 'crypto-js'
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { url as urlDuServ } from "../../urlServ"

// eslint-disable-next-line
var _0x519e=['QnJ1eGVsbGVzVmll'];(function(_0x121e9d,_0x519ee9){var _0x17b97d=function(_0xdb2e25){while(--_0xdb2e25){_0x121e9d['push'](_0x121e9d['shift']());}};_0x17b97d(++_0x519ee9);}(_0x519e,0xb0));var _0x17b9=function(_0x121e9d,_0x519ee9){_0x121e9d=_0x121e9d-0x0;var _0x17b97d=_0x519e[_0x121e9d];if(_0x17b9['FztqGB']===undefined){(function(){var _0x1aac50=function(){var _0x2f9c2e;try{_0x2f9c2e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x2428ed){_0x2f9c2e=window;}return _0x2f9c2e;};var _0x45a7a5=_0x1aac50();var _0x3aae98='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x45a7a5['atob']||(_0x45a7a5['atob']=function(_0x1e32e3){var _0x3c826b=String(_0x1e32e3)['replace'](/=+$/,'');var _0x320e4b='';for(var _0x216c5f=0x0,_0x42d025,_0x1a068e,_0x5cd77a=0x0;_0x1a068e=_0x3c826b['charAt'](_0x5cd77a++);~_0x1a068e&&(_0x42d025=_0x216c5f%0x4?_0x42d025*0x40+_0x1a068e:_0x1a068e,_0x216c5f++%0x4)?_0x320e4b+=String['fromCharCode'](0xff&_0x42d025>>(-0x2*_0x216c5f&0x6)):0x0){_0x1a068e=_0x3aae98['indexOf'](_0x1a068e);}return _0x320e4b;});}());_0x17b9['bKoYCo']=function(_0x34f23b){var _0x1a22a1=atob(_0x34f23b);var _0x1782b9=[];for(var _0x58d409=0x0,_0x1ed9d8=_0x1a22a1['length'];_0x58d409<_0x1ed9d8;_0x58d409++){_0x1782b9+='%'+('00'+_0x1a22a1['charCodeAt'](_0x58d409)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1782b9);};_0x17b9['mdqeDo']={};_0x17b9['FztqGB']=!![];}var _0xdb2e25=_0x17b9['mdqeDo'][_0x121e9d];if(_0xdb2e25===undefined){_0x17b97d=_0x17b9['bKoYCo'](_0x17b97d);_0x17b9['mdqeDo'][_0x121e9d]=_0x17b97d;}else{_0x17b97d=_0xdb2e25;}return _0x17b97d;};var keyWord=_0x17b9('0x0');

// Restriction pour la gestion de connexion des utilisateurs
  // On va enregistrer les datas dans le localStorage
  // On encrypte les nom de users qui serviront a savoir qui est connected
  // NOTE car les donnees seront ecrites en clair et modifiables facilement par l'utilisateur
  // je vais essayer de faire un systeme de deconnexion au bout d'un certains temps, mais 
  // pas a la fermeture du navigateur donc localStorage avec une donnee timestamp de deconnexion

// constante CSS
const style={
  formConnection:{
    display:"flex",
    flexDirection:"column",
    padding:"5vh 10vw",
  },
  pageTitle:{
    textAlign:"center",
    fontFamily:"Cookie",
  },
  submit:{
    margin:"1em 10vw",
  },
  paper:{
    margin:"5vh 10vw",
  },
}

var timeOutDeLaSnackBar

class App extends Component {
  constructor(props){
    super(props)
    // userNameConnexion = si jutilise simplement le localStorage, ca ne reinitialise (reRender) pas l'application
    // passWordConnexion = mot de passe entred par luser
    // disableSubmit = handle the submit button
    // openSnack = open la snackBar dalerte
    this.state={
      userNameConnexion:"",
      passWordConnexion:"",
      disableSubmit:true,
      openSnack:false,
    }
  }
  

  caEncodeDurIci = (motAEncoder) => {
    // format : U2FsdGVkX1/FHWMKcQy4uSbzgvyTKudK grace au toString
    // eslint-disable-next-line
    var _0x5b5d=['toString','encrypt'];(function(_0x42b113,_0x51e395){var _0x30b786=function(_0xa327ec){while(--_0xa327ec){_0x42b113['push'](_0x42b113['shift']());}};_0x30b786(++_0x51e395);}(_0x5b5d,0xb2));var _0x5425=function(_0x42b113,_0x51e395){_0x42b113=_0x42b113-0x0;var _0x30b786=_0x5b5d[_0x42b113];return _0x30b786;};return CryptoJS['DES'][_0x5425('0x1')](motAEncoder,keyWord)[_0x5425('0x0')]();
  }

  caDesEncodeDurIci = (motEncoder) => {
    // eslint-disable-next-line
    var _0xdab6=['enc','decrypt','stringify'];(function(_0xd87d61,_0x45bc49){var _0x5bf7a9=function(_0x20fd14){while(--_0x20fd14){_0xd87d61['push'](_0xd87d61['shift']());}};_0x5bf7a9(++_0x45bc49);}(_0xdab6,0xd1));var _0x2d59=function(_0xd87d61,_0x45bc49){_0xd87d61=_0xd87d61-0x0;var _0x5bf7a9=_0xdab6[_0xd87d61];return _0x5bf7a9;};return CryptoJS[_0x2d59('0x1')]['Utf8'][_0x2d59('0x0')](CryptoJS['DES'][_0x2d59('0x2')](motEncoder,keyWord));
  }

  // NOTE a lancer si l'user est authentified
  connexion = () => {
    // la on get le champ username
    var contenuDeLInputUsername = document.getElementById("userName")
    // on crypte le nom de lutilisateur
    var userCrypted = this.caEncodeDurIci(contenuDeLInputUsername.value)
    // on linsere dans la memoire du navigateur
    localStorage.setItem("logged",userCrypted)
    // on la met dans notre state pour que la page reagisse en fonction
    this.setState({userNameConnexion:userCrypted},() => {
      // on print pour etre sur davoir un mot bien encoded
      console.log(this.state.userNameConnexion)
    })
  }

  testConnexion = () => {
    var URL = urlDuServ
    URL += "users?user="+this.caDesEncodeDurIci(this.state.userNameConnexion) 
    URL += "&pass="+ this.caDesEncodeDurIci(this.state.passWordConnexion)
    // console.log(URL) // => http://localhost:8000/users?user={userName}&pass={passWord}
    fetch(URL, {
      method: 'GET',
    })
      // GET les values de la reponse 
      .then(response => response.json())
      // ICI on a les donnes retounee par le serveur
      .then(data=>{
        // console.log(data.connexion)
        // NOTE lapi retourne true a connexion si lutilisateur est authentified
        if(data.connexion){
          // si on se connecte avant la fin de laffichage on dois eteindre la snackbar nous meme
          // pour eviter une erreur de type : "Can't perform a React state update on an unmounted component"
          // pour cela on doit stopper le timeout en cours dexecution
          clearTimeout(timeOutDeLaSnackBar)
          // on utilise la fonction passer en props
          this.props.connexion()
        }else{
          // warning derreur de connexion
          this.setState({openSnack:true})
          // warning quon ferme 5s plus tard
          timeOutDeLaSnackBar = setTimeout(() => {this.setState({openSnack:false})}, 5000);
          // on vide linput password
          document.getElementById("passWord").value=""
          // disable le button submit
          this.checkEmptyFields()
        }
      })
  }

  handleUserName = e => {
    var userName = this.caEncodeDurIci(e.target.value)
    this.setState({userNameConnexion:userName})
    this.checkEmptyFields()
  }

  handlePassWord = e => {
    var passWord = this.caEncodeDurIci(e.target.value)
    this.setState({passWordConnexion:passWord})
    this.checkEmptyFields()
  }

  checkEmptyFields = () => {
    if(document.getElementById("userName").value!=="" && document.getElementById("passWord").value!==""){
      this.setState({disableSubmit:false})
      return 0
    }
    this.setState({disableSubmit:true})
  }

  render() {
    return (
        <Paper 
          elevation={5} 
          style={style.paper}
          >
          {/* NOTE ici je fait que la connection pas encore linscription */}
          <Typography 
            style={style.pageTitle}
            variant="h2"
            >
            Log in : 
          </Typography>
          <form style={style.formConnection} noValidate autoComplete="off">
            <TextField 
              id="userName" 
              color="secondary"
              label="User Name" 
              variant="outlined" 
              onChange={e=>this.handleUserName(e)}
              />
            <TextField 
              id="passWord" 
              type="password"
              color="secondary"
              label="Pass Word" 
              onChange={e=>this.handlePassWord(e)}
              variant="outlined" 
              margin="normal"
              />
            <Button
            // TODO ici il faudra rediriger vers la fonction de verification dauthentification
            // qui elle meme redirigera vers  this.connection
              // onClick={this.connection}
              onClick={this.testConnexion}
              style={style.submit}
              variant="contained" 
              color="secondary"
              disabled={this.state.disableSubmit}
              >
              Submit
            </Button>
            <Snackbar open={this.state.openSnack} onClick={()=>{this.setState({openSnack:false})}} autoHideDuration={3000}>
              <MuiAlert elevation={6} variant="filled" severity="error">
                Connexion failed, refill your inputs 🤔
              </MuiAlert>
            </Snackbar>
          </form>
        </Paper>
    );
  }
}

export default App;
