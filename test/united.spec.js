const fs = require('fs');

module.exports ={
    'United search test' : function (browser) {
        let united = browser.page.united();

        let obj = '{';
        let length;
        let found = false;
        united.maximizeWindow()
            .navigate()
            .waitForElementVisible('body')
            .assert.title('United Airlines - Airline Tickets, Travel Deals and Flights')
            .click('@OneWayRadioButton')
            .waitForElementVisible('@FromTextBox')
            .click('@FromTextBox')
            .pause(1000)
            //.clearValue('@FromTextBox') // for some reason clearValue is not working so as a workaround i click on clear data button
            .click('@ClearButton')
            .setValue('@FromTextBox', 'LGA') //New York LGA
            .click('@ToTextBox')
            .pause(1000)
            .click('@ClearButton')
            //.clearValue('@ToTextBox')
            .setValue('@ToTextBox', 'MIA') //Miami MIA
            .click('@Dates')
            .pause(1000)
            .click('@ClearDatesButton')
            //.clearValue('@Dates')
            .setValue('@Dates', 'Aug 20')
            .pause(1000)
            .click('@Dates')
            .setValue('@Dates', '\uE004') //press tab
            .pause(1000)
            .click('@Economy')
            .pause(1000)
            .click('@EconomyOption')
            .pause(1000)
            .click('@FindFlightsButton')
            .waitForElementPresent('body', 5000)
            .waitForElementVisible('@Title', 5000)
            .click('@EconomyRestrictiveSort')
            .waitForElementPresent('@SearchResults', 5000)
            .pause(5000)

        browser.elements('css selector', '#flight-result-list-revised li.flight-block', function (items_array) {
            length = items_array.value.length;

        for (let x = 1; x <= length; x++) {
            let depart_time;
            let arrive_time;
            let stops;
            let duration;
            let price = '';
            // check if the price is not available then don't add to json object
            browser.elements('css selector', '#flight-result-list-revised > li:nth-child(' + x + ') > div.flight-block-fares-container.use-roundtrippricing.columns_4 > div.fare-option.use-roundtrippricing.fare-option-eco-basic.fare-not-available.fare-option-revised > div', results => {
                if (results.value.length > 0) {
                    /* do nothing */
                    found = true;
                } else {
                    found = false;
                }

            /* add to json object */
            if (!found) {
                browser.getAttribute('#flight-result-list-revised > li:nth-child(' + x + ') > div.flight-block-summary-container > div.lof-summary.flight-summary > div.flight-summary-top > div.flight-time.flight-time-depart', 'innerText', function (result1) {
                    depart_time = result1.value;
                    console.log('{ '+'\n'+'Depart: ' + depart_time  )
                    obj +='{Depart: ';
                    obj += depart_time;
                });
                browser.getAttribute('#flight-result-list-revised > li:nth-child(' + x + ') > div.flight-block-summary-container > div.lof-summary.flight-summary > div.flight-summary-top > div.flight-time.flight-time-arrive', 'innerText', function (result2) {
                    arrive_time = result2.value;
                    console.log(', Arrive:' + arrive_time)
                    obj +=', Arrive:';
                    obj += arrive_time;
                });
                browser.getAttribute('#flight-result-list-revised > li:nth-child(' + x + ') > div.flight-block-summary-container > div.lof-summary.flight-summary > div.flight-summary-top > div.flight-connection-container > a', 'innerText', function (result3) {
                    stops = result3.value;
                    console.log(' , Stops: ' + stops)
                    //obj2.table.push(' , Stops: ' + stops);
                    obj += ' , Stops: ';
                    obj += stops;
                });
                browser.getAttribute('#flight-result-list-revised > li:nth-child(' + x + ') > div.flight-block-summary-container > div.lof-summary.flight-summary > div.flight-summary-bottom > a', 'innerText', function (result4) {
                    duration = result4.value;
                    console.log(',Duration: ' + duration)
                    //obj2.table.push(',Duration: ' + duration );
                    obj +=',Duration: ';
                    obj += duration;
                });
                browser.getAttribute('#flight-result-list-revised > li:nth-child(' + x + ') > div:nth-child(5) div:nth-child(1) div div div:nth-child(2)', 'innerText', function (result5) {
                    price = result5.value;
                    console.log(',Price: ' + price +'\n'+'}')
                    obj +=',Price: ';
                    obj += price;
                    obj+= '}';
                });

            }
            });
        }
            obj = obj + '}'
            console.log(obj);
            let json;
            json = JSON.stringify(obj);
            console.log(json);
        })

    }
}