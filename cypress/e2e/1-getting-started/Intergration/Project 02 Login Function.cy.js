import LoginPage from "../../../Page/LoginPage"


/*
Navigate to https://techglobal-training.com/frontend/project-2
Validate that the username input box is displayed
Validate that the username input box is not required
Validate that the label of the username input box is “Please enter your username”
Validate that the password input box is displayed
Validate that the password input box is not required
Validate that the label of the password input box is “Please enter your password”
Validate the “LOGIN” button is displayed
Validate the “LOGIN” button is clickable
Validate that the button text is “LOGIN”
Validate the “Forgot Password?” link is displayed
Validate that the “Forgot Password?” link is clickable
Validate that the link text is “Forgot Password?”

*/
const loginPage = new LoginPage()

describe('Project Login Function', () => {

    it('Test Case 01- validate login form', () => {
        cy.visit('https://techglobal-training.com/frontend/project-2')
        loginPage.getUsernameField().should('be.visible').and('not.have.attr', 'required')
        cy.get(':nth-child(2) > label').should('have.text', 'Please enter your username')
        loginPage.getPasswordField().should('be.visible').and('not.have.attr', 'required')
        cy.get(':nth-child(3) > label').should('have.text', 'Please enter your password')
        loginPage.getLoginButton().should('be.visible').and('be.enabled').and('have.text', 'LOGIN')
        loginPage.forgotPassword().should('be.visible').and('have.text', 'Forgot Password?').click()



    })

    // Navigate to https://techglobal-training.com/frontend/project-2
    // Enter the username as “TechGlobal”
    // Enter the password as “Test1234”
    // Click on the “LOGIN” button
    // Validate the success message is displayed as “You are logged in”
    // Validate the logout button displayed with the text “LOGOUT”


    it('Test Case 02-Validate login', () => {
        cy.visit('https://techglobal-training.com/frontend/project-2')

        loginPage.userLogin('TechGlobal', 'Test1234')
        cy.get('#success_lgn').should('be.visible')
        cy.get('#logout').should('be.visible').and('have.text', 'LOGOUT')

    })

    // Navigate to https://techglobal-training.com/frontend/project-2
    // Enter the username as “TechGlobal”
    // Enter the password as “Test1234”
    // Click on the “LOGIN” button
    // Click on the “LOGOUT” button
    // Validate that the login form is displayed

    it('Test Case 03-Validate Logout', () => {
        cy.visit('https://techglobal-training.com/frontend/project-2')
        loginPage.userLogin('TechGlobal', 'Test1234')
        cy.get('#logout').click()
        cy.get('.is-size-3').should('be.visible')

    })

    // Navigate to https://techglobal-training.com/frontend/project-2
    // Click on the “Forgot Password?” link
    // Validate that the modal heading “Reset Password” is displayed
    // Validate that the close button is displayed
    // Validate that the email input box is displayed
    // Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
    // Validate the “SUBMIT” button is displayed
    // Validate the “SUBMIT” button is clickable
    // Validate that the button text is “SUBMIT”

    it('Test Case 04-Validate Forgot Password', () => {
        cy.visit('https://techglobal-training.com/frontend/project-2')
        loginPage.forgotPassword().click()
        cy.get('#sub_heading, .delete, #email').should('be.visible')
        cy.get('#email').parent().should('have.text', "Enter your email address and we'll send you a link to reset your password. ").should('be.visible').click()
        loginPage.submittButton().should('be.visible').and('have.text', 'SUBMIT')

    })

    // Navigate to https://techglobal-training.com/frontend/project-2
    // Click on the “Forgot Password?” link
    // Validate that the “Reset Password” modal is displayed
    // Click on the close button
    // Validate that the “Reset Password” modal is closed

    it('Test Case 05- Validate reset password madal close button', () => {
        cy.visit('https://techglobal-training.com/frontend/project-2')
        loginPage.forgotPassword().click()
        cy.get('#modal_title').should('be.visible').and('have.text', 'Reset Password')
        cy.get('.delete').click()
        cy.get('#confirmation_message').should('not.exist')

    })

    // Navigate to https://techglobal-training.com/frontend/project-2
    // Click on the “Forgot Password?” link
    // Enter an email
    // Click on the “SUBMIT” button
    // Validate the form message “A link to reset your password has been 
    // sent to your email address.” is displayed under the “SUBMIT” button

    it('Test Case 06- Validate the reset password form submission', () => {
        cy.visit('https://techglobal-training.com/frontend/project-2')
        loginPage.forgotPassword().click()
        cy.get('#email').type('ivan.garcia@dei.com')
        loginPage.submittButton().click()
        cy.get('#confirmation_message').should('be.visible').and('have.text', 'A link to reset your password has been sent to your email address.')


    })

    const testData = [
        {
            describe: 'Validate the failure message is displayed as “Invalid Username entered!” above the form',
            error: 'Invalid Username entered!',
            empty: true

        },

        {
            describe: 'Validate the failure message is displayed as “Invalid Username entered!” above the form',
            username: 'John',
            password: 'Test1234',
            error: 'Invalid Username entered!'

        },

        {

            describe: 'Validate the failure message is displayed as “Invalid Password entered!” above the form',
            username: 'TechGlobal',
            password: '1234',
            error: 'Invalid Password entered!'

        },

        {
            describe: 'Validate the failure message is displayed as “Invalid Username entered!” above the form',
            username: 'John',
            password: '1234',
            error: 'Invalid Username entered!'
        }

    ]
    testData.forEach((test, index) => {

        it(`Test Case 0${index + 7} -${test.describe}`, () => {
            cy.visit('https://techglobal-training.com/frontend/project-2')
            if (test.empty) {
                loginPage.getLoginButton().click()
                cy.get('#error_message').contains(test.error)
            }
            else {
                loginPage.userLogin(test.username, test.password)
                cy.get('#error_message').contains(test.error)

            }

        })
    })



})