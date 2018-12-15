import React from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { notify } from './reducers/notificationReducer'
import { loggedUser } from './reducers/userReducer'
import { connect } from 'react-redux'
import { initializeBlogs, createBlog/* , likeBlog, deleteBlog */ } from './reducers/blogReducer'
import { initializeUsers} from './reducers/usersReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import User from './components/User'
import { Container, Form, Button, Input } from 'semantic-ui-react'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      comment: ''
    }
  }


  componentWillMount() {
    this.props.initializeUsers()
    this.props.initializeBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.loggedUser(user)
      blogService.setToken(user.token)
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }
    this.props.createBlog(blog)
    // const result = await blogService.create(blog) 
    this.props.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({
      title: '',
      url: '',
      author: ''
    })
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.notify('logged out')
    this.props.loggedUser(null)
    //this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.props.notify('Welcome back!')

      this.setState({ username: '', password: '' })

      this.props.loggedUser(user)

    } catch (exception) {
      this.props.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  userById = (id) =>{
    //console.log(this.props.users)
    if (this.props.users !== '')
      return this.props.users.find(user => user._id === id)
  }

  blogById = (id) =>{
    //console.log(this.props.users)
    if (this.props.blogs !== '') {
    /*       console.log('bloggyid')
      console.log(this.props.blogs) */
      return this.props.blogs.find(blog => blog._id === id)
    }
  }


  render() {

    /*     console.log('App_render')


    console.log(this.props.users)  */

    if (this.props.user === null || this.props.user ==='') {
      return (
        <Container>
          <div>
            <Notification notification={this.props.notification} />
            <h2>Kirjaudu sovellukseen</h2>
            <Form onSubmit={this.login}>
              <div>
                <Input
                  placeholder='käyttäjätunnus'
                  size='mini'
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleLoginChange}
                />
              </div>
              <div>
                <Input
                  placeholder='salasana'
                  size='mini'
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleLoginChange}
                />
              </div>
              <Button type="submit">kirjaudu</Button>
            </Form>
          </div>
        </Container>
      )
    }

    return (
      <Container>
        <Router>
          <div>
            <Notification notification={this.props.notification} />
            <Link to="/">blogs</Link> &nbsp;
            <Link to="/users">users</Link> &nbsp;
            {this.props.user.name} logged in <Button onClick={this.logout}>logout</Button>

            <Togglable buttonLabel='uusi blogi'>
              <BlogForm
                handleChange={this.handleLoginChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleSubmit={this.addBlog}
              />
            </Togglable>

            <div>
              <Route exact path="/" render={() => <BlogList /> } />
              <Route exact path="/users" render={() => <UserList users={this.props.users} />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <User user={this.userById(match.params.id)} />}
              />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <Blog blog={this.blogById(match.params.id)} />}
              />

            </div>

          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
/*   console.log('mapsStateToProps')
  console.log(state)  */
  return {
    user: state.user,
    notification: state.notification,
    blogs: state.blogs,
    users: state.users
  }
}



export default connect(
  mapStateToProps,
  { notify, loggedUser, initializeBlogs, createBlog, initializeUsers }
)(App)