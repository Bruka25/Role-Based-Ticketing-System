import React, { Component } from "react";
import axios from "axios";
import { setCredentials } from "../features/authSlice";
import { connect } from "react-redux";

class Login extends Component {
  state = { username: "", password: "" };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const res = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });
    this.props.setCredentials({ user: res.data.user, token: res.data.token });
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default connect(null, { setCredentials })(Login);
