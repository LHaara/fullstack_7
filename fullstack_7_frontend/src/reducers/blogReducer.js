import blogs from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ',state)
  console.log(action.type)
  console.log(action)
  switch(action.type){

    case 'LIKE': {
      const old = state.filter(blogs => blogs._id !==action.updatedBlog._id)
      return [...old, { ...action.updatedBlog }]
    }
    case 'CREATE_BLOG':
      return state.concat(action.content)

    case 'INIT_BLOGS': 
      return state = action.content

    case 'DELETE_BLOG':
      const newBlogs = state.filter(blogs => blogs._id !== action.id)
      return newBlogs   
    default:
      return state

  }

}



export const createBlog = (blogText) => {
  return async (dispatch) => {
    const blog = await blogs.create(blogText)
    dispatch({
      type: 'CREATE_BLOG',
      content: blog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogs.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}


export const likeBlog = (blog) => {
  const liked = { ...blog, likes: blog.likes + 1 }
  return async (dispatch) => {
    const updatedBlog = await blogs.update(blog._id, liked)
    dispatch({
      type: 'LIKE',
      updatedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const content = await blogs.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      content
    })
  }
}

export default blogReducer
