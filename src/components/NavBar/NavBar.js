import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import './NavBar.css'

class NavBar extends Component {

  render() {
    let navBarItems = [<NavItem key={1} href='/'></NavItem>]
    if (this.props.user != null) {
      navBarItems.push(<NavItem key={5} href='/profile'>{this.props.user.username}</NavItem>)
      if (this.props.isLoggedIn) {
        navBarItems.push(<NavItem key={2} href='/logout'>Log Out</NavItem>)
      }

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
