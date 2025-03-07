import React, { Component } from "react";
import axios from "axios";
import { setCredentials } from "../features/authSlice";
import { connect } from "react-redux";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    role: "user", // Default role is "user"
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, role } = this.state;

    try {
      // Send signup request to the backend
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        password,
        role,
      });

      // If signup is successful, log the user in
      const loginRes = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // Save user credentials in Redux store
      this.props.setCredentials({
        user: loginRes.data.user,
        token: loginRes.data.token,
      });

      // Redirect to the dashboard
      this.props.history.push("/dashboard");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={this.handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Role</label>
            <select
              value={this.state.role}
              onChange={(e) => this.setState({ role: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { setCredentials })(Signup);
