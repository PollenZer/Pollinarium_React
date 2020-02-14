
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

const style={
  display:"flex",
  flexDirection:"column",
  padding:"5vh 10vw",
}

class App extends Component {
  render() {
    return (
        <div style={style}>
            {/* first name */}
            <TextField 
            id="firstName" 
            color="secondary"
            label="First Name" 
            variant="outlined" 
            margin="normal"
            onChange={e=>this.handleText(e)}
            />
            {/* last name */}
            <TextField 
            id="lastName" 
            color="secondary"
            label="Last Name" 
            variant="outlined" 
            margin="normal"
            onChange={e=>this.handleText(e)}
            />
        </div>
    );
  }
}

export default App;
