function attachEvents() {

    $(`#submit`).on(`click`,getLocation);
        function getLocation() {
        let code = -1;    
        let locationName = $(`#location`).val();  
        let locationsUrl = `https://judgetests.firebaseio.com/locations.json`;
        
            let locationRequest = {
                method: `GET`, 
                url:locationsUrl,
            };

            $.get(locationRequest)
                .then(function(data) {
                    data.forEach(element => {
                        if(element.name == locationName) {
                            code = element.code;
                        }
                    });
                })
                .then(function() {
                    let currentWeatherRequest = {
                        method: `GET`,
                        url: `https://judgetests.firebaseio.com/forecast/today/${code}.json`
                    };
                    // Today 
                     $.get(currentWeatherRequest) 
                        .then(function(data) {
                            if(code != -1) {
                            $(`#forecast`).show();
                        let condition = checkCondition(data.forecast.condition);
                        $(`#current`).append(`<span class="condition symbol">${condition}</span>`);
                        let conditionSpan = $(`<span class="condition"></span>`);
                        conditionSpan.append($(`<span class="forecast-data">${data.name}</span>`));
                        conditionSpan.append($(`<span class="forecast-data">
                            ${data.forecast.low}&#176;/${data.forecast.high}&#176;</span>`));
                        conditionSpan.append($(`<span class="forecast-data">
                            ${data.forecast.condition}</span>`));
                        $(`#current`).append(conditionSpan);
                            }
                        })
                        .catch(displayError);
                    
                    // Three days    
                    let threeDayRequest = {
                        method: `GET`,
                        url: `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`
                    }    
                        $.get(threeDayRequest)
                            .then(function(data) {
                                if(code != -1) {
                                    data.forecast.forEach(element => {
                                        let upcomingSpan = $(`<span class="upcoming"></span>`);
                                        let symbol = checkCondition(element.condition);
                                        upcomingSpan.append($(`<span class="symbol">${symbol}</span>`));
                                        upcomingSpan.append($(`<span class="forecast-data">
                                                ${element.low}&#176;/${element.high}&#176;</span>`));
                                        upcomingSpan.append($(`<span class="forecast-data">${element.condition}</span>`));
                                        $(`#upcoming`).append(upcomingSpan);
                                    });
                                }
                            })
                            .catch(displayError);
                })
                .catch(displayError);
        }

        function checkCondition(condition) {
            if(condition == `Sunny`) {
                return `&#x2600;`;
            } else if(condition == `Partly sunny`) {
                return `&#x26C5;`;
            } else if(condition == `Overcast`) {
                return `&#x2601;`;
            } else if(condition == `Rain`) {
                return `&#x2614;`;
            } 
        }

        function displayError(error) {
            $(`#forecast`).show();
            document.querySelector('#current > div').textContent = "Error";
            document.querySelector('#upcoming > div').textContent = "Error";
        }





}