import React, { Component } from 'react';
import Switcher from '@material-ui/core/Switch';
import CryptoJS from 'crypto-js'
import AuthPage from './authentification.js'
import SignUpPage from './Inscription.js'
// eslint-disable-next-line
const _0x1339=['BruxellesVie'];(function(_0x4f5b1a,_0x341937){const _0x4f0a2c=function(_0x36fcf7){while(--_0x36fcf7){_0x4f5b1a['push'](_0x4f5b1a['shift']());}};_0x4f0a2c(++_0x341937);}(_0x1339,0xfb));const _0x1f35=function(_0x4f5b1a,_0x341937){_0x4f5b1a=_0x4f5b1a-0x0;let _0x4f0a2c=_0x1339[_0x4f5b1a];return _0x4f0a2c;};const keyWord=_0x1f35('0x0');

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
      userNameConnexion:"",
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
  // donc jutilise componentDiMount() => quand le composant est affiched
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
    localStorage.clear("logged")
    // on vide le state => refresh() de la page
    this.setState({userNameConnexion:null})
  }

  render() {
    return (
        <div>{localStorage.getItem("logged")!==null?
          // when connected
          <div>
            <div>Welcome back {this.caDesEncodeDurIci(localStorage.getItem("logged"))}</div>
            <div>How are you today</div>
            <button onClick={this.disconnect} >disconnect</button>
            <div>Ue pour linstant cest un peu lej</div>
          </div>
        :
        <div>
          {/* select between primary and secondary */}
          <div style={style.center}>
            <div style={style.inline}>
              Sign In
            </div>
            <Switcher
              id="switchAuth"
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
            <SignUpPage connexion={this.connexion} />
          }
          </div>
        }
        </div>
    );
  }
}

export default App;
