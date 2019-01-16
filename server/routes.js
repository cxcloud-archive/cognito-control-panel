const aws = require("aws-sdk");
const express = require("express");
const router = express.Router();

const client = new aws.CognitoIdentityServiceProvider({
  region: process.env.COGNITO_REGION
});

router.get("/list-users", (req, res) => {
  client
    .listUsers({
      UserPoolId: process.env.COGNITO_POOL_ID
    })
    .promise()
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.post("/admin-create-user", (req, res) => {
  console.log("ddd");
  console.log(req.body);

  client
    .adminCreateUser({
      UserPoolId: process.env.COGNITO_POOL_ID,
      MessageAction: "SUPPRESS",
      TemporaryPassword: "temp_Pass",
      UserAttributes: [
        {
          Name: "email",
          Value: "mpxy03@gmail.com"
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
      Username: "mpxy03@gmail.com"
    })
    .promise()
    .then(data => {
      console.log("---- user created ----");
      console.log(data);
      res.json(data);
    })
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
    .then(data => {
      console.log("---- user is deleted ----");
      console.log(data);
    })
    .catch(err => console.log(err));
});

module.exports = router;
