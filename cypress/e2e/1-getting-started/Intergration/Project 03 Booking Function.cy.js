import BookingFunction from "../../../Page/BookingFunction"



// Navigate to https://techglobal-training.com/frontend/project-3
// Validate that the “One way” radio button is displayed enabled and selected by default
// Validate that the “Round trip” radio button is displayed enabled and not selected by default
// Validate that the “Cabin Class” label and dropdown are displayed
// Validate that the “From” label and dropdown are displayed
// Validate that the “To” label and dropdown are displayed
// Validate that the “Depart” label and date picker is displayed
// Validate that the “Return” label and date picker is displayed and disabled
// Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
// Validate that the “Passenger 1” category label and dropdown are displayed and “Adult (16-64)” is the default
// Validate that the “BOOK” button is displayed and enabled



const Booking = new BookingFunction()

describe('Project Booking function', () =>{
    beforeEach(() => {
        cy.visit('https://techglobal-training.com/frontend/project-3')
      })

    it('Test Case 01 - Validate the default Book your trip form', () =>{

        cy.get('[value = "One way"]').should('be.visible').and('be.enabled')
        cy.get('[value="Round trip"]').should('be.visible').and('not.selected')

        const labels = ['Cabin Class', 'From', 'To', 'Depart', 'Return', 'Number of passengers', 'Passenger 1']

        cy.get('.field > .label').each((el,index) =>{
            cy.wrap(el).should('have.text', labels[index]).should('be.visible')
            cy.get('.field:nth-child(7) [value= "1"]').should('be.visible').and('have.text', '1')
            cy.get('.field:nth-child(8) option:nth-child(1)').should('be.visible').and('have.text', "Adult (16-64)")
            Booking.bookButton().should('be.visible').and('be.enabled')
        })

    })
    
    // Navigate to https://techglobal-training.com/frontend/project-3
    // Click on the “Round trip” radio button and validate it is selected
    // Validate that the “One way” radio button is not selected
    // Validate that the “Cabin Class” label and dropdown are displayed
    // Validate that the “From” label and dropdown are displayed
    // Validate that the “To” label and dropdown are displayed
    // Validate that the “Depart” label and date picker is displayed
    // Validate that the “Return” label and date picker is displayed
    // Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
    // Validate that the “Passenger 1” label and dropdown are displayed and “Adult (16-64)” is the default
    // Validate that the “BOOK” button is displayed and enabled

it('Test Case 02 -Validate the Book your trip form when Round Trip is Selected', () =>{

    const labels = ['Cabin Class', 'From', 'To', 'Depart', 'Return', 'Number of passengers', 'Passenger 1']

    cy.get(':nth-child(2) > .mr-1').click().should('be.visible').and('be.checked')
    cy.get('[value = "One way"]').should('not.checked')

    cy.get('.field > .label').each((el,index) =>{
        cy.wrap(el).should('have.text', labels[index]).should('be.visible')
        cy.get('.field:nth-child(7) [value= "1"]').should('be.visible').and('have.text', '1')
        cy.get('.field:nth-child(8) option:nth-child(1)').should('be.visible').and('have.text', "Adult (16-64)")
        Booking.bookButton().should('be.visible').and('be.enabled')
    
    })

})
/*
Navigate to https://techglobal-training.com/frontend/project-3
Select the “One way” radio button
Select “Business” for the “Cabin Class” dropdown
Select “Illinois” for the “From” dropdown
Select “Florida” for the “To” dropdown
Select the next week for the ”Depart”
Select “1” for the “Number of passengers” dropdown
Select “Senior (65+)” for the Passenger 1 dropdown
Click on the “BOOK” button
Validate the booking information displayed below
DEPART
IL to FL
{dynamic date}
Number of passengers: 1
Passenger 1: Senior (65+)
Cabin Class: Business

*/


it('Test Case 03-Validate the booking for 1 passenger and one way', () =>{
    const testdata = ['Business', 'Illinois', 'Florida', '1', 'Senior (65+)']

    cy.get('[value = "One way"]').should('be.checked')
    Booking.selectors().each((el, index) =>{
        cy.wrap(el).select(testdata[index])
    })
    Booking.oneWayButton().click()

})

})