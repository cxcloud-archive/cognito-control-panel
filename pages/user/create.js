import "isomorphic-fetch";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import Api from "../../common/api";
import Layout from "../../components/Layout";
import UserForm from "../../components/UserForm";

const formFields = process.env.FORM_FIELDS.split(",");
const createUser = values =>
  Api.createUser(values).then(() => Router.push(`/`));

export default () => (
  <Layout>
    <Head>
      <title>Create User</title>
    </Head>
    <UserForm
      onSubmit={createUser}
      formFields={formFields}
      successMessage='User was created successfully'
    />
  </Layout>
);
