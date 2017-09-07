import React from 'react';
import axios from 'axios';
import GoogleButton from '../components/GoogleButton/index.jsx';
import { NavLink } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      showError: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendLoginRequest = this.sendLoginRequest.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  handleInputChange (property, e) {
    let stateChange = {};
    stateChange[property] = e.target.value;
    this.setState(stateChange);
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.sendLoginRequest();
    }
  }

  sendLoginRequest () {
    if (this.state.email && this.state.password) {
      axios.post('/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then((res) => {
        window.location.replace(res.request.responseURL); // Performs redirect to proper page
        return res;
      })
      .catch((err) => {
        this.setState({errorMessage: 'Incorrect email or password'});
        this.showError();
      });
    } else {
      let missingVals = [];
      if (!this.state.email) {
        missingVals.push('email');
      }
      if (!this.state.password) {
        missingVals.push('password');
      }
      let errorString = `Incomplete! You're missing`;
      for (let i = 0; i < missingVals.length; i++) {
        if (i === missingVals.length - 1 && missingVals.length > 1) {
          errorString += ', and ' + missingVals[i];
        } else if (i === 0) {
          errorString += ' ' + missingVals[i];
        } else {
          errorString += ', ' + missingVals[i];
        }
      }
      this.setState({errorMessage: errorString});
      this.showError();
    }
  }

  showError () {
    this.setState({showError: true});
  }
  hideError () {
    this.setState({showError: false});
  }

  googleOAuthRedirect () {
    window.location.href = '/auth/google';
  }

  render() {
    const navItemStyle = {textDecoration: 'none'};
    return (
      <div>
        <h1>Login</h1>
        <TextField onKeyPress={this.handleKeyPress} placeholder='hello@world.com' label='Email' type='email' value={this.state.email} onChange={this.handleInputChange.bind(this, 'email')} /><br/>
        <TextField onKeyPress={this.handleKeyPress} label='Password' type='password' value={this.state.password} onChange={this.handleInputChange.bind(this, 'password')} /><br/>
        <Button raised className={'btn'} onClick={this.sendLoginRequest}>Login</Button>
        <NavLink
          to='/signup'
          style={navItemStyle}
        >
        <Button className={'btn'}>Sign Up</Button><br/>
        </NavLink>
        <GoogleButton className={'btn'} onClick={this.googleOAuthRedirect} />
        <Snackbar open={this.state.showError} message={this.state.errorMessage} autoHideDuration={4000} onRequestClose={this.hideError} />
      </div>
    ) 
  }
}

export default Login;