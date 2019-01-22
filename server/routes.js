const aws = require("aws-sdk");
const express = require("express");
const router = express.Router();

const client = new aws.CognitoIdentityServiceProvider({
  region: process.env.COGNITO_REGION
});

const reduceUserAttributes = attributes =>
  attributes.reduce((obj, { Name, Value }) => {
    obj[Name] = Value;
    return obj;
  }, {});

router.get("/list-users", (req, res) => {
  client
    .listUsers({
      UserPoolId: process.env.COGNITO_POOL_ID
    })
    .promise()
    .then(data => {
      const users = data.Users.map(item => {
        const { Attributes, ...rest } = item;
        const UserAttributes = reduceUserAttributes(Attributes);
        return Object.assign({}, { UserAttributes, ...rest });
      });
      res.json({ users });
    })
    .catch(err => console.log(err));
});

router.post("/admin-create-user", (req, res) => {
  const email = "mpxy03a@gmail.com";
  client
    .adminCreateUser({
      UserPoolId: process.env.COGNITO_POOL_ID,
      MessageAction: "SUPPRESS",
      TemporaryPassword: "temp_Pass",
      UserAttributes: [
        {
          Name: "email",
          Value: email
        },
        {
          Name: "name",
          Value: "Mesut"
        },
        {
          Name: "custom:ssn",
          Value: "123456789"
        }
      ],
      Username: email
    })
    .promise()
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.post("/admin-update-user-attributes", (req, res) => {
  const { username, UserAttributes } = req.body;
  client
    .adminDeleteUser({
      UserPoolId: process.env.COGNITO_POOL_ID,
      Username: username
    })
    .promise()
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.post("/admin-delete-user", (req, res) => {
  const { username } = req.body;

  client
    .adminDeleteUser({
      UserPoolId: process.env.COGNITO_POOL_ID,
      Username: username
    })
    .promise()
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.get("/admin-get-user", (req, res) => {
  const { username } = req.query;
  client
    .adminGetUser({
      UserPoolId: process.env.COGNITO_POOL_ID,
      Username: username
    })
    .promise()
    .then(data => {
      const UserAttributes = reduceUserAttributes(data.UserAttributes);
      const user = Object.assign({}, { ...data, UserAttributes });
      res.json(user);
    })
    .catch(err => console.log(err));
});

module.exports = router;
