import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import { history } from './helpers';

import './scss/index.scss'; //sass styling

/* import components */
import Navbar from './components/Navbar';

/* import pages */
import HomePage from './pages/HomePage';
import SamplePage from './pages/SamplePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

console.log(history)

class App extends Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      console.log("hello")
      this.setState(this.state);
    });
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <div id="page-body">
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/sample-page" component={SamplePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/profile" component={ProfilePage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
