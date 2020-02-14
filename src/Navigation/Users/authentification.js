import React, { Component } from 'react';
import CryptoJS from 'crypto-js'
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
// eslint-disable-next-line
const _0x1339=['BruxellesVie'];(function(_0x4f5b1a,_0x341937){const _0x4f0a2c=function(_0x36fcf7){while(--_0x36fcf7){_0x4f5b1a['push'](_0x4f5b1a['shift']());}};_0x4f0a2c(++_0x341937);}(_0x1339,0xfb));const _0x1f35=function(_0x4f5b1a,_0x341937){_0x4f5b1a=_0x4f5b1a-0x0;let _0x4f0a2c=_0x1339[_0x4f5b1a];return _0x4f0a2c;};const keyWord=_0x1f35('0x0');
// pour tester hors du local faut changer l'url
const urlDuServ = "http://localhost:8000/"

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
    URL += "users/"
    URL += this.caDesEncodeDurIci(this.state.userNameConnexion) 
    URL += "/"
    URL += this.caDesEncodeDurIci(this.state.passWordConnexion)
    // console.log(URL) // => http://localhost:8000/users/{userName}/{passWord}
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
