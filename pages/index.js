import React from "react";
import "isomorphic-fetch";
import Layout from "../components/Layout";
import UserList from "../components/UserList";
import CreateUserDialog from "../components/CreateUserDialog";
import Api from "../common/api";
import { Button, Intent } from "@blueprintjs/core";

export default class extends React.PureComponent {
  static async getInitialProps({ req }) {
    return {
      users: await Api.listUsers()
    };
  }

  constructor(props) {
    super(props);
    this.state = { isCreateUserDialogOpen: false };
  }

  createUser = () => {
    this.setState({ isCreateUserDialogOpen: true });
    // return Api.createUser();
  };

  render() {
    return (
      <Layout>
        <CreateUserDialog
          isOpen={this.state.isCreateUserDialogOpen}
          onClose={() => this.setState({ isCreateUserDialogOpen: false })}
        />
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
