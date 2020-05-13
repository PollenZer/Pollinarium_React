import React, { Component } from 'react';
import CryptoJS from 'crypto-js'
// import { Map, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import { url as urlDuServ } from "../../urlServ"
// eslint-disable-next-line
var _0x519e=['QnJ1eGVsbGVzVmll'];(function(_0x121e9d,_0x519ee9){var _0x17b97d=function(_0xdb2e25){while(--_0xdb2e25){_0x121e9d['push'](_0x121e9d['shift']());}};_0x17b97d(++_0x519ee9);}(_0x519e,0xb0));var _0x17b9=function(_0x121e9d,_0x519ee9){_0x121e9d=_0x121e9d-0x0;var _0x17b97d=_0x519e[_0x121e9d];if(_0x17b9['FztqGB']===undefined){(function(){var _0x1aac50=function(){var _0x2f9c2e;try{_0x2f9c2e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x2428ed){_0x2f9c2e=window;}return _0x2f9c2e;};var _0x45a7a5=_0x1aac50();var _0x3aae98='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x45a7a5['atob']||(_0x45a7a5['atob']=function(_0x1e32e3){var _0x3c826b=String(_0x1e32e3)['replace'](/=+$/,'');var _0x320e4b='';for(var _0x216c5f=0x0,_0x42d025,_0x1a068e,_0x5cd77a=0x0;_0x1a068e=_0x3c826b['charAt'](_0x5cd77a++);~_0x1a068e&&(_0x42d025=_0x216c5f%0x4?_0x42d025*0x40+_0x1a068e:_0x1a068e,_0x216c5f++%0x4)?_0x320e4b+=String['fromCharCode'](0xff&_0x42d025>>(-0x2*_0x216c5f&0x6)):0x0){_0x1a068e=_0x3aae98['indexOf'](_0x1a068e);}return _0x320e4b;});}());_0x17b9['bKoYCo']=function(_0x34f23b){var _0x1a22a1=atob(_0x34f23b);var _0x1782b9=[];for(var _0x58d409=0x0,_0x1ed9d8=_0x1a22a1['length'];_0x58d409<_0x1ed9d8;_0x58d409++){_0x1782b9+='%'+('00'+_0x1a22a1['charCodeAt'](_0x58d409)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1782b9);};_0x17b9['mdqeDo']={};_0x17b9['FztqGB']=!![];}var _0xdb2e25=_0x17b9['mdqeDo'][_0x121e9d];if(_0xdb2e25===undefined){_0x17b97d=_0x17b9['bKoYCo'](_0x17b97d);_0x17b9['mdqeDo'][_0x121e9d]=_0x17b97d;}else{_0x17b97d=_0xdb2e25;}return _0x17b97d;};var keyWord=_0x17b9('0x0');

const months = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December",
]

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      numberMonth:0,
      stringMonth:"",
      userName:"",
      userId:-1,
      // ca cest dans getCurrentPollen()
      pollensActuel:[],
      // ca cest dans getLinkPollen()
      pollensAllergique:[],
      // ca cest dans comparaisonDesDeuxArrays()
      arrayPollenTotaux:[],
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

  // ici cest ce que doit faire mon app au lancement du composant
  componentDidMount = async () => {
    var d = new Date();
    // ici je met le numero du mois a +1 psk dans la bdd janvier = 1 etc
    await this.setState({
      numberMonth:d.getMonth()+1,
      stringMonth:months[d.getMonth()],
    })
    // ici ca deviens technique attention
    // la on recupere larray des pollens actuels genre ceux qui tourne ce mois ci
    this.getCurrentPollen()
    // ici on recupere notre user name encrypter normal
    this.getUserNameEncrypted()
    // la premiere etape on get les datas du user
    // comass on a notre userId dont on a besoin pour 
    // recupere les pollens auxquels luser est allergique
    // du coup on passe notre autre fonction en argument
    // en "callback" car on doit leffectuer en ayant connaissance du userId, 
    // et si on met la fonction a la suite meme avec des await il ne capte pas le userId
    this.getUserData(this.getLinkPollen_InfoPollen)
  }

  getCurrentPollen = () => {
    console.log("getCurrentPollen")
    var URL = urlDuServ
    URL += "currentPollen?currentMonth="+this.state.numberMonth 
    fetch(URL)
    // GET les values de la reponse 
    .then(response => response.json())
    // ICI on a les donnes retounee par le serveur
    .then(data=>{
        console.log(data)
        this.setState({pollensActuel:data})
    })
  }

  // copier de ../Users/Page.js
  // cest commenter la bas
  getUserNameEncrypted = () => {
    var monStorageAvecLeLogzer = localStorage.getItem("logged")
    if(monStorageAvecLeLogzer!==null && monStorageAvecLeLogzer!=="null"){
      this.setState({userName:localStorage.getItem("logged")})
    }else{
      alert("ici je dois faire un truc pour signaler que luser est pas co")
    }
  }

  getUserData = (callback) => {
    var userNom = this.caDesEncodeDurIci(this.state.userName)
    var URL = urlDuServ
    URL += "usersInfo?user=" + userNom
    fetch(URL)
    // GET les values de la reponse 
    .then(response => response.json())
    // ICI on a les donnes retounee par le serveur
    .then(data=>{
        console.log(data.ID_user)
        this.setState({userId:data.ID_user})
        callback()
    })
  }

  getLinkPollen_InfoPollen = () => {
    var URL = urlDuServ
    console.log()
    URL += "pollen?ID_user="+ this.state.userId
    fetch(URL)
    // GET les values de la reponse 
    .then(response => response.json())
    // ICI on a les donnes retounee par le serveur
    .then(data=>{
        console.log("getLinkPollen_InfoPollen")
        console.log(data)
        this.setState({pollensAllergique:data},()=>{
          // je la met ici pour quelle sexecute une fois que le state ait ete 
          // mis a jour, normalement je laurais mit dans le componentDidMount
          // mais cest plus simple de le mettre ici, meme si cest moins propre, 
          // ca fait un peu brouillon, (manque de temps)
          this.comparaisonDesDeuxArrays()
        })
    })
  }

  comparaisonDesDeuxArrays = () => {
    var array1 = this.state.pollensActuel
    var array2 = this.state.pollensAllergique
    // je dois linitialiser en tant qu'array (" = [] ")
    // sinon le push met une erreur car on ne peux pas push un number par exemple
    var arrayTmp = []
    var outputArray = []
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
    for (let i = 0; i < array2.length; i++) {
      arrayTmp.push(array2[i].FK_infoPollen)
    }
    for (let i = 0; i < array1.length; i++) {
      arrayTmp.push(array1[i].id_InfoPollen)
    }
    arrayTmp = findDuplicates(arrayTmp)
    for (let i = 0; i < array1.length; i++) {
      if(array1[i].id_InfoPollen===arrayTmp[0]){
        outputArray.push(array1[i].namePollen)
        arrayTmp.shift()
      }      
    }
    console.log(outputArray)
    this.setState({arrayPollenTotaux:outputArray})
  }

  render() {
    return (
      <div>
        {this.state.arrayPollenTotaux.length>0?(
          <div>
            <div>Actual pollens that you are allergic</div>
            <ul>
            {this.state.arrayPollenTotaux.map((val,key)=>{
              return(
                <li key={key}>{val}</li>
              )
            })}
            </ul>
          </div>
        ):(
          <div>There is no pollens to which you are currently allergic</div>
        )}
        <div>
          Il y a d'enormes probleme d'affichage avec react-leaftlet,
          je ne peux donc pas afficher les informations de maniere graphique
        </div>
        <div>

        </div>
      </div>
    );
  }
}

export default App;
