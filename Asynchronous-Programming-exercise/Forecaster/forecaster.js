function attachEvents() {
   
    $(`#submit`).on(`click`, getWeather);
    let baseUrl = `https://judgetests.firebaseio.com/`;

    function getWeather() {
       let currentUrl = baseUrl + `locations.json`;
        $.get(currentUrl) 
                .then(onResolve)
                .catch(function() {
                    console.log("Fuck off");
                })

        function onResolve(data) {
            let requestedLocationName = $(`#location`).val();
            let code;
             for(let value of data) {
                if(requestedLocationName == value.name) {
                    code = value.code;
                    break;
                }
             }

            if(code != undefined) {
               
                let todayUrl = baseUrl + `forecast/today/${code}.json`;
                $.get(todayUrl)
                    .then(currentConditions);
                    

                let threeDaysUrl = baseUrl + `forecast/upcoming/${code}.json`;
                $.get(threeDaysUrl)
                    .then(threeDayForecast);
            } else {
                $(`#forecast`).show();
                $(`#current .label`).text("ERROR");
                $(`#upcoming .label`).text("ERROR");
            }
        }

            function currentConditions(data) {
                $(`#forecast`).show();
                let currentLocation = data.name;
                let currentCondition = data.forecast.condition;
                let high = data.forecast.high;
                let low = data.forecast.low;
               

                let current = $(`#current`);
                let conditionSymbol = checkSymbol(currentCondition);
                let conditionSpan = $(`<span class="condition symbol">${conditionSymbol}</span>`);
                let span = $(`<span class="condition"></span>`);

                span.append($(`<span class="forecast-data">${currentLocation}</span>`));
                span.append($(`<span class="forecast-data">${low}&#176/${high}&#176</span>`));
                span.append($(`<span class="forecast-data">${currentCondition}</span>`));
                current.append(conditionSpan);
                current.append(span);
            }

            function threeDayForecast(data) {
                    for(let value of data.forecast) {
                    let currentCondition = checkSymbol(value.condition);
                    let low = value.low;
                    let high = value.high;
                let span = $(`<span class="upcoming"></span>`);
                span.append($(`<span class="symbol">${currentCondition}</span>`));
                span.append($(`<span class="forecast-data">${low}&#176/${high}&#176</span>`));
                span.append($(`<span class="forecast-data">${value.condition}</span>`));
                $(`#upcoming`).append(span);
                    }
            }

           

            function checkSymbol(currentCondition) {
                if(currentCondition == "Sunny") {
                    return `&#x2600`; 
                } else if (currentCondition === "Partly sunny") {
                    return `&#x26C5`;
                } else if (currentCondition === "Overcast") {
                    return `&#x2601`;
                } else if (currentCondition === "Rain") {
                    return `&#x2614`;
                }
            }

            
    }
}