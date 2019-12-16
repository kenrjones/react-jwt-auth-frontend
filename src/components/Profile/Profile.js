import React, { Component } from 'react'
import FeaturedHeadlines from '..//FeaturedHeadlines'
import SecondaryHeadlines from '..//SecondaryHeadlines'
import './Profile.css'

class Profile extends Component {

  state = {
    moreNews: false
  }

  componentDidMount(){
    this.props.showNavBar();
  }

  showMoreNews = () => {
    this.setState({moreNews: !this.state.moreNews})
  }
  render() {
    let secondaryHeadlines
    let titleButton 
    if( this.state.moreNews){
      secondaryHeadlines =  <SecondaryHeadlines secondaryHeadlines={this.props.secondaryHeadlines} />
      titleButton = "Less"
    }else{
      titleButton = "More"
    }
    console.log(this.props.secondaryHeadlines)
      return (
        <div>
          <div>
            <FeaturedHeadlines featuredHeadlines={this.props.featuredHeadlines} />
          </div>
          <div>
           {secondaryHeadlines}
           <button onClick={this.showMoreNews}>{titleButton}</button>
          </div>
        </div>
      )
  }

}

export default Profile
