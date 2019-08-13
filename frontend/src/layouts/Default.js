import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';

/* import components */
import DefaultNavbar from '../components/DefaultNavbar';

import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

class Default extends Component {
  render() {
    return (
      <div className="default">
        <DefaultNavbar />
        <Switch>
          <Route path="/" component={LoginPage} exact/>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
      </div>
    );
  }
}

export default Default;
