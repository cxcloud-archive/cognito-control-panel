import React from "react";
import { Form, Field } from "react-final-form";
import { Button, Intent } from "@blueprintjs/core";
import styled from "styled-components";
import Api from "../common/api";
import AppToaster from "../components/Toaster";

const formFields = ["name", "email", "custom:ssn"];

const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-right: 1rem;
  }
`;
export default class extends React.Component {
  /**
   * Removes user attributes missing in formFields
   */
  getInitialValues() {
    return formFields.reduce(
      (obj, key) => ({ ...obj, [key]: this.props.user.UserAttributes[key] }),
      {}
    );
  }

  onSubmit = async values => {
    await Api.editUser(this.props.user.Username, values)
      .then(res =>
        AppToaster.show({
          message: "User info was updated successfully",
          intent: Intent.SUCCESS
        })
      )
      .catch(error =>
        AppToaster.show({
          message: "Something went wrong, please try again",
          intent: Intent.DANGER
        })
      );
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={this.getInitialValues()}
        render={({ handleSubmit, form, submitting, pristine }) => (
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
          </form>
        )}
      />
    );
  }
}
