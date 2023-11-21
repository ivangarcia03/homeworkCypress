class BookingFunction {
    
    oneWayButton(){
        return cy.get('.radio > input').eq(0)

}
   bookButton(){
     return cy.get('.Button_c_button__TmkRS')
   }

   selectors(){
    return cy.get('.field .select').children()
   }
   depart(){
    return cy.get(':nth-child(5) > .control > .react-datepicker-wrapper > .react-datepicker__input-container > input')
   }
}

export default BookingFunction