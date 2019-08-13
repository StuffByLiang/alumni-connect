import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';


/* import components */
import DashboardNavbar from '../components/DashboardNavbar';
import SideNav from '../components/SideNav';

/* import pages */
import HomePage from '../pages/HomePage';
import SamplePage from '../pages/SamplePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';

import '../scss/dashboard.scss';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <SideNav />
        <div id="page-body">
          <DashboardNavbar />
          <Switch>
            <Route path="/dashboard/" component={HomePage} exact />
            <Route path="/dashboard/sample-page" component={SamplePage} exact />
            <Route path="/dashboard/login" component={LoginPage} exact />
            <Route path="/dashboard/signup" component={SignupPage} exact />
            <Route path="/dashboard/profile" component={ProfilePage} exact />
            <Route path="/dashboard/profile/edit" component={EditProfilePage} exact />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
