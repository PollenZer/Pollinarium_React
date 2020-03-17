import React, { Component } from 'react';
import { 
  Typography,
  Paper, 
  Snackbar
} from '@material-ui/core';
import PersonalInformation from './personalInformation.js';
import AccountInformation from './accountInformation.js';
import ContactInformation from './contactInformation.js';
import MuiAlert from '@material-ui/lab/Alert';
import Stepper from './Stepper.js';
import { url as urlDuServ } from '../../urlServ.js'
// eslint-disable-next-line
var _0x519e=['QnJ1eGVsbGVzVmll'];(function(_0x121e9d,_0x519ee9){var _0x17b97d=function(_0xdb2e25){while(--_0xdb2e25){_0x121e9d['push'](_0x121e9d['shift']());}};_0x17b97d(++_0x519ee9);}(_0x519e,0xb0));var _0x17b9=function(_0x121e9d,_0x519ee9){_0x121e9d=_0x121e9d-0x0;var _0x17b97d=_0x519e[_0x121e9d];if(_0x17b9['FztqGB']===undefined){(function(){var _0x1aac50=function(){var _0x2f9c2e;try{_0x2f9c2e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x2428ed){_0x2f9c2e=window;}return _0x2f9c2e;};var _0x45a7a5=_0x1aac50();var _0x3aae98='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x45a7a5['atob']||(_0x45a7a5['atob']=function(_0x1e32e3){var _0x3c826b=String(_0x1e32e3)['replace'](/=+$/,'');var _0x320e4b='';for(var _0x216c5f=0x0,_0x42d025,_0x1a068e,_0x5cd77a=0x0;_0x1a068e=_0x3c826b['charAt'](_0x5cd77a++);~_0x1a068e&&(_0x42d025=_0x216c5f%0x4?_0x42d025*0x40+_0x1a068e:_0x1a068e,_0x216c5f++%0x4)?_0x320e4b+=String['fromCharCode'](0xff&_0x42d025>>(-0x2*_0x216c5f&0x6)):0x0){_0x1a068e=_0x3aae98['indexOf'](_0x1a068e);}return _0x320e4b;});}());_0x17b9['bKoYCo']=function(_0x34f23b){var _0x1a22a1=atob(_0x34f23b);var _0x1782b9=[];for(var _0x58d409=0x0,_0x1ed9d8=_0x1a22a1['length'];_0x58d409<_0x1ed9d8;_0x58d409++){_0x1782b9+='%'+('00'+_0x1a22a1['charCodeAt'](_0x58d409)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1782b9);};_0x17b9['mdqeDo']={};_0x17b9['FztqGB']=!![];}var _0xdb2e25=_0x17b9['mdqeDo'][_0x121e9d];if(_0xdb2e25===undefined){_0x17b97d=_0x17b9['bKoYCo'](_0x17b97d);_0x17b9['mdqeDo'][_0x121e9d]=_0x17b97d;}else{_0x17b97d=_0xdb2e25;}return _0x17b97d;};var keyWord=_0x17b9('0x0');

// personal informations
// account informations
// contact informations

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

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      disableSubmit:true,
      pageNumber:0,
      pageData:{
        firstName:"",
        lastName:"",
        userName:"",
        passWord1:"",
        passWord2:"",
        subscribe:true,
        eMail:"",
        phoneNumber:"",
      },
      openSnack:false,
    }
  }

  handleChangeSwitcher = () => { this.props.handleChangeSwitcher() }
  
  // ici on va faire notre requete en post qui enverra toutes les donnees
  // lorsquon appuyera sur le dernier "nextPage"
  postUsersData = () => {
    // on passe directement a la page connexion la requete sera effectuee a la suite
    this.handleChangeSwitcher()
    var subscribe
    // dans la bdd on a pas de booleen mais des tiny int
    // donc je modifie mes true en 1 et false en 0
    this.state.pageData.subscribe?subscribe=1:subscribe=0
    // ici cest le corp de la data
    var userData = {
      "userName": this.state.pageData.userName,
      "firstName": this.state.pageData.firstName,
      "secondName": this.state.pageData.lastName,
      "emailAdress": this.state.pageData.eMail,
      // passWord hash dans le nodeJs
      "password": this.state.pageData.passWord1,
      "phoneNumber": this.state.pageData.phoneNumber,
      "subscribe": subscribe,
    }
    // requete en post sur notre endpoint : /users
    fetch(urlDuServ+"users",{
          method: "post",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
      })
  }

  // empty pageData state 
  resetData = () => {
    // pas grand chose a expliquer
    var state = this.state
    state.pageData = {
      firstName:"",
      lastName:"",
      userName:"",
      passWord1:"",
      passWord2:"",
      subscribe:true,
      eMail:"",
      phoneNumber:"",
    }
    this.setState(state)
  }

  // vu que cest un booleen flm de gerer en textuel 
  handleSubscribeState = () => {
    // on prend les state
    var state = this.state
    // on inverse la valeur de this.state.pageData.subscribe
    state.pageData["subscribe"] = !state.pageData["subscribe"]
    // on affecte le tout
    this.setState(state)
  }

  // e.target.id = nom du state a modifier
  // e.target.value = valeur du state a modifier
  handleText = e => {
    // NOTE ici cest technique
    // on get le state actuel
    var state = this.state
    // on recupere la value et l'id de notre element passe en parametre
    const { value, id } = e.target
    // state.pageData => on va dans la variable this.state.pageData
    // le [id] cest pour quil aille dans this.state.pageData.[id] => donc il ny aura qua mettre genre
    // id="userName" => et ca affectera directement notre state this.state.pageData.userName
    // le "= value" cest assez comprehensible 
    state.pageData[id] = value
    // on affecte notre resultat
    this.setState(state)
  }

  changePageNumber = e => {
    this.setState({pageNumber:e})
  }

  openSnack = () => {
    this.setState({openSnack:true})
    setTimeout(() => {
      this.setState({openSnack:false})
    }, 1000);
  }

  // ici on fait laffichage du pannel associe au state pageNumber
  displayComponent = () => {
    switch(this.state.pageNumber){
      case 0:
        // premier panel sur les infos perso
        return <PersonalInformation 
                    resetData={this.resetData} 
                    state={this.state} 
                    handleText={this.handleText} 
                    changePageNumber={this.changePageNumber}
                    openSnack={this.openSnack}
                    />
      case 1:
        // deuxieme panel sur les infos du compte
        return <AccountInformation 
                    state={this.state} 
                    handleText={this.handleText} 
                    changePageNumber={this.changePageNumber}
                    handleSubscribeState={this.handleSubscribeState}
                    openSnack={this.openSnack}
                    />
      case 2:
        // dernier panel sur les infos de contact
        return <ContactInformation 
                    state={this.state} 
                    handleText={this.handleText} 
                    changePageNumber={this.changePageNumber}
                    openSnack={this.openSnack}
                    handleChangeSwitcher={this.handleChangeSwitcher}
                    // on cree un trigger sur notre fonction qui sera appelee a la fin de notre formulaire
                    postUsersData={this.postUsersData}
                    />
      default :
      // bah la je sais pas mdr
        console.log("Wtf page number pas normal")
        break;
    }
  }

  render() {
    return (
        <Paper 
          elevation={5} 
          style={style.paper}
          >
          <Typography 
            style={style.pageTitle}
            variant="h2"
            >
            Create an account : 
          </Typography>
          <form style={style.formConnection} noValidate autoComplete="off">
            {/* ca cest juste le truc avec les numeros au dessus */}
            <Stepper pageNumber={this.state.pageNumber}/>
            {/* et ici on gere le component a afficher en fonction du stepperzerzer */}
            {this.displayComponent()}
          </form>
          {/* ici cest un truc pour tout nos input on aura une fonction trigger pour la declencher */}
          <Snackbar open={this.state.openSnack} onClick={()=>{this.setState({openSnack:false})}}>
            <MuiAlert elevation={6} variant="filled" severity="error">
              Wrong Input 🤔
            </MuiAlert>
          </Snackbar>
        </Paper>
    );
  }
}

export default App;
