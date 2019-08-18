import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';


/* import components */
import DashboardNavbar from 'components/navigation/DashboardNavbar';
import SideNav from 'components/navigation/SideNav';

/* import pages */
import { Home } from 'pages/Home';
import Sample from 'pages/Sample';
import { Login, Signup } from 'pages/Auth';
import { Profile, EditProfile }from 'pages/Profile';
import { Group, GroupList } from 'pages/Group';
import { NewPost } from 'pages/Post';

import '../scss/dashboard.scss';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <SideNav />
        <div id="page-body">
          <DashboardNavbar />
          <Switch>
            <Route path="/dashboard/" component={Home} exact />
            <Route path="/dashboard/sample-page" component={Sample} exact />
            <Route path="/dashboard/login" component={Login} exact />
            <Route path="/dashboard/signup" component={Signup} exact />
            <Route path="/dashboard/profile" component={Profile} exact />
            <Route path="/dashboard/profile/edit" component={EditProfile} exact />
            <Route path="/dashboard/groups/" component={GroupList} exact />
            <Route path="/dashboard/groups/:id" component={Group} exact />
            <Route path="/dashboard/groups/:id/posts/new" component={NewPost} exact />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
