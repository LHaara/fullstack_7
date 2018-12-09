import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { notify } from './reducers/notificationReducer'
import { loggedUser } from './reducers/userReducer'
import { connect } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
/*      blogs: [],
       user: null, */
      username: '',
      password: '', 
      title: '',
      author: '',
      url: ''/* ,
      notification: null */
    }
  }


  componentWillMount() {
/*         blogService.getAll().then(blogs =>
      this.setState({ blogs })
    ) */
    this.props.initializeBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.loggedUser(user)
      blogService.setToken(user.token)
    }

  } 


  like = (id) => async () => {

    const liked = this.props.blogs.find(b=>b._id===id)

    this.props.likeBlog(liked)

/*     const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated) */

    this.props.notify(`you liked '${liked.title}' by ${liked.author}`)

/*     this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    }) */
  }

  remove = (id) => async () => {
    const deleted = this.props.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if ( ok===false) {
      return
    }
    this.props.deleteBlog(id)

    //await blogService.remove(id)
    this.props.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
/*     this.setState({
      blogs: this.state.blogs.filter(b=>b._id!==id)
    }) */
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

  render() {
    console.log('App_render')

    //console.log(this.state.blogs)
   // console.log(this.props.blogs) 

    if (this.props.user === null || this.props.user ==='') {
      return (
        <div>
          <Notification notification={this.props.notification} />
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsInOrder = this.props.blogs.sort(byLikes)

    return (
      <div>
        <Notification notification={this.props.notification} />

        {this.props.user.name} logged in <button onClick={this.logout}>logout</button>

        <Togglable buttonLabel='uusi blogi'>
          <BlogForm 
            handleChange={this.handleLoginChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleSubmit={this.addBlog}
          />
        </Togglable>

        <h2>blogs</h2>
        {blogsInOrder.map(blog => 
          <Blog 
            key={blog._id} 
            blog={blog} 
            like={this.like(blog._id)}
            remove={this.remove(blog._id)}
            deletable={blog.user === undefined || blog.user.username === this.props.user.username}
          />
        )}
      </div>
    );
  }
}

 const mapStateToProps = (state) => {
/*   console.log('mapsStateToProps')
  console.log(state)  */
  return {
    user: state.user,
    notification: state.notification,
    blogs: state.blogs
  }
} 



export default connect(
  mapStateToProps,
  { notify, loggedUser, initializeBlogs, createBlog, likeBlog, deleteBlog }
)(App)