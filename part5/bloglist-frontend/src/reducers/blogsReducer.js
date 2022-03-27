const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'SET_BLOG':
    return state.concat(action.blog)
  default:
    return state
  }
}

export const initBlogs = (blogs) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const setBlog = (blog) => {
  return async dispatch => {
    dispatch({
      type: 'SET_BLOG',
      blog
    })
  }
}

export default blogsReducer