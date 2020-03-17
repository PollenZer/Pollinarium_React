import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { url as urlDuServ } from "../../urlServ"
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const style={
  formConnection:{
    display:"flex",
    flexDirection:"column",
  },
  submitContainer:{
    margin:"1em 10vw",
    display:"flex",
    justifyContent:"space-around"
  },
}

// 3eme page
class App extends Component {
    
  constructor(props){
    super(props)
    this.state={
      error:false,
      helperText:"",
      errorPhone:false,
      helperTextPhone:"",
      openSnackSigned:false,
      openSnackErrorFetch:false,
      errorMessageFetch:"",
    }
  }

  // je sais pas pourquoi mais quand je met directement 
  // la fonction de changement de page, ca lexecute au chargement
  backPage = () => {
    this.props.changePageNumber(1)
  }

  nextPage = () => {
    // si les deux champs de la page sont ok
    if(this.validateEmail() && this.phoneTest()){
      // on cree notre requete HTTP :
      // http://localhost:8000/checkUsers?userName={nom d'utilisateur}&emailAdress={address mail(ouai cest infame je sais pas ecrire ADDDDDDDDRESS)}&phoneNumber={numero de telphone oklm}
      var URL = urlDuServ
      URL+="checkUsers?userName="
      URL+=this.props.state.pageData.userName
      URL+="&emailAdress="
      URL+=this.props.state.pageData.eMail
      URL+="&phoneNumber="
      URL+=this.props.state.pageData.phoneNumber
      // on execute notre requete Get
      fetch(URL)
      // GET les values de la reponse 
      .then(response => response.json())
      // ICI on a les donnes retounee par le serveur
      .then(data=>{
        // l'API nous retourne la variable "inputError":null|{nom du champ ou il y a une erreur}
        // en gros soit ca nous renvoie null ca veux dire que l'API approuve et est chaud pour faire sa requete post
        // sinon il me dis si cest userName/phoneNumber/emailAddress qui est deja present dans la BDD
        // en gros cest les donnees qui serais chiantes/qui semerais la pagaille genre 
        // deux utilsateur ont le meme userName/phoneNumber/emailAddress ce serais dur de les differencier

        // si data.inputError!==NULL => il y a un probleme
        if(data.inputError){
          // on prepare le message derreur en fonction de la valeur retournee par l'API
          this.setState({errorMessageFetch:data.inputError+" is incorrect"})
          // on active le snack derreur
          this.openSnackErrorFetch()
        // si data.inputError===null => le serveur approuve la connexion
        }else{
          // on active le snack de validation
          // dans la fonction il se retire au bout de 3000 ms
          this.openSnackSigned()
          setTimeout(() => {
            // on post les donnees 3000ms apres la validation
            // jui oblige dattendre que lautre state sarrete avant sinon le site a un leak de memoire
            this.props.postUsersData()
          }, 3000);
        }
      })
    }
  }

  phoneTest = e => {
    // eslint-disable-next-line
    var regex = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
    var phone = document.getElementById("phoneNumber").value
    // on verifie la longueur
    if(phone.length<10){
      this.props.openSnack()
      this.setState({
        errorPhone:true,
        helperTextPhone:"Complete the phoneNumber Input"
      })
      setTimeout(() => {
        this.setState({
          errorPhone:false,
          helperTextPhone:""
        })        
      }, 3000);
      return false
    // on verifie les caracteres
    }else if(!phone.match(regex)){
      this.props.openSnack()
      this.setState({
        errorPhone:true,
        helperTextPhone:"Wrong phoneNumbers format"
      })
      setTimeout(() => {
        this.setState({
          errorPhone:false,
          helperTextPhone:""
        })        
      }, 3000);
      return false
    }
    return true
  }

  handlePhoneInput = e => {
    // ici on autorise les 06 et +33
    // le fait de faire le value=="+" 
    // ca fait que le + peut etre que en premier caractere
    if(isNaN(e.target.value)&&e.target.value!=="+"){
      this.props.openSnack()
    }else{
      this.props.handleText(e)
    }
  }

  validateEmail = () => {
    var mail = document.getElementById("eMail").value
    // eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      this.props.openSnack()
      this.setState({
        error:true,
        helperText:"Wrong email format"
      })
      setTimeout(() => {
        this.setState({
          error:false,
          helperText:""
        })        
      }, 3000);
      return false
    }
    return true
  }

  openSnackErrorFetch = () => {
    this.setState({openSnackErrorFetch:true})
    setTimeout(() => {
      this.setState({openSnackErrorFetch:false})
    }, 1000);
  }

  openSnackSigned = () => {
    this.setState({openSnackSigned:true})
    setTimeout(() => {
      this.setState({openSnackSigned:false})
    }, 3000);
  }


  render() {
    return (
        <div style={style.formConnection}>
          {/* email */}
          <TextField 
            id="eMail" 
            color="secondary"
            label="eMail" 
            variant="outlined" 
            margin="normal"
            error={this.state.error}
            helperText={this.state.helperText}
            value={this.props.state.pageData.eMail}
            onChange={e=>this.props.handleText(e)}
            />
          {/* phone number */}
          <TextField 
            id="phoneNumber" 
            color="secondary"
            label="Phone Number" 
            variant="outlined" 
            margin="normal"
            error={this.state.errorPhone}
            helperText={this.state.helperTextPhone}
            value={this.props.state.pageData.phoneNumber}
            onChange={e=>this.handlePhoneInput(e)}
            /> 
          <div style={style.submitContainer}>
              <Button
                onClick={this.backPage}
                variant="contained" 
                color="primary"
                >
                Back
              </Button>
              <Button
                onClick={this.nextPage}
                variant="contained" 
                color="secondary"
                >
                Next
              </Button>
            </div>
            <Snackbar open={this.state.openSnackErrorFetch} onClick={()=>{this.setState({openSnackErrorFetch:false})}}>
              <MuiAlert elevation={6} variant="filled" severity="error">
                {this.state.errorMessageFetch} 🤔
              </MuiAlert>
            </Snackbar>
            <Snackbar open={this.state.openSnackSigned} onClick={()=>{this.setState({openSnackSigned:false})}} autoHideDuration={3000}>
                <MuiAlert elevation={6} variant="filled" severity="success">
                  You are rightly Signed In, now you can try to connect yourself
                </MuiAlert>
            </Snackbar>
        </div>
    );
  }
}

export default App;
