import React from "react";
import "isomorphic-fetch";
import Layout from "../components/Layout";
import Api from "../common/api";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { Button, Intent } from "@blueprintjs/core";
import DeleteUserDialog from "../components/DeleteUserDialog";
import Head from "next/head";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      isDeleteDialogOpen: false
    };
  }

  static async getInitialProps({ query: { username } }) {
    const user = await Api.getUser(username);
    return {
      username,
      user
    };
  }

  showDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: true });
  };
  hideDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: false });
  };
  deleteUser = () => {
    Api.deleteUser(this.props.user.Username);
  };
  onChange = event => {
    console.log(event.target);
  };

  render() {
    console.log(this.state);
    return (
      <Layout>
        <Head>
          <title>User Details</title>
        </Head>
        <DeleteUserDialog
          isOpen={this.state.isDeleteDialogOpen}
          onConfirm={this.deleteUser}
          onClose={this.hideDeleteDialog}
        />
        <Button
          icon='trash'
          onClick={this.showDeleteDialog}
          intent={Intent.DANGER}
          minimal={false}
        />
        <FormGroup label='Username'>{this.state.user.Username}</FormGroup>
        {this.state.user.UserAttributes.map((item, key) => (
          <FormGroup label={item.Name} labelFor={item.Name} key={key}>
            <input
              className='bp3-input bp3-large'
              id={item.Name}
              value={item.Value}
              onChange={this.onChange}
            />
          </FormGroup>
        ))}
      </Layout>
    );
  }
}
