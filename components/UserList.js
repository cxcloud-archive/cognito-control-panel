import React from "react";
import Api from "../common/api";
import { Button, Intent } from "@blueprintjs/core";

class User extends React.Component {
  deleteUser = () => {
    Api.deleteUser(this.props.user.Username);
  };

  editUser = () => {
    Api.editUser(this.props.Username);
  };

  render() {
    return (
      <div>
        <span>{this.props.user.Username}</span>
        <Button icon='edit' onClick={this.editUser} minimal={true} />
        <Button
          icon='trash'
          onClick={this.deleteUser}
          intent={Intent.DANGER}
          minimal={true}
        />
      </div>
    );
  }
}

export default ({ users }) => (
  <div>
    <span>Users</span>
    {users.map((user, key) => {
      return <User key={key} user={user} />;
    })}
  </div>
);
