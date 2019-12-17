import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Navbar, NavItem, NavLink } from 'react-materialize'
import './NavBar.css'

class NavBar extends Component {

  render() {
    let navBarItems = [];
    console.log('checking props', this.props.isLoggedIn)
    if (this.props.isLoggedIn) {
      navBarItems.push(<li key={5}>{this.props.user.username}</li>)
      navBarItems.push(<Link key={6} to='/profile'>Read Later</Link>)
      navBarItems.push(<Link key={2} to='/logout'>Log Out</Link>)
    } else {
      navBarItems.push(<Link key={4} to='/login'>Log In</Link>)
      navBarItems.push(<Link key={3} to='/signup'>Sign Up</Link>)
    }
    return (
      <Navbar brand='LOGO' className='nav' style={{display: this.props.hideNavBar ? 'none' : 'block'}} right>
        {navBarItems}
      </Navbar>
    )
  }
}

export default NavBar
