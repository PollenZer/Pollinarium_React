import React, { Component } from 'react';
import CryptoJS from 'crypto-js'
import Switcher from '@material-ui/core/Switch';
import {
    TextField,
    Dialog,
    Button,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    ListItemIcon,
    Paper,
    AppBar,
    Toolbar,
    DialogActions,
    Typography,
    IconButton,
  } from '@material-ui/core'; 
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { url as urlDuServ } from "../../urlServ"
// eslint-disable-next-line
var _0x519e=['QnJ1eGVsbGVzVmll'];(function(_0x121e9d,_0x519ee9){var _0x17b97d=function(_0xdb2e25){while(--_0xdb2e25){_0x121e9d['push'](_0x121e9d['shift']());}};_0x17b97d(++_0x519ee9);}(_0x519e,0xb0));var _0x17b9=function(_0x121e9d,_0x519ee9){_0x121e9d=_0x121e9d-0x0;var _0x17b97d=_0x519e[_0x121e9d];if(_0x17b9['FztqGB']===undefined){(function(){var _0x1aac50=function(){var _0x2f9c2e;try{_0x2f9c2e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x2428ed){_0x2f9c2e=window;}return _0x2f9c2e;};var _0x45a7a5=_0x1aac50();var _0x3aae98='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x45a7a5['atob']||(_0x45a7a5['atob']=function(_0x1e32e3){var _0x3c826b=String(_0x1e32e3)['replace'](/=+$/,'');var _0x320e4b='';for(var _0x216c5f=0x0,_0x42d025,_0x1a068e,_0x5cd77a=0x0;_0x1a068e=_0x3c826b['charAt'](_0x5cd77a++);~_0x1a068e&&(_0x42d025=_0x216c5f%0x4?_0x42d025*0x40+_0x1a068e:_0x1a068e,_0x216c5f++%0x4)?_0x320e4b+=String['fromCharCode'](0xff&_0x42d025>>(-0x2*_0x216c5f&0x6)):0x0){_0x1a068e=_0x3aae98['indexOf'](_0x1a068e);}return _0x320e4b;});}());_0x17b9['bKoYCo']=function(_0x34f23b){var _0x1a22a1=atob(_0x34f23b);var _0x1782b9=[];for(var _0x58d409=0x0,_0x1ed9d8=_0x1a22a1['length'];_0x58d409<_0x1ed9d8;_0x58d409++){_0x1782b9+='%'+('00'+_0x1a22a1['charCodeAt'](_0x58d409)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1782b9);};_0x17b9['mdqeDo']={};_0x17b9['FztqGB']=!![];}var _0xdb2e25=_0x17b9['mdqeDo'][_0x121e9d];if(_0xdb2e25===undefined){_0x17b97d=_0x17b9['bKoYCo'](_0x17b97d);_0x17b9['mdqeDo'][_0x121e9d]=_0x17b97d;}else{_0x17b97d=_0xdb2e25;}return _0x17b97d;};var keyWord=_0x17b9('0x0');

const style={
    pageTitle:{
      textAlign:"center",
      fontFamily:"Cookie",
    },
    formConnection:{
      margin:"5vh 0 0 0", 
      display:"flex",
      flexDirection:"column",
    },
    paper:{
      margin:"5vh 10vw",
      padding:"1vh 0 5vh 0",
    },
    closeButton:{
    },
    inputs:{
        marginRight:"10vw",
        marginLeft:"10vw",
    },
    deleteAccount:{
        position:"absolute",
        bottom:0
    },
    disconnect:{
        position:"absolute",
        bottom:"6vh",
    }
}

// en gros ici je recupere mes relations user/pollen
// avec une array numerique
// puis une array de false qui met a true tout les pollens recence
// ensuite on gere les checkbox avec cette array
// puis on fait machine arriere
// pour pouvoir renvoyer nos infos au serv
// pour lisntant je pense je vais supprimer toutes les relation lie a lutilisateur
// pour toutes les reecrires ce sera plus simple que de check celle deja presentes
// je sais pas si ce que jecris est comprehensible
// il est 3:46 pour ma defense 
class App extends Component {

    constructor(props){
        super(props)
        this.state={
            userName:"",
            email:"",
            phoneNumber:"",
            subscribe:false,
            id:0,
            openDialog:false,
            infoPollen:[],
            error:false,
            helperText:"",
            errorPhone:false,
            helperTextPhone:"",
            // la le but cest de faire une array pour savoir si le checked est actif
            // ca ressemblerais a ca : arrayPollenToggleActive=[true, false, false, false, true, false]
            arrayPollenToggleActive:[],
            arrayNumeric:[],
            confirm:false,
            confirmInput:"",
        }
    }

    validateEmail = () => {
        var mail = document.getElementById("email").value
        // eslint-disable-next-line
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
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

    phoneTest = e => {
        // eslint-disable-next-line
        var regex = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
        var phone = document.getElementById("phoneNumber").value
        // on verifie la longueur
        if(phone.length<10){
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

    
    testConnexion = () => {
        var URL = urlDuServ
        URL += "usersInfo?user="+this.state.userName 
        fetch(URL)
        // GET les values de la reponse 
        .then(response => response.json())
        // ICI on a les donnes retounee par le serveur
        .then(data=>{
            console.log(data)
            var subscribeState
            data.subscribe===1?subscribeState=true:subscribeState=false
            this.setState({
                email:data.emailAdress, 
                phoneNumber:data.phoneNumber,
                subscribe:subscribeState,
                id:data.ID_user
            })
        })
    }

    getInfoPollen = () => {
        var URL = urlDuServ
        URL += "infoPollen" 
        fetch(URL)
        // GET les values de la reponse 
        .then(response => response.json())
        // ICI on a les donnes retounee par le serveur
        .then(data=>{
            console.log(data)
            var arrayOklm = []
            for (let i = 0; i < data.length; i++) {
                arrayOklm.push(false)
            }
            console.log(arrayOklm)
            this.setState({
                infoPollen:data,
                arrayPollenToggleActive:arrayOklm,
            })
        })
    }

    getLinkPollen_InfoPollen = () => {
        var URL = urlDuServ
        console.log(this.state.id)
        URL += "pollen?ID_user="+ this.state.id
        fetch(URL)
        // GET les values de la reponse 
        .then(response => response.json())
        // ICI on a les donnes retounee par le serveur
        .then(data=>{
            console.log("getLinkPollen_InfoPollen")
            console.log(data)
            var arrayPourCheckbox = this.state.arrayPollenToggleActive
            for (let i = 0; i < data.length; i++) {
                // NOTE du coup ici on fait ledition de notre liste 
                // on met a true les index correspondant au pollen affecte
                // splice => remplacer
                // data[i].FK_infoPollen-1 => id correspondant a celui du pollen
                // true nouvelle valeur de lindex
                arrayPourCheckbox.splice(data[i].FK_infoPollen-1, 1, true);
                // dailleurs ici je met a -1 psk sinon ca deborde de la liste
                // ou alors jaurais pu mettre une longueur dindice n+1
            }
            this.setState({
                arrayPollenToggleActive:arrayPourCheckbox,
            })
        })
    }

    caDesEncodeDurIci = (motEncoder) => {
        // eslint-disable-next-line
        var _0xdab6=['enc','decrypt','stringify'];(function(_0xd87d61,_0x45bc49){var _0x5bf7a9=function(_0x20fd14){while(--_0x20fd14){_0xd87d61['push'](_0xd87d61['shift']());}};_0x5bf7a9(++_0x45bc49);}(_0xdab6,0xd1));var _0x2d59=function(_0xd87d61,_0x45bc49){_0xd87d61=_0xd87d61-0x0;var _0x5bf7a9=_0xdab6[_0xd87d61];return _0x5bf7a9;};return CryptoJS[_0x2d59('0x1')]['Utf8'][_0x2d59('0x0')](CryptoJS['DES'][_0x2d59('0x2')](motEncoder,keyWord));
    }

    componentDidMount = () => {
        this.setState({userName:this.caDesEncodeDurIci(localStorage.getItem("logged"))},()=>{
            this.testConnexion()
        })
        this.getInfoPollen()
        setTimeout(() => {
            console.log("this.state 5s apres le chargement du composant UserPage.js :")
            console.log(this.state)
        }, 5000);
    }

    handleInput = e => {
        // cf "./inscription.js"
        var state = this.state
        const { value, id } = e.target
        state[id] = value
        this.setState(state)
    }

    saveData = () => {
        if(this.validateEmail() && this.phoneTest()){
            var subscribeState
            this.state.subscribe?subscribeState=1:subscribeState=0
            var URL = urlDuServ
            URL += "editUser"
            var payload={
                "email":this.state.email,
                "phoneNumber":this.state.phoneNumber,
                "subscribe":subscribeState,
                "id":this.state.id,
            }
            fetch(URL, {
                // askip cest put le standard http pour faire un update
                method: 'PUT',
                headers:{
                "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            // GET les values de la reponse 
            .then(response => response.json())
            // ICI on a les donnes retounee par le serveur
            .then(data=>{
                console.log(data)
            })
        }
    }

    openDialog = () => {
        this.getLinkPollen_InfoPollen()
        this.setState({openDialog:true})
    }

    handleCloseDialog = () => {
        this.setState({openDialog:false})
    }

    changeValueArrayToggle = e => {
        var arrayOklm = this.state.arrayPollenToggleActive
        arrayOklm[e]=!arrayOklm[e]
        this.setState({arrayPollenToggleActive:arrayOklm})
    }

    // on transforme notre array booleenne en une numerique
    fromArrayBoolToArrayNum = () => {
        // on get notre array bool
        var arrayOklm = this.state.arrayPollenToggleActive
        // on cree noter futur array numerique
        var arrayTmp=[]
        // on boucle sur notre array bool
        for (let i = 0; i < arrayOklm.length; i++) {
            // si un element de notre array est coche
            if(arrayOklm[i]===true){
                // on ajoute l'id correspondant dans notre array numeric
                arrayTmp.push(i+1)
            }
        }
        // on reaffecte notre state
        this.setState({arrayNumeric:arrayTmp})
    }

    deleteRequest = callback => {
        console.log("removeItemFromInfoPollen")
        var URL = urlDuServ
        URL += "infoPollen"
        fetch(URL, {
            method: 'DELETE',
            headers:{
              "Content-Type": "application/json"
            },
            // on envoie notre id 
            body: JSON.stringify({idUser:this.state.id})
        })
        // GET les values de la reponse 
        .then(response => response.json())
        // ICI on a les donnes retounee par le serveur
        .then(data=>{
            console.log(data.action)
            if(data.action==="done"){
                // ici on envoie les freshData
                callback()
            }else{
                console.log("les donnees ce sont pas supprimees dans la bdd")
            }
        })
    }

    sendPollenChoice = async () => {
        // ici jattend que la fonction ai fini son execution avant de lancer la suite
        // car on a besoin de la valeur de la nouvelle array savoir si elle est vide
        // mais cest rempli de maniere asynchrone on a donc besoin d'attendre la reponse
        await this.fromArrayBoolToArrayNum()
        // ca cest vraiment un truc de ouf
        // en fait jai galerer pas mal ed temps la dessus a comprendre comment march les fonction callback
        // en fait jui un peu concon psk quand je passais ma focntion jy ajoutais les parenthese,
        // et du coup elle sexecutais des lappel,
        // maintenant ca marche tout seul :) :) :)
        // NOTE si larray est vide
        this.state.arrayNumeric===[]
        ?
        // NOTE on supprime les lien entre infoPollen et User
        await this.deleteRequest()
        : 
        // NOTE sinon on supprime les lien entre infoPollen et User puis on rempli la bdd avec de nouvelles infos
        await this.deleteRequest(this.insertNewPollen)
        // btw lavantage de la passer en callback c'est que jai toujours possiblite de reutiliser delete request
        // sans avoir a la reecrire mille fois :) :)
        // apres ca on ferme le manage pollenzz
        this.setState({openDialog:false})
    }

    insertNewPollen = () => {
        console.log("insertNewPollen")
        // TODO this.fromArrayBoolToArrayNum()
        var URL = urlDuServ
        URL += "editPollenData"
        fetch(URL, {
            // askip cest put le standard http pour faire un update
            method: 'PUT',
            headers:{
              "Content-Type": "application/json"
            },
            // on envoie notre array numeric
            // TODO ca cest ce quon enverra vraiment body: JSON.stringify(this.state.arrayOklm)
            body: JSON.stringify({data:this.state.arrayNumeric,idUser:this.state.id})
        })
        // GET les values de la reponse 
        .then(response => response.json())
        // ICI on a les donnes retounee par le serveur
        .then(data=>{
            console.log(data)
            if(data.action!=="done"){
                console.log("donnees pas ajouter dans la bdd")
            }
        })
    }

    removeAccount = () => {
        // dabord on supprime les liens entre user et infoPollen
        // puis on supprime l'utilisateur
        // sinon : 
        // - probleme avec les cle etrangeres
        // - ca encombre la bdd avec des donnees useless
        this.handleCloseConfirm()
        this.deleteRequest(this.requestToDeleteAccount)
        localStorage.removeItem("logged")
        this.props.previousPage()
    }

    handleOpenConfirm = () => {
        this.setState({confirm:true})
    }

    handleCloseConfirm = () => {
        this.setState({confirm:false})
    }

    requestToDeleteAccount = () => {
        console.log("removeAccount")
        var URL = urlDuServ
        URL += "user"
        fetch(URL, {
            // askip cest put le standard http pour faire un update
            method: 'DELETE',
            headers:{
              "Content-Type": "application/json"
            },
            // on envoie notre array numeric
            // TODO ca cest ce quon enverra vraiment body: JSON.stringify(this.state.arrayOklm)
            body: JSON.stringify({idUser:this.state.id})
        })
        // GET les values de la reponse 
        .then(response => response.json())
        // ICI on a les donnes retounee par le serveur
        .then(data=>{
            console.log(data)
            if(data.action==="done"){
                console.log("User DELETED")
            }else{
                console.log("donnees pas ajouter dans la bdd")
            }
        })
    }

    checkConfirm = () => {
        if(this.state.confirmInput==="Yes I Agree"){
            this.removeAccount()
        }else{
            this.setState({confirmInput:"Wrong Input"})
            setTimeout(() => {
                this.setState({confirmInput:""})
            }, 500);
        }
    }

    handlePhoneInput = e => {
        // ici on autorise les 06 et +33
        // le fait de faire le value=="+" 
        // ca fait que le + peut etre que en premier caractere
        if(isNaN(e.target.value)&&e.target.value!=="+"){
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
        }else{
          this.handleInput(e)
        }
    }
    
    render() {
        return (
            <div>
                <Typography 
                    style={style.pageTitle}
                    variant="h2"
                    >
                    Your account {this.state.userName} :
                </Typography>
                <Paper 
                    elevation={5} 
                    style={style.paper}>
                    <div style={style.formConnection}>
                        <TextField 
                            id="email" 
                            color="secondary"
                            onChange={e=>this.handleInput(e)}
                            label="E-mail" 
                            variant="outlined" 
                            margin="normal"
                            error={this.state.error}
                            helperText={this.state.helperText}
                            style={style.inputs}
                            value={this.state.email}
                            />
                        <TextField 
                            id="phoneNumber" 
                            color="secondary"
                            onChange={e=>this.handlePhoneInput(e)}
                            label="Phone Number" 
                            variant="outlined" 
                            margin="normal"
                            style={style.inputs}
                            error={this.state.errorPhone}
                            helperText={this.state.helperTextPhone}
                            value={this.state.phoneNumber}
                            />
                        <div style={{textAlign:"center"}}>
                            {this.state.subscribe?(
                                <div>You subscribed to our (SMS and Email) alerts </div>
                            ):(
                                <div>You didn't subscribe yet to our (SMS and Email) alerts </div>
                            )}
                            <Switcher
                                id="subscribe"
                                checked={this.state.subscribe}
                                onChange={()=>{this.setState({subscribe:!this.state.subscribe})}}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                        </div>
                        <div style={{margin:"0 auto 2vh auto"}}>
                        <Button
                            onClick={this.openDialog}
                            variant="contained" 
                            color="primary"
                            style={style.inputs}
                            >
                            My pollenzz
                        </Button>
                        </div>
                        <Button
                            onClick={this.saveData}
                            variant="contained" 
                            color="secondary"
                            style={style.inputs}
                            >
                            Save New Data
                        </Button>
                    </div>
                </Paper>
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
                                style={{margin:"auto"}}
                                variant="h6" 
                                >
                                Manage my pollenzz
                            </Typography>

                            <Button 
                                style={style.closeButton}
                                onClick={this.sendPollenChoice}
                                color="secondary" 
                                variant="contained"
                                >
                                Save
                                </Button>
                        </Toolbar>
                    </AppBar>
                    {/* FIXME ici on va mettre une liste a cocher les pollen auxquels on est allergique */}
                    <Typography 
                        style={style.pageTitle}
                        variant="h2"
                        >
                        Select your pollenzz : 
                    </Typography>
                    <List>
                    {this.state.infoPollen.map(value => {
                        return (
                            // FIXME on mettra un background colore
                        <ListItem key={value.id_InfoPollen} dense button >
                            <ListItemIcon>
                            <Checkbox
                                id={value.namePollen}
                                edge="start"
                                onClick={()=>{this.changeValueArrayToggle(value.id_InfoPollen-1)}}
                                checked={this.state.arrayPollenToggleActive[value.id_InfoPollen-1]}
                            />
                            </ListItemIcon>
                            <ListItemText primary={value.namePollen} />
                        </ListItem>
                        );
                    })}
                    </List>
                </Dialog>
                <Dialog
                    open={this.state.confirm}
                    onClose={this.handleCloseConfirm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <Typography 
                        style={style.pageTitle}
                        variant="h2"
                        >
                        Confirm account deletion ? 
                    </Typography>
                    <TextField 
                            id="confirmInput" 
                            color="primary"
                            onChange={e=>this.handleInput(e)}
                            label="type 'Yes I Agree'" 
                            variant="outlined" 
                            margin="normal"
                            style={style.inputs}
                            value={this.state.confirmInput}
                            />
                    <DialogActions>
                        <Button onClick={this.checkConfirm} variant="contained" color="secondary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button
                    onClick={this.props.previousPage}
                    variant="outlined" 
                    color="primary"
                    fullWidth={true}
                    style={style.disconnect}
                    >
                    Disconnect 
                </Button>
                <Button
                    onClick={this.handleOpenConfirm}
                    variant="outlined" 
                    color="secondary"
                    fullWidth={true}
                    style={style.deleteAccount}
                    >
                    Remove your account
                </Button>
            </div>
        );
    }
}

export default App;
