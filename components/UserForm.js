import React from "react";
import { Form, Field } from "react-final-form";
import { Button, Intent } from "@blueprintjs/core";
import styled from "styled-components";
import AppToaster from "../components/Toaster";

const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-right: 1rem;
  }
`;

const onSubmit = async (propOnSubmit, values, successMessage) => {
  propOnSubmit(values)
    .then(res =>
      AppToaster.show({
        message: successMessage,
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

/**
 * Removes user attributes missing in FORM_FIELDS
 */
const getInitialValues = (user, formFields) => {
  if (!user) {
    return [];
  }

  return formFields.reduce(
    (obj, key) => ({
      ...obj,
      [key]: user.UserAttributes[key]
    }),
    {}
  );
};

const FormField = ({ fieldName }) => (
  <div className='bp3-form-group bp3-large'>
    <label className='bp3-label'>{fieldName}</label>
    <div className='bp3-form-content'>
      <Field
        name={fieldName}
        className='bp3-input bp3-large'
        component='input'
        type='text'
      />
    </div>
  </div>
);

export default ({
  user,
  formFields,
  onSubmit: propOnSubmit,
  successMessage
}) => (
  <Form
    onSubmit={values => onSubmit(propOnSubmit, values, successMessage)}
    initialValues={getInitialValues(user, formFields)}
    render={({ handleSubmit, form, submitting, pristine }) => (
      <form onSubmit={handleSubmit}>
        {formFields.map((item, key) => (
          <FormField fieldName={item} key={key} />
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
