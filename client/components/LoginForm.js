import React, {Component} from 'react';
import AuthForm from './AuthForm';
import LoginMutation from '../mutations/Login';
import {graphql} from 'react-apollo';
import fetchCurrentUser from '../queries/CurrentUser';
import {hashHistory} from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentDidUpdate(prevProps) {
    console.log('This is prevProps: ', prevProps);
    console.log('Current props: ', this.props);
    if (!prevProps.data.user && this.props.data.user) {
      console.log('THIS IS SIGNIN');
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({email, password}) {
    console.log(email, password);
    this.props
      .mutate({
        variables: {email, password},
        refetchQueries: [{query: fetchCurrentUser}],
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({errors});
      });
  }

  render() {
    return (
      <div>
        <h4>Login</h4>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(fetchCurrentUser)(graphql(LoginMutation)(LoginForm));
