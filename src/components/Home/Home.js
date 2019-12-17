import React, { Component } from 'react'
import FeaturedHeadlines from '../FeaturedHeadlines'
import SecondaryHeadlines from '../SecondaryHeadlines'
import './Home.css'

class Home extends Component {

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
      secondaryHeadlines =  <SecondaryHeadlines user={this.props.user} secondaryHeadlines={this.props.secondaryHeadlines} saveFavorite={this.props.saveFavorite}/>
      titleButton = "Less"
    }else{
      titleButton = "More"
    }
      return (
        <div>
          <div>
            <FeaturedHeadlines user={this.props.user} featuredHeadlines={this.props.featuredHeadlines} saveFavorite={this.props.saveFavorite}/>
          </div>
          <div>
           {secondaryHeadlines}
           <button onClick={this.showMoreNews}>{titleButton}</button>
          </div>
        </div>
      )
  }

}

export default Home
