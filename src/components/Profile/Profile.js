import React, { Component } from 'react'
import FeaturedHeadlines from '../FeaturedHeadlines'
import SecondaryHeadlines from '../SecondaryHeadlines'
import './Profile.css'

class Profile extends Component {

  state = {
    moreNews: false
  }

  componentDidMount(){
    this.props.showNavBar();
  }

  render() {
    return (
      <div>
        PROFILE PAGE
      </div>
    )
  }

}

export default Profile
