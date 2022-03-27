import { React } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  //const [expanded, setExpanded] = useState(false)

  //const expandedBlog = { display: expanded ? '' : 'none' }
  //const notExpandedBlog = { display: expanded ? 'none' : '' }

  /*const toggleExpanded = () => {
    setExpanded(!expanded)
  }*/

  return (
    <div>
      <div className="incompleteBlog">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</Link>
        <br></br>
      </div>
    </div>
  )
}

export default Blog
