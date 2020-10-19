module.exports = {
    url: 'https://www.united.com',
    elements: {
        OneWayRadioButton :
            {
                selector :'#oneway'
            },
        FromTextBox :
                {
                selector: 'div #bookFlightOriginInput'
                },
        ToTextBox:
            {
                selector:'div #bookFlightDestinationInput'
            },
        Dates:
            {
                selector:'div #DepartDate'
            },
        ClassDropDown:
            {
                selector:'#cabinType > div'
            },
        FindFlightsButton:
            {
                selector: 'div.app-components-BookFlightForm-bookFlightForm__basicEconomyToggle--1VE5O > div > div:nth-child(1) > div > div > button'
            },
        ClearButton:
                {
                    selector:'div.app-components-BookFlightForm-bookFlightForm__pickupContainer--Gekxg > div > button'
                },
        ClearDatesButton:
            {
                selector:'div.app-components-BookFlightForm-bookFlightForm__bookCalendar--1f4qZ > div > button'
            },
        Economy:
                {
                    selector:'#cabinType'
                },
        EconomyOption:
            {
                selector:'#cabinType_item-0'
            },
        Title:
            {
                selector:'#fl-search-segment-header-wrap > div.lof-recap'
            },
        EconomyRestrictiveSort:
            {
                selector: '#column-ECO-BASIC'
            },
        SearchResults:
            {
                selector: '#flight-result-list-revised'
            }
    }
}