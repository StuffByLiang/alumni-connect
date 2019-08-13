import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import { connect } from 'react-redux';

import { history } from './helpers';

import './scss/index.scss'; //sass styling

/* import components */

/* import pages */
import Dashboard from './layouts/Dashboard';
import Default from './layouts/Default';

import { profileActions } from './profile/profileActions';

class App extends Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      this.setState(this.state);
    });
  }

  componentWillMount() {
    const { loggedIn, currentUserData, getProfile } = this.props;
    if(loggedIn & currentUserData === null) {
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
  let { currentUserData } = state.profile;
  let { loggedIn } = state.users;
  return {
    currentUserData,
    loggedIn,
  };
}

const mapDispatchToProps = {
  getProfile: profileActions.getProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
