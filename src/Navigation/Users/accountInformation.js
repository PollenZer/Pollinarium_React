
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class App extends Component {
  render() {
    return (
        <div>
          {/* user name */}
          <TextField 
            id="userName" 
            color="secondary"
            label="User Name" 
            variant="outlined" 
            margin="normal"
            onChange={e=>this.handleText(e)}
            />
          {/* password 1 */}
          <TextField 
            id="passWord1" 
            color="secondary"
            label="PassWord" 
            variant="outlined" 
            margin="normal"
            onChange={e=>this.handleText(e)}
            />
          {/* password 2 */}
          <TextField 
            id="passWord2" 
            color="secondary"
            label="Confirm PassWord" 
            variant="outlined" 
            margin="normal"
            onChange={e=>this.handleText(e)}
            />
          {/* subscribe */}
          <TextField 
            id="subscribe" 
            color="secondary"
            label="Subscribe" 
            variant="outlined" 
            margin="normal"
            onChange={e=>this.handleText(e)}
            />
        </div>
    );
  }
}

export default App;
