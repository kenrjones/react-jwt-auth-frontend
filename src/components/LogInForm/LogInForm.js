import React, { Component } from 'react'

import './LogInForm.css'

class LogInForm extends Component {

  componentDidMount(){
    this.props.hideNavBar();
  }


  render () {
    let loader;
    if (this.props.loading) {
      loader = [<p>loading...</p>]
    }
    return (
      <div>
        <h2>Log In</h2>

        <form>
          <div>
            <label htmlFor='email'>EMAIL</label>
            <input type='text' name='email' onChange={this.props.handleInput} />
          </div>

          <div>
            <label htmlFor='password'>PASSWORD</label>
            <input type='password' name='password' onChange={this.props.handleInput} />
          </div>

          <div>
            <h6>Are you new to our website? <a href="http://localhost:3000/signup">Register here</a> </h6>
          </div>

          <input value='Submit' type='submit' onClick={this.props.handleLogIn} />
        </form>
        {loader}
      </div>
    )
  }
}

export default LogInForm
