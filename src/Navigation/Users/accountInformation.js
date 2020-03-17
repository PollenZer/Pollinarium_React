import React, { Component } from 'react';
import { 
  TextField, 
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';


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

// 2eme page
class App extends Component {
    
  constructor(props){
    super(props)
    this.state={
      error:false,
      helperText:"",
      errorUser:false,
      helperTextUser:"",
      errorPass:false,
      helperTextPass:"",
    }
  }

  // je sais pas pourquoi mais quand je met directement 
  // la fonction de changement de page, ca lexecute au chargement
  backPage = () => {
    this.props.changePageNumber(0)
  }
  nextPage = () => {
    if(this.checkPass() && this.checkLength()){
      this.props.changePageNumber(2)
    }
  }

  checkLength = () => {
    var user = document.getElementById("userName").value
    var pass = document.getElementById("passWord1").value
    if(user.length<3 || pass.length<3){
      if(user.length<3){
        this.props.openSnack()
        this.setState({
          errorUser:true,
          helperTextUser:"The UserName need to contain more than 3 characters"
        })
        setTimeout(() => {
          this.setState({
            errorUser:false,
            helperTextUser:""
          })        
        }, 3000);
      }
      if(pass.length<3){
        this.props.openSnack()
        this.setState({
          errorPass:true,
          helperTextPass:"The PassWord need to contain more than 3 characters"
        })
        setTimeout(() => {
          this.setState({
            errorPass:false,
            helperTextPass:""
          })        
        }, 3000);
      }
      return false
    }
    return true
  }

  checkPass = () => {
    var pass1 = document.getElementById("passWord1").value
    var pass2 = document.getElementById("passWord2").value
    if(pass1!==pass2){
      this.props.openSnack()
      this.setState({
        error:true,
        helperText:"PassWords don't match"
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

  render() {
    return (
        <div style={style.formConnection}>
          {/* user name */}
          <TextField 
            id="userName" 
            color="secondary"
            label="User Name" 
            variant="outlined" 
            margin="normal"
            error={this.state.errorUser}
            helperText={this.state.helperTextUser}
            value={this.props.state.pageData.userName}
            onChange={e=>this.props.handleText(e)}
            />
          {/* password 1 */}
          <TextField 
            id="passWord1" 
            color="secondary"
            label="PassWord" 
            variant="outlined" 
            type="password"
            margin="normal"
            error={this.state.errorPass}
            helperText={this.state.helperTextPass}
            value={this.props.state.pageData.passWord1}
            onChange={e=>this.props.handleText(e)}
            />
          {/* password 2 */}
          <TextField 
            id="passWord2" 
            color="secondary"
            label="Confirm PassWord" 
            variant="outlined" 
            type="password"
            margin="normal"
            error={this.state.error}
            helperText={this.state.helperText}
            value={this.props.state.pageData.passWord2}
            onChange={e=>this.props.handleText(e)}
            />
          {/* subscribe */}
          <FormControlLabel
            control={
              <Checkbox 
                  checked={this.props.state.pageData.subscribe} 
                  onChange={this.props.handleSubscribeState} 
                  />
            }
            label="Subscribe"
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
        </div>
    );
  }
}

export default App;
