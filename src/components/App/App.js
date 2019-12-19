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
import ChangePassword from '../ChangePassword/ChangePassword'
import Profile from '../Profile/Profile'
import Home from '../Home/Home'
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
    favoriteHeadlines: [],
    hideNavBar: false,
    stories: [],
    loading: false,
    updateUser: {},
    id: ''
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
      let favoriteHeadlines = articles 
      this.setState({        
        headlines: articles,
        featuredHeadlines,
        secondaryHeadlines,
        favoriteHeadlines
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
    //e.preventDefault()
    window.localStorage.clear()
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false,
      user: null
    })
    this.props.history.push('/login')
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
    this.setState({
      loading: true
    })
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
          user: response.data.user,
          loading: false
        })
        const location = {
          pathname: '/',
          state: { fromDashboard: true }
        }
        this.props.history.replace(location)
      })
      .catch( err => { 
        console.log('LoginError', err)
        this.setState({
          loading: false
        })
      })
  }

  deleteUser = () => {
    console.log('deleteUser')
    console.log(this.state.user.id)
  axios({
      url: `https://sports-news-777.herokuapp.com/api/users/${this.state.user.id}`,
      method: 'delete'
    })
      .then(response => {
        // this.setState({ users: response.data.users })
        this.setState({deleted:true})
      })
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
          data: story
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


  onHandleChangeUser = e => {
    let updateUser = {
      [e.target.name]: e.target.value
    };
    console.log(updateUser.password);
    this.setState((prevState, currentState) => ({
      updateUser: { ...prevState.updateUser, ...updateUser }
    }));
    
  };

  //update user
  updateUser = e => {
    e.preventDefault();
    console.log(this.state.user)
    let id = this.state.user.id;
    axios({
      url: `https://sports-news-777.herokuapp.com/api/users/${id}`,
      method: "put",
      data: { updateUser: this.state.updateUser }
    }).then(response => {
      
      this.setState(prevState => ({
        updateUser: [...prevState.updateUser, response.data.updateUser]
      }));
    });

    console.log('logout')
    this.handleLogOut()
  };


  getStories = e => {
    console.log('favorite stories')
    // let id = this.state.id;
    
    axios({
      url: `https://sports-news-777.herokuapp.com/api/users/${this.state.user.id}`,
      method: "get"
    }).then(response => {
      let Stories = response.data.Stories.map( (story, index) => {
        story.source = JSON.parse(story.data)
        return story
      })
      this.setState({
        stories: Stories
      });
      // console.log(response.data.instructor.quizzes)
      // console.log('quizzes', this.state.quizzes)
    });
  };

  deleteStory = (id) => {
    console.log('deleteStoryid', id)
    console.log('button works')
  axios({
      url: `https://sports-news-777.herokuapp.com/api/stories/${id}`,
      method: 'delete'
    })
      .then(response => {
        
        this.setState({deleted:true})
      })
};



  render() {
    
    return (

      <div>
        <NavBar isLoggedIn={this.state.isLoggedIn} 
        user={this.state.user} 
        hideNavBar={this.state.hideNavBar}/>
        <div className='body'>
          <Switch>
          <Route path='/login'
              render={(props) => {
                return (
                  <LogInForm isLoggedIn={this.state.isLoggedIn} 
                  handleInput={this.handleInput} handleLogIn={this.handleLogIn} 
                  hideNavBar={this.hideNavBar} loading={this.state.loading}/>
                )
              }}
            />
            <Route path='/signup'
              render={(props) => {
                return (
                  <SignUpForm isLoggedIn={this.state.isLoggedIn} 
                  handleInput={this.handleInput} 
                  handleSignUp={this.handleSignUp} 
                  hideNavBar={this.hideNavBar} />
                )
              }}
            /> 
            <Route path='/profile'
              render={(props) => {
                return (
                  <Profile 
                  isLoggedIn={this.state.isLoggedIn} 
                  user={this.state.user}
                  getStories={this.getStories}
                  stories={this.state.stories} 
                  showNavBar={this.showNavBar} 
                  saveFavorite={this.state.saveFavorite}
                  deleteStory={this.deleteStory}
                  />
                )
              }}
              />
            <Route path='/logout'
              render={(props) => {
                return (
                  <LogOut isLoggedIn={this.state.isLoggedIn} 
                  handleLogOut={e => this.handleLogOut(e)} />
                )
              }}
            />
            <Route path='/updateUser'
              render={(props) => {
                return (
                  <ChangePassword isLoggedIn={this.state.isLoggedIn} 
                  handleInput={this.handleInput} handleSignUp={this.handleSignUp} 
                  hideNavBar={this.hideNavBar} onHandleChangeUser={this.onHandleChangeUser}  
                  updateUser={this.updateUser} />
                )
              }}
            /> 
            <Route path='/'
              render={(props) => {
                return (
                  <Home user={this.state.user} 
                  showNavBar={this.showNavBar} 
                  featuredHeadlines={this.state.featuredHeadlines} 
                  secondaryHeadlines={this.state.secondaryHeadlines} 
                  saveFavorite={this.saveFavorite}/>
                )
              }}
              />
          </Switch>
        </div>
        <footer className='footer'>
              <button onClick={this.deleteUser}>Unsubscribe</button>
        </footer>
      </div>
    )
  }
}

export default withRouter(App)
