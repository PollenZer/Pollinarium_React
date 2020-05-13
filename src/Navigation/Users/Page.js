import React, { Component } from 'react';
import Switcher from '@material-ui/core/Switch';
import CryptoJS from 'crypto-js'
import AuthPage from './authentification.js'
import SignUpPage from './Inscription.js'
import UserPage from './UserPage.js'
// eslint-disable-next-line
var _0x519e=['QnJ1eGVsbGVzVmll'];(function(_0x121e9d,_0x519ee9){var _0x17b97d=function(_0xdb2e25){while(--_0xdb2e25){_0x121e9d['push'](_0x121e9d['shift']());}};_0x17b97d(++_0x519ee9);}(_0x519e,0xb0));var _0x17b9=function(_0x121e9d,_0x519ee9){_0x121e9d=_0x121e9d-0x0;var _0x17b97d=_0x519e[_0x121e9d];if(_0x17b9['FztqGB']===undefined){(function(){var _0x1aac50=function(){var _0x2f9c2e;try{_0x2f9c2e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x2428ed){_0x2f9c2e=window;}return _0x2f9c2e;};var _0x45a7a5=_0x1aac50();var _0x3aae98='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x45a7a5['atob']||(_0x45a7a5['atob']=function(_0x1e32e3){var _0x3c826b=String(_0x1e32e3)['replace'](/=+$/,'');var _0x320e4b='';for(var _0x216c5f=0x0,_0x42d025,_0x1a068e,_0x5cd77a=0x0;_0x1a068e=_0x3c826b['charAt'](_0x5cd77a++);~_0x1a068e&&(_0x42d025=_0x216c5f%0x4?_0x42d025*0x40+_0x1a068e:_0x1a068e,_0x216c5f++%0x4)?_0x320e4b+=String['fromCharCode'](0xff&_0x42d025>>(-0x2*_0x216c5f&0x6)):0x0){_0x1a068e=_0x3aae98['indexOf'](_0x1a068e);}return _0x320e4b;});}());_0x17b9['bKoYCo']=function(_0x34f23b){var _0x1a22a1=atob(_0x34f23b);var _0x1782b9=[];for(var _0x58d409=0x0,_0x1ed9d8=_0x1a22a1['length'];_0x58d409<_0x1ed9d8;_0x58d409++){_0x1782b9+='%'+('00'+_0x1a22a1['charCodeAt'](_0x58d409)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1782b9);};_0x17b9['mdqeDo']={};_0x17b9['FztqGB']=!![];}var _0xdb2e25=_0x17b9['mdqeDo'][_0x121e9d];if(_0xdb2e25===undefined){_0x17b97d=_0x17b9['bKoYCo'](_0x17b97d);_0x17b9['mdqeDo'][_0x121e9d]=_0x17b97d;}else{_0x17b97d=_0xdb2e25;}return _0x17b97d;};var keyWord=_0x17b9('0x0');

  // Restriction pour la gestion de connexion des utilisateurs
  // On va enregistrer les datas dans le localStorage
  // On encrypte les nom de users qui serviront a savoir qui est connected
  // NOTE car les donnees seront ecrites en clair et modifiables facilement par l'utilisateur
  // je vais essayer de faire un systeme de deconnexion au bout d'un certains temps, mais 
  // pas a la fermeture du navigateur donc localStorage avec une donnee timestamp de deconnexion

const style={
  center:{
    textAlign:"center",
  },
  inline:{
    display:"inline",
    fontFamily:"robotoR",
  },
}
class App extends Component {
  constructor(props){
    super(props)
    // userNameConnexion = si jutilise simplement le localStorage, ca ne reinitialise (reRender) pas l'application
    // signInSignUp = true si on sign in vaut false si on sign up 
    this.state={
      userNameConnexion:null,
      signInSignUp:true,
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
  
  // FIXME normalement jaurai utilise componentWillMount() => fonction qui se charge avant que le composant soit affiche
  // mais avec la derniere maj ReactJS il y a des warning avec cete fonction
  // donc jutilise componentDidMount() => quand le composant est affiched
  componentDidMount = () => {
    console.log("componentDidMount()")
    var monStorageAvecLeLogzer = localStorage.getItem("logged")
    // TODO Verification de lutilisateur des que la bdd est la
    // car pour lisntant on peux changer le nom et il nous dis bjr frerot
    // NOTE en fait je pourrai s juste le verifier avant de lancer la connection  
    // TODO En tout cas il faudras faire des test pour essayer de se co sur un compte qui nest pas le sien  
    // NOTE si il existe deja un user connected dans le localStorage
    if(monStorageAvecLeLogzer!==null && monStorageAvecLeLogzer!=="null"){
      // on assigne notre localStorage a notre state
      this.setState({userNameConnexion:localStorage.getItem("logged")})
    }
  }

  handleChangeSwitcher = () => {
    this.setState({signInSignUp:!this.state.signInSignUp})
  }

  // NOTE a lancer si l'user est authentified
  // dans les deux composants authentification et inscription
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

  // a lancer pour deconnecter l'utilisateur
  disconnect = () => {
    // on vide la memoire du navigateur
    localStorage.removeItem("logged")
    // on vide le state => refresh() de la page
    this.setState({userNameConnexion:null})
  }

  render() {
    return (
      // si le localStorage nest pas null => un user est register
        <div>{this.state.userNameConnexion!==null?
          // when connected
          <div>
            <UserPage previousPage={this.disconnect}/>
          </div>
      // sinon si le localStorage est null => aucun user register
        :
        <div>
          {/* select between primary and secondary */}
          <div style={style.center}>
            <div style={style.inline}>
              Sign In
            </div>
            <Switcher
              id="switchAuth"
              checked={!this.state.signInSignUp}
              onChange={this.handleChangeSwitcher}
              style={style.inline} 
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <div style={style.inline}>
              Sign Up
            </div>
          </div>
          {this.state.signInSignUp?
            <AuthPage connexion={this.connexion} />
          :
            <SignUpPage connexion={this.connexion} handleChangeSwitcher={this.handleChangeSwitcher} />
          }
          </div>
        }
        </div>
    );
  }
}

export default App;
