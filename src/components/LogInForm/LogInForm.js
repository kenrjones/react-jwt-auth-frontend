import React, { Component } from 'react'

import './LogInForm.css'

class LogInForm extends Component {
  render () {
    return (
      <div>
        {/* <h2>Log In</h2> */}

        <form>
          <div>
            <label htmlFor='email'>EMAIL</label>
            <input type='text' name='email' onChange={this.props.handleInput} />
          </div>
          <div>
            <label htmlFor='password'>PASSWORD</label>
            <input type='text' name='password' onChange={this.props.handleInput} />
          </div>
          <div>
            <h6>Are you new to our website? <a href="http://localhost:3000/signup">Register here</a> </h6>
          </div>
          <input value='Submit' type='submit' onClick={this.props.handleLogIn} />
        </form>
      </div>
    )
  }
}

export default LogInForm
