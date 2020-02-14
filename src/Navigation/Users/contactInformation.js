import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class App extends Component {
  render() {
    return (
        <div>
            {/* email */}
            <TextField 
            id="eMail" 
            color="secondary"
            label="eMail" 
            variant="outlined" 
            margin="normal"
            onChange={e=>this.handleText(e)}
            />
            {/* phone number */}
            <TextField 
            id="phoneNumber" 
            color="secondary"
            label="Phone Number" 
            variant="outlined" 
            margin="normal"
            onChange={e=>this.handleText(e)}
            />
        </div>
    );
  }
}

export default App;
