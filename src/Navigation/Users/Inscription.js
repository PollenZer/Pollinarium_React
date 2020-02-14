import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonalInformation from './personalInformation.js';
import AccountInformation from './accountInformation.js';
import ContactInformation from './contactInformation.js';
import Stepper from './Stepper.js';
// eslint-disable-next-line
const _0x1339=['BruxellesVie'];(function(_0x4f5b1a,_0x341937){const _0x4f0a2c=function(_0x36fcf7){while(--_0x36fcf7){_0x4f5b1a['push'](_0x4f5b1a['shift']());}};_0x4f0a2c(++_0x341937);}(_0x1339,0xfb));const _0x1f35=function(_0x4f5b1a,_0x341937){_0x4f5b1a=_0x4f5b1a-0x0;let _0x4f0a2c=_0x1339[_0x4f5b1a];return _0x4f0a2c;};const keyWord=_0x1f35('0x0');

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
    }
  }

  handleText = e => {
    console.log(e.target.value)
    console.log(e.target.id)
  }

  render() {
    return (
        // when not connected yet
        // REVIEW Pour linstant (10/02/2020) tout ce dont on a besoin cest id="userName" et onClick={this.connection}
        <Paper 
          elevation={5} 
          style={style.paper}
          >
          {/* NOTE ici je fait que la connection pas encore linscription */}
          <Typography 
            style={style.pageTitle}
            variant="h2"
            >
            Create an account : 
          </Typography>
          <form style={style.formConnection} noValidate autoComplete="off">
            <Stepper/>
            <PersonalInformation/>
            <AccountInformation/>
            <ContactInformation/>
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
          </form>
        </Paper>
    );
  }
}

export default App;
