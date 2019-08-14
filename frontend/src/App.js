import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import { connect } from 'react-redux';

import { history } from './helpers';

import './scss/index.scss'; //sass styling

/* import components */

/* import pages */
import Dashboard from './layouts/Dashboard';
import Default from './layouts/Default';

import { userActions } from './user/userActions';

class App extends Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      this.setState(this.state);
    });
  }

  componentWillMount() {
    const { loggedIn, userData, getProfile } = this.props;
    if(loggedIn && userData === null) {
      console.log('grabbing profile...');
      getProfile();
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Default} />
        </Switch>
      </Router>
    );
  }

  // render() {
  //   return (
  //     <Router history={history}>
  //       <div className="App">
  //         <SideNav />
  //         <div id="page-body">
  //         <Navbar />
  //           <Switch>
  //             <Route path="/" component={HomePage} exact />
  //             <Route path="/sample-page" component={SamplePage} />
  //             <Route path="/login" component={LoginPage} />
  //             <Route path="/signup" component={SignupPage} />
  //             <Route path="/profile" component={ProfilePage} />
  //           </Switch>
  //         </div>
  //       </div>
  //     </Router>
  //   );
  // }
}

function mapStateToProps(state) {
  console.log(state)
  let { loggedIn, data } = state.user;
  return {
    userData: data,
    loggedIn,
  };
}

const mapDispatchToProps = {
  getProfile: userActions.getProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
