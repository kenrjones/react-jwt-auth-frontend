import React, { Component } from 'react'
import FavoriteHeadlines from '../FavoriteHeadlines'
import './Profile.css'

class Profile extends Component {

  state = {
    moreNews: false
  }

  componentDidMount(){
    this.props.showNavBar();
  }

  render(props) {
    return (
      <div>
        <FavoriteHeadlines favoriteHeadlines={this.props.favoriteHeadlines} />
      </div>
    )
  }

}

export default Profile
