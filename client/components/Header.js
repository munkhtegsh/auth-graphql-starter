import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import fetchCurrentUser from '../queries/CurrentUser';
import {Link} from 'react-router';
import fetchLogout from '../mutations/Logout';
import {hashHistory} from 'react-router';

class Header extends Component {
  onLogout() {
    this.props.mutate({}).then(() => this.props.data.refetch()); // refetch changes header Logout to Login and Signup btn
  }

  renderButtons() {
    const {loading, user} = this.props.data;
    if (loading) return <div />;

    if (user) {
      return (
        <li>
          <a onClick={this.onLogout.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    if (this.props.data.laoding) return <div>Loading...</div>;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(fetchLogout)(graphql(fetchCurrentUser)(Header));
