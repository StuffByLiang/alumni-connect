import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';

/* import components */
import DefaultNavbar from 'components/navigation/DefaultNavbar';
import {Login, Signup}from '../pages/Auth';

class Default extends Component {
  render() {
    return (
      <div className="default">
        <DefaultNavbar />
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default Default;
