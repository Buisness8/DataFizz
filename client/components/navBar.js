import React, { Component } from 'react';
import * as Auth from '../models/auth';

export default class NavBar extends Component{
constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      error: null,
      signedIn: false,
    };
  }

signUp(){
    this.setState({error: null});
    
    Auth.signUp(this.state.username, this.state.password)
      .then((response) => {
        this.setState({signedIn: true})
        alert('Successfully signed up ' + this.state.username);
      })
      .catch((response) => {
        this.setState({error: response});
        alert('Username taken! Please choose a different one.')
      });
  }

  logIn(){
    this.setState({error: null});

    Auth.logIn(this.state.username, this.state.password)
      .then((response) => {
        this.setState({signedIn: true})
        alert('Successfully signed in ' + this.state.username);
      })
      .catch((response) => {
        this.setState({error: response});
      });
  }

  logOut(){
    Auth.logOut()
      .then((response) => {
        this.setState({signedIn:false})
        alert("Logged Out")
      })
  }

  handlePasswordInput(e){
    this.setState({password: e.currentTarget.value});
  }

  handleUsernameInput(e){
    this.setState({username: e.currentTarget.value});
  }
  render(){
    
    return(
      <div>
        {!this.state.signedIn ? <form className="user-info">
          <h3>Log In/Sign Up!</h3>
          <input 
          type="text" 
          name="username" 
          placeholder="username" 
          value={this.state.username}
          onInput={this.handleUsernameInput.bind(this)}
          />
          <input 
          type="password" 
          name="password" 
          placeholder="password" 
          value={this.state.password}
          onInput={this.handlePasswordInput.bind(this)}
          />
        </form> : <h3> Welcome {this.state.username} </h3>}

        {!this.state.signedIn ? <button onClick= {this.signUp.bind(this)}> Sign Up </button> : null}
        {!this.state.signedIn ? <button onClick= {this.logIn.bind(this)}> Log In </button> : null}
        {this.state.signedIn ? <button onClick={this.logOut.bind(this)}> Log Out </button> : null}
      </div>
    )
  }
}