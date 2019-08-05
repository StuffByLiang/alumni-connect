import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import './scss/index.scss'; //sass styling

/* import components */
import Navbar from './components/Navbar';

/* import pages */
import HomePage from './pages/HomePage';
import SamplePage from './pages/SamplePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div id="page-body">
            <Route path="/" component={HomePage} exact />
            <Route path="/sample-page" component={SamplePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
