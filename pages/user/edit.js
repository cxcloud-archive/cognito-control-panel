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
  constructor(props) {
    super(props);
    this.state = {
      isDeleteDialogOpen: false
    };
  }

  static async getInitialProps({ query: { username } }) {
    const user = await Api.getUser(username);
    return {
      user
    };
  }

  showDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: true });
  };
  hideDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: false });
  };
  deleteUser = () => Api.deleteUser(this.props.user.Username);

  editUser = values => Api.editUser(this.props.user.Username, values);

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
        {this.props.user && (
          <Container>
            <FormGroup label='Username'>{this.props.user.Username}</FormGroup>
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
          user={this.props.user}
          formFields={process.env.FORM_FIELDS.split(",")}
          onSubmit={this.editUser}
          successMessage='User info was updated successfully'
        />
      </Layout>
    );
  }
}
