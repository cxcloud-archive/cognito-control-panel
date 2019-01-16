import React from "react";
import "isomorphic-fetch";
import Layout from "../components/Layout";
import UserList from "../components/UserList";
import Api from "../common/api";
import { Button, Intent } from "@blueprintjs/core";

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
        <Button
          icon='plus'
          onClick={this.createUser}
          intent={Intent.SUCCESS}
          minimal={true}
        >
          Create User
        </Button>
        <UserList users={this.props.users} />
      </Layout>
    );
  }
}
