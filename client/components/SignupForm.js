import React, {Component} from 'react';
import AuthForm from './AuthForm';
import {graphql} from 'react-apollo';
import signup from '../mutations/Signup';
import CurrentUser from '../queries/CurrentUser';
import {hashHistory} from 'react-router';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentWillUpdate(nextProps) {
    console.log('??????');
    if (!this.props.data.user && nextProps.data.user) {
      console.log('now');
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({email, password}) {
    this.props
      .mutate({
        variables: {email, password},
        refetchQueries: [{query: CurrentUser}],
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(err => err.message);
        this.setState({errors});
      });
  }

  render() {
    return (
      <div>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(CurrentUser)(graphql(signup)(SignupForm));
