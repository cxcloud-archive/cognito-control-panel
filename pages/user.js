import React from "react";
import "isomorphic-fetch";
import Layout from "../components/Layout";
import Api from "../common/api";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { Button, Intent } from "@blueprintjs/core";
import DeleteUserDialog from "../components/DeleteUserDialog";
import UserForm from "../components/UserForm";
import Head from "next/head";
import styled from "styled-components";

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
        <UserForm user={this.props.user} />
      </Layout>
    );
  }
}
