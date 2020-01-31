import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      background: '#fff' 
    }
  }

  componentDidMount = () => {
    this.deleteSaturationBar()
  }  

  deleteSaturationBar = () => {
    document.querySelector(".flexbox-fix").children[1].children[1].innerHTML = ""
    document.querySelectorAll(".flexbox-fix")[1].innerHTML = ""
  }
  
  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  }
  
  render() {
    return (
      <div>
        <ChromePicker 
          color={ this.state.background }
          onChangeComplete={ this.handleChangeComplete }
          />
      </div>
    );
  }
}

export default App;
