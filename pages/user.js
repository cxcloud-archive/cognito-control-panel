import React from "react";
import "isomorphic-fetch";
import Layout from "../components/Layout";
import Api from "../common/api";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { Button, Intent } from "@blueprintjs/core";
import DeleteUserDialog from "../components/DeleteUserDialog";
import Head from "next/head";
import styled from "styled-components";

const formFields = ["name", "email", "custom:ssn"];

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
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
  deleteUser = () => Api.deleteUser(this.props.user.Username);
  onChange = event => {
    console.log(event.target);
  };

  getAttributeValue = attributeName => {
    const obj = this.state.user.UserAttributes.find(
      item => item.Name === attributeName
    );
    return obj ? obj.Value : undefined;
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
        <FormGroup label='Username'>{this.state.user.Username}</FormGroup>
        {formFields.map((item, key) => (
          <FormGroup
            label={item}
            labelFor={item}
            key={key}
            className='bp3-large'
          >
            <input
              className='bp3-input bp3-large'
              id={item}
              value={this.getAttributeValue(item)}
              onChange={this.onChange}
            />
          </FormGroup>
        ))}
        <Buttons>
          <Button
            icon='tick'
            onClick={this.showDeleteDialog}
            intent={Intent.PRIMARY}
            minimal={false}
            large={true}
          >
            Save
          </Button>
          <Button
            icon='trash'
            onClick={this.showDeleteDialog}
            intent={Intent.DANGER}
            minimal={true}
          >
            Delete
          </Button>
        </Buttons>
      </Layout>
    );
  }
}
