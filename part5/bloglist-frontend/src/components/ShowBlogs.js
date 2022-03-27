import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const ShowBlogs = ({ removeBlog, addLike }) => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedInUser)

  if (blogs.length !==0){
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog blog={blog} user={user} removeBlog={removeBlog} addLike={addLike}/>{' '}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  else return null
}

export default ShowBlogs
