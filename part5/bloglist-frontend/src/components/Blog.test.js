import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('testing blogs', () => {
  let component
  const mockAddLikes = jest.fn()
  beforeEach(() => {
    const user = {
      username: 'paquito',
      name: 'paco',
    }
    const userArray = [user]
    const blog = {
      title: 'pruebatesteo',
      author: 'paco',
      likes: 5,
      url: 'test.com',
      user: userArray
    }
    component = render(<Blog blog={blog} user={user} addLike={mockAddLikes}/>)
    component.debug()
  })
  test('checking that blog renders title and author but doesnt render likes and url', () => {
    const divIncomplete = component.container.querySelector('.incompleteBlog')
    expect(divIncomplete).not.toHaveStyle('display: none')
    const divComplete = component.container.querySelector('.completeBlog')
    expect(divComplete).toHaveStyle('display: none')
  })
  test('after you click the view button handler, the complete blog is shown, including url and likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const divComplete = component.container.querySelector('.completeBlog')
    expect(divComplete).not.toHaveStyle('display: none')
  })
  test('if you click the like button twice, the event handler is called twice', () => {
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockAddLikes.mock.calls).toHaveLength(2)
  })
})

// ...
