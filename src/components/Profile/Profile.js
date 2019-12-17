import React, { Component } from 'react'
import FavoriteHeadlines from '../FavoriteHeadlines'
import './Profile.css'

class Profile extends Component {

  state = {
    moreNews: false
  }

  componentDidMount(){
    this.props.showNavBar();
    this.props.getStories()
  }

  render(props) {
    console.log('stories', this.props.stories)
    return (
      <div>
        <FavoriteHeadlines stories={this.props.stories} />
      </div>
    )
  }

}

export default Profile
