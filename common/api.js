export default class Api {
  static async listUsers() {
    return fetch(`${process.env.API_URL}/list-users`)
      .then(res => res.json())
      .then(data => data.users);
  }

  static async getUser(username) {
    return fetch(
      `${process.env.API_URL}/admin-get-user?username=${username}`
    ).then(res => res.json());
  }

  static async createUser() {
    return fetch(`${process.env.API_URL}/admin-create-user`, {
      method: "post",
      body: JSON.stringify({ aaa: "bbb" }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => console.log("Created User:", data));
  }

  static async editUser(username, attributes) {}

  static async deleteUser(username) {
    return fetch(`${process.env.API_URL}/admin-delete-user`, {
      method: "post",
      body: JSON.stringify({ username: username }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => console.log("Removed user:", data));
  }
}
