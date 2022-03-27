import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogsForm from './BlogsForm'

describe('testing blog forms', () => {
  let component
  const mockAddBlog = jest.fn()
  component = render(<BlogsForm addBlog={mockAddBlog} />)
  test('testing that the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    fireEvent.change(title, {
      target: { value: 'titleOfTheTest' },
    })
    fireEvent.change(author, {
      target: { value: 'authorOfTheTest' },
    })
    fireEvent.change(url, {
      target: { value: 'urlOfTheTest' },
    })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    expect(mockAddBlog.mock.calls).toHaveLength(1)
    expect(mockAddBlog.mock.calls[0][0].title).toBe('titleOfTheTest')
    expect(mockAddBlog.mock.calls[0][0].author).toBe('authorOfTheTest')
    expect(mockAddBlog.mock.calls[0][0].url).toBe('urlOfTheTest')
  })
})
