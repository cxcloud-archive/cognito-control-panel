import React from "react";
import "isomorphic-fetch";
import Layout from "../components/Layout";
import UserList from "../components/UserList";
import Api from "../common/api";

export default class extends React.PureComponent {
  static async getInitialProps({ req }) {
    return {
      users: await Api.listUsers()
    };
  }

  createUser() {
    return Api.createUser();
  }

  render() {
    return (
      <Layout>
        <button onClick={this.createUser}>Create User</button>
        <UserList users={this.props.users} />
      </Layout>
    );
  }
}
