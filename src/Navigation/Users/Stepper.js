import React, { Component } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';

class App extends Component {
  render() {
    return (
        <div>
            <Stepper 
                alternativeLabel 
                activeStep={this.props.pageNumber} 
                >
                <Step>
                    <StepLabel 
                        >
                        Personal Informations
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel 
                        >
                        Account Informations
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel 
                        >
                        Contact Information
                    </StepLabel>
                </Step>
            </Stepper>
        </div>
    );
  }
}

export default App;
