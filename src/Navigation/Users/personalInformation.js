import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
// const pageNumber=0

// 1ere page
class App extends Component {

  constructor(props){
    super(props)
    this.state={
      errorFirst:false,
      errorLast:false,
      helperText:"",
    }
  }

  // je sais pas pourquoi mais quand je met directement 
  // la fonction de changement de page, ca lexecute au chargement
  backPage = () => {
    this.props.resetData()
  }
  nextPage = () => {
    if(this.checkInputs()){
      this.props.changePageNumber(1)
    }
  }

  checkInputs = () => {
    if(
      this.props.state.pageData.firstName===""
      ||this.props.state.pageData.lastName===""
      ||this.props.state.pageData.firstName===undefined
      ||this.props.state.pageData.lastName===undefined
    ){
      this.props.openSnack()
      if(
        this.props.state.pageData.firstName===""
        ||this.props.state.pageData.firstName===undefined
      ){
        this.setState({
          errorFirst:true,
          helperText:"Input empty"
        })
      }else if(
        this.props.state.pageData.lastName===""
        ||this.props.state.pageData.lastName===undefined
      ){
        this.setState({
          errorLast:true,
          helperText:"Input empty"
        })
      }
      setTimeout(() => {
        this.setState({
          errorFirst:false,
          errorLast:false,
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
        {/* first name */}
        <TextField 
          id="firstName" 
          color="secondary"
          label="First Name" 
          variant="outlined" 
          margin="normal"
          value={this.props.state.pageData.firstName}
          error={this.state.errorFirst}
          helperText={this.state.helperText}
          onChange={e=>this.props.handleText(e)}
          />
        {/* last name */}
        <TextField 
          id="lastName" 
          color="secondary"
          label="Last Name" 
          variant="outlined" 
          margin="normal"
          value={this.props.state.pageData.lastName}
          error={this.state.errorLast}
          helperText={this.state.helperText}
          onChange={e=>this.props.handleText(e)}
          />
        <div style={style.submitContainer}>
          <Button
            onClick={this.backPage}
            variant="contained" 
            color="primary"
            >
            Reset
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
