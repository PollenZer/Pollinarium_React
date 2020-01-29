import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Contact from './Navigation/Contact/Page.js'
import Datas from './Navigation/Datas/Page.js'
import Home from './Navigation/Home/Page.js'
import Users from './Navigation/Users/Page.js'
import FourOFour from './Navigation/FourOFour/Page.js'
import Test from './test'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/datas">Datas</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
  
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/datas" component={Datas} />
            <Route path="/users" component={Users} />
            <Route path="/test" component={Test} />
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
            <Route path="*" component={FourOFour} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
