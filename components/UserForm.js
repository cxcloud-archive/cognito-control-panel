import React from "react";
import { Form, Field } from "react-final-form";
import { Button, Intent } from "@blueprintjs/core";
import styled from "styled-components";

const formFields = ["name", "email", "custom:ssn"];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async values => {
  //   await sleep(300);
  console.log(values);
  //   window.alert(JSON.stringify(values, 0, 2));
};

const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-right: 1rem;
  }
`;

export default ({ user }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={user.UserAttributes}
    render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        {formFields.map((item, key) => (
          <div className='bp3-form-group bp3-large' key={key}>
            <label className='bp3-label'>{item}</label>
            <div className='bp3-form-content'>
              <Field
                name={item}
                className='bp3-input bp3-large'
                component='input'
                type='text'
              />
            </div>
          </div>
        ))}
        <Buttons>
          <Button
            type='submit'
            icon='tick'
            disabled={submitting || pristine}
            intent={Intent.SUCCESS}
          >
            Save
          </Button>
          <Button
            icon='tick'
            disabled={submitting || pristine}
            onClick={form.reset}
          >
            Reset
          </Button>
        </Buttons>
        <pre>{JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  />
);
