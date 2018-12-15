const commentReducer = (state = [], action) => {
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