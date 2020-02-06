import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
const keyWord = "BruxellesVie"

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      oklm:"test"
    }
  }
  // Restriction pour la gestion de connexion des utilisateurs
  // On va enregistrer les datas dans le sessionStorage
  // On encrypte les nom de users qui serviront a savoir qui est connected
  caEncodeDurIci = (motAEncoder) => {
    return CryptoJS.DES.encrypt(motAEncoder, keyWord);
  }

  caDesEncodeDurIci = (motDesEncoder) => {
    return CryptoJS.DES.decrypt(motDesEncoder, keyWord);
  }
  
  componentDidMount = () => {
    this.setState({oklm:localStorage.getItem("logged")})

  }

  render() {
    return (
        <div>{this.state.oklm}</div>
    );
  }
}

export default App;
