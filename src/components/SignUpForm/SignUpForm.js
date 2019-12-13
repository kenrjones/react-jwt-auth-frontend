import React, { Component } from 'react'

import './SignUpForm.css'

class SignUpForm extends Component {
  
  componentDidMount(){
    this.props.hideNavBar();
  }

  render () {
    return (
      <div>
        <h2>Sign Up</h2>

        <form>
          <div>
            <label htmlFor='email'>EMAIL</label>
            <input type='text' name='email' onChange={this.props.handleInput} />
          </div>

          <div>
            <label htmlFor='username'>USERNAME</label>
            <input type='text' name='username' onChange={this.props.handleInput} />
          </div>

          <div>
            <label htmlFor='password'>PASSWORD</label>
            <input type='password' name='password' onChange={this.props.handleInput} />
          </div>

          <div>
            <h6>Already have an account? <a href="http://localhost:3000/login">Login here</a> </h6>
          </div>

          <input value='Submit' type='submit' onClick={this.props.handleSignUp} />
        </form>
      </div>
    )
  }
}

export default SignUpForm
