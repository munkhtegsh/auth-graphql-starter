import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import CurrentUser from '../queries/CurrentUser';

class Header extends Component {
  render() {
    console.log(this.props);
    if (this.props.data.laoding) return <div>Loading...</div>;
    return <div>Header</div>;
  }
}

export default graphql(CurrentUser)(Header);
