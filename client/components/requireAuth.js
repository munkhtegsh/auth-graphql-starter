import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import fetchCurrentUser from '../queries/CurrentUser';
import {hashHistory} from 'react-router';

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentDidUpdate() {
      if (!this.props.data.loading && !this.props.data.user) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return graphql(fetchCurrentUser)(RequireAuth);
};
