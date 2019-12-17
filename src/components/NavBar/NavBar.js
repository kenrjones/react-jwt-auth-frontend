import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import './NavBar.css'

class NavBar extends Component {

  render() {
    let navBarItems = []
    if (this.props.isLoggedIn) {
      navBarItems.push(<li key={5}>{this.props.user.username}</li>)
      navBarItems.push(<NavItem key={6} href='/profile'>Read Later</NavItem>)
      navBarItems.push(<NavItem key={2} href='/logout'>Log Out</NavItem>)
    } else {
      navBarItems.push(<NavItem key={4} href='/login'>Log In</NavItem>)
      navBarItems.push(<NavItem key={3} href='/signup'>Sign Up</NavItem>)
    }
    return (
      <Navbar brand='LOGO' className='nav' style={{display: this.props.hideNavBar ? 'none' : 'block'}} right>
        {navBarItems}
      </Navbar>
    )
  }
}

export default NavBar
