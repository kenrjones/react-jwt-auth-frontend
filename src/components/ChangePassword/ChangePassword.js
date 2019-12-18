import React, { Component } from 'react'

import './ChangePassword.css'

class ChangePassword extends Component {
  
  componentDidMount(){
    this.props.hideNavBar();
  }

  render () {
    return (
      <div>
        <h2>Change Password</h2>

        <form>

          <div>
            <label htmlFor='password'>PASSWORD</label>
            <input type='password' name='password' onChange={this.props.onHandleChangeUser} />
          </div>

          <div>
            <h6>Already have an account? <a href="http://localhost:3000/login">Login here</a> </h6>
          </div>

          <input value='Submit' type='submit' onClick={this.props.updateUser} />
        </form>
      </div>
    )
  }
}

export default ChangePassword