import { Button, FormGroup, Intent } from "@blueprintjs/core";
import "isomorphic-fetch";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Api from "../../common/api";
import DeleteUserDialog from "../../components/DeleteUserDialog";
import Layout from "../../components/Layout";
import UserForm from "../../components/UserForm";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export default class extends React.Component {
  static async getInitialProps({ query: { username } }) {
    const user = await Api.getUser(username);
    return {
      user
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      isDeleteDialogOpen: false
    };
  }

  showDeleteDialog = () => this.setState({ isDeleteDialogOpen: true });

  hideDeleteDialog = () => this.setState({ isDeleteDialogOpen: false });

  deleteUser = () => Api.deleteUser(this.state.user.Username);

  editUser = values => {
    return Api.editUser(this.state.user.Username, values).then(() => {
      this.setState({
        user: {
          ...this.state.user,
          UserAttributes: {
            ...this.state.user.UserAttributes,
            ...values
          }
        }
      });
    });
  };

  render() {
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
        {this.state.user && (
          <Container>
            <FormGroup label='Username'>{this.state.user.Username}</FormGroup>
            <Button
              icon='trash'
              onClick={this.showDeleteDialog}
              intent={Intent.DANGER}
              minimal={true}
            >
              Delete
            </Button>
          </Container>
        )}
        <UserForm
          user={this.state.user}
          formFields={process.env.FORM_FIELDS.split(",")}
          onSubmit={this.editUser}
          successMessage='User info was updated successfully'
        />
      </Layout>
    );
  }
}
