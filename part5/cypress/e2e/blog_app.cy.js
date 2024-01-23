describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Test User',
      username: 'testuser',
      password: 'testuser'
    }
    const user2 = {
      name: 'Test User 2',
      username: 'testuser2',
      password: 'testuser2'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testuser')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testuser' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-blog-button').click()

      cy.contains('Test Blog')
      cy.contains('Test Author')
      cy.contains('view')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'Test Blog',
          author: 'Test Author',
          url: 'http://testurl.com'
        }
        cy.createBlog(blog)
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()

        cy.contains('likes 1')
      })

      it('it can be removed by the user who added the blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.should('not.contain', 'Test Blog')
        cy.should('not.contain', 'view')
      })

      it('it cannot be removed by another user', function() {
        cy.contains('logout').click()
        cy.login({ username: 'testuser2', password: 'testuser2' })
        cy.contains('view').click()
        cy.should('not.contain', 'remove')
      })
    })
  })

})