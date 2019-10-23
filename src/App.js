import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    username: "",
    email: "",
    pass: "",
    accept: false,
    message: "",
    errors: {
      username: false,
      email: false,
      pass: false,
      accept: false
    }
  }
  messages = {
    usernameIncorrect: "Username must be longer than 10 chars (without space)",
    emailIncorrect: "Email must have @",
    passwordIncorrect: "Password must be longer than 7 chars",
    acceptIncorrect: "Accept Terms of Services",

  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const type = event.target.type;
    if (type === "text" || type === "email" || type === "password") {
      this.setState({
        [name]: value
      })
    }
    else if (type === "checkbox") {
      const checked = event.target.checked;
      this.setState({
        [name]: checked
      })
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const validation = this.formValidation();
    if (validation.correct) {
      this.setState({
        username: "",
        email: "",
        pass: "",
        accept: false,
        message: "You're registered!",
        errors: {
          username: false,
          email: false,
          pass: false,
          accept: false,

        }
      })
    }
    else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept
        }
      })
    }
  }
  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;
    if (this.state.username.length > 10 && this.state.username.indexOf(" ") === -1) {
      username = true;
    }
    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }
    if (this.state.pass.length > 8) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && email && password && accept) {
      correct = true;
    }
    return ({
      correct,
      username,
      email,
      password,
      accept
    })
  }
  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(() => {
        this.setState({
          message: ""
        })
      }, 2000)
    }
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">
            <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Name" className="textInput" />
            {this.state.errors.username && <span>{this.messages.usernameIncorrect}</span>}
          </label>

          <label htmlFor="email">
            <input type="email" id="email" name="email" className="textInput" value={this.state.email} placeholder="Email" onChange={this.handleChange} />
            {this.state.errors.email && <span>{this.messages.emailIncorrect}</span>}
          </label>

          <label htmlFor="password">
            <input type="password" id="password" name="pass" className="textInput" value={this.state.pass} placeholder="Password" onChange={this.handleChange} />
            {this.state.errors.pass && <span>{this.messages.passwordIncorrect}</span>}
          </label>
          <input type="checkbox" id="accept" name="accept" value={this.state.accept} onChange={this.handleChange} checked={this.state.accept} />
          <label htmlFor="accept" className="acceptCheckbox">Accept Terms of Service</label>
          <button>Sign Up</button>
          {this.state.message && <h3>{this.state.message}</h3>}
        </form>
      </div>
    );
  }
}

export default App;


