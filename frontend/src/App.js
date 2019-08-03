import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import './App.css';

/* import components */
import Navbar from './components/Navbar';

/* import pages */
import HomePage from './pages/HomePage';
import SamplePage from './pages/SamplePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div id="page-body">
            <Route path="/" component={HomePage} exact />
            <Route path="/sample-page" component={SamplePage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
