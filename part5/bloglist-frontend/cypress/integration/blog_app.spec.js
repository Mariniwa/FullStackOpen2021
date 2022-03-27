describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Paco Bueno',
      username: 'paco',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login Form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.get('#username')
    cy.get('#password')
    cy.get('#loginButton')
  })
  it('login successful', function () {
    cy.get('#username').type('paco')
    cy.get('#password').type('12345')
    cy.get('#loginButton').click()

    cy.contains('login successful!')
  })
  it('login failed', function () {
    cy.get('#username').type('paco')
    cy.get('#password').type('wrong')
    cy.get('#loginButton').click()

    cy.contains('Wrong credentials')
  })
})

describe('when logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Paco Bueno',
      username: 'paco',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.get('#username').type('paco')
    cy.get('#password').type('12345')
    cy.get('#loginButton').click()
  })
  describe('when you create a blog', function () {
    beforeEach(function () {
      cy.get('#showFormButton').click()
      cy.get('#title').type('newTitleCypress')
      cy.get('#author').type('newAuthorCypress')
      cy.get('#url').type('newUrlCypress')
      cy.get('#submitButton').click()
    })
    it('it is correctly created and added to the list of blogs', function () {
      cy.contains('newTitleCypress')
      cy.contains('newAuthorCypress')
    })
    it('users can like a blog', function () {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })
    it('user who created the blog can delete it', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.should('not.contain', 'newTitleCypress')
    })
    it.only('and you create another blog, the arrays are ordered in descending order according to the likes', function () {
      cy.get('#showFormButton').click()
      cy.get('#title').type('anotherNewTitleCypress')
      cy.get('#author').type('anotherNewAuthorCypress')
      cy.get('#url').type('anotherNewUrlCypress')
      cy.get('#submitButton').click()

      cy.contains('newTitleCypress').contains('view').click()
      cy.contains('like').click()
      cy.contains('hide').click()

      //Click every button to reveal likes
      cy.get('#expandButton').each((button) => cy.wrap(button).click())
      //Store the likes in the order they appear inside an array
      let likesArray = []
      cy.get('#blogLikes').then((blogLikes) => {
        for (let i = 0; i < blogLikes.length; i++) {
          likesArray[i] = Number(blogLikes[i])
        }
      })
      //Order the array
      const orderedArray = likesArray.sort((a,b) => b-a)
      //Expect the ordered array to be equal to the previous array
      expect(likesArray).to.deep.equal(orderedArray)
    })
  })
})
