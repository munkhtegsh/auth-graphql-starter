import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {graphql} from 'react-apollo';
import fetchCurrentUser from '../queries/CurrentUser';

class Dashboard extends Component {
  // componentDidMount() {
  //   if (this.props.data.user) {
  //     console.log('hi');
  //     hashHistory.push('/dashboard');
  //   }
  // }

  render() {
    return <div>You are logged in</div>;
  }
}

export default graphql(fetchCurrentUser)(Dashboard);
