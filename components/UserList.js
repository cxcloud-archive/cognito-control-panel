import React from "react";
import Api from "../common/api";

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
        <button onClick={this.editUser}>Edit</button>
        <button onClick={this.deleteUser}>Delete</button>
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
