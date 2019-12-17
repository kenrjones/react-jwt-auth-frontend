import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import axios from 'axios'

import NavBar from '../NavBar/NavBar'
import SignUpForm from '../SignUpForm/SignUpForm'
import LogInForm from '../LogInForm/LogInForm'
import LogOut from '../LogOut/LogOut'
import Profile from '../Profile/Profile'
import './App.css'

// const databaseUrl = process.env.NODE_ENV === 'production' ? process.env.BACKEND_APP_URL : 'http://localhost:3000'
const databaseUrl = 'https://sports-news-777.herokuapp.com'

class App extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    isLoggedIn: false,
    user: null,
    headlines:[],
    featuredHeadlines: [],
    secondaryHeadlines: [],
    hideNavBar: false,
    stories: []
  }

  getHeadlines() {
    const url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=2fbfd60a715c400081cecdd7c3238037';
    axios({
      method: 'GET',
      url: url
    }).then(response => {
      let articles = response.data.articles
      let featuredHeadlines = articles.slice(0, 2)
      let secondaryHeadlines = articles.slice(2, 17) 
      this.setState({        
        headlines: articles,
        featuredHeadlines,
        secondaryHeadlines
      })
    })
  }

  componentDidMount() {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
    this.getHeadlines()
    this.checkUser()
    // if (localStorage.token) {
    //   axios(
    //     {
    //       method: 'post',
    //       url: `${databaseUrl}/api/users`,
    //       headers: { Authorization: `Bearer ${localStorage.token}` }
    //     })
    //     .then(response => {
    //       this.setState({
    //         isLoggedIn: true,
    //         user: response.data.user
    //       })
    //       this.props.history.push('/profile')
    //     })
    //     .catch(err => console.log(err))
    // } else {
    //   this.setState({
    //     isLoggedIn: false
    //   })
    // }
  }

  handleLogOut = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false
    })
    this.props.history.push('/')
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    let newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }
    axios(
      {
        method: 'post',
        url: `${databaseUrl}/api/users/signup`,
        data: newUser
      })
      .then(response => {
        const location = {
          pathname: '/login',
          state: { fromDashboard: true }
        }
        this.props.history.replace(location)
      })
      .catch(err => console.log('SingUpError', err))
  }

  handleLogIn = (e) => {
    e.preventDefault()
    let loginUser = {
      email: this.state.email,
      password: this.state.password
    }
    axios(
      {
        method: 'post',
        url: `${databaseUrl}/api/users/login`,
        data: loginUser
      })
      .then(response => {
        window.localStorage.setItem('token', response.data.token)
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        this.setState({
          isLoggedIn: true,
          user: response.data.user
        })
        const location = {
          pathname: '/profile',
          state: { fromDashboard: true }
        }
        this.props.history.replace(location)
      })
      .catch(err => console.log('LoginError', err))
  }

  checkUser = () => {
    if (window.localStorage.user) {
      let user = JSON.parse(window.localStorage.getItem('user'))
      this.setState({ user })
      //API CALL TO GET FAV STORIES.
      //SETSTATE STORIES
    }
  }

  hideNavBar = () => {
    this.setState({
      hideNavBar: true
    })
  }

  showNavBar = () => {
    this.setState({
      hideNavBar: false
    })
  }

  saveFavorite = (story) => {
    let userId = this.state.user.id;
    userId = Number(userId);
    axios({
      url: `https://sports-news-777.herokuapp.com/api/stories`,
      method: "post",
      data: {
        newStory: {
          userId: userId,
          source: story.source.name,
          url: story.url,
          data: JSON.stringify(story)
        }
      }
    }).then(response => {
      let stories = this.state.stories;
      stories.push(response.data.story);
      this.setState({ stories })
    }).catch(err => 
      console.log('SaveToFavError', err)
    )
  };

  render() {

    return (

      <div>
        <NavBar isLoggedIn={this.state.isLoggedIn} user={this.state.user} hideNavBar={this.state.hideNavBar}/>
        <div className='body'>
          <Switch>
          <Route path='/login'
              render={(props) => {
                return (
                  <LogInForm isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleLogIn={this.handleLogIn} hideNavBar={this.hideNavBar}/>
                )
              }}
            />
            <Route path='/signup'
              render={(props) => {
                return (
                  <SignUpForm isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleSignUp={this.handleSignUp} hideNavBar={this.hideNavBar} />
                )
              }}
            /> 
            <Route path='/profile'
              render={(props) => {
                return (
                  <Profile isLoggedIn={this.state.isLoggedIn} user={this.state.user} showNavBar={this.showNavBar} featuredHeadlines={this.state.featuredHeadlines} secondaryHeadlines={this.state.secondaryHeadlines} saveFavorite={this.saveFavorite}/>
                )
              }}
              />
            <Route path='/logout'
              render={(props) => {
                return (
                  <LogOut isLoggedIn={this.state.isLoggedIn} handleLogOut={e => this.handleLogOut(e)} />
                )
              }}
            />
            <Route path='/'
              render={(props) => {
                return (
                  <Profile user={this.state.user} showNavBar={this.showNavBar} featuredHeadlines={this.state.featuredHeadlines} secondaryHeadlines={this.state.secondaryHeadlines} saveFavorite={this.saveFavorite}/>
                )
              }}
              />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
