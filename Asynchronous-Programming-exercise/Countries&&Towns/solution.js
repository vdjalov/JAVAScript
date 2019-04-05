function solve() {
   const baseUrl = "https://baas.kinvey.com/appdata/kid_HkkAw4MtV"
   const endPoint = "/countriesAndTowns";
   const username = "vlad";
   const password = "12345";
   const basic64Auth = btoa(username + ":" + password);
   const headers = { "Authorization": `Basic ${basic64Auth}`,
                     "Content-Type": "application/json"};


    $(`#addCountry`).on("click", addCountry);
    loadCountries();
        function loadCountries() {
            let request = {
                method: "GET",
                url: baseUrl + endPoint,
                headers
            };

            $.get(request)
                .then((data) => {
                    $(`#listOfCountries`).empty();
                    return data;
                })
                .then(displayCountries);

                    function displayCountries(data) {
                        for(let value of data) {
                           let updateButton =  $(`<button>Update Country</button>`);
                           let deleteButton =  $(`<button>Delete Country</button>`);
                           let showTownsButton = $(`<button>Show Towns</button>`);
                         
                           $(`#listOfCountries`).append($(`<label>Country Name</label>`));
                            let input = 
                            $(`<div data-id="${value._id}">
                                <input type="text" id="country" value="${value.country}"></input>
                            </div>`);
                             input.append($(`</br>`));
                             input.append(updateButton);
                             input.append(deleteButton);
                             input.append(showTownsButton);
                             input.append($(`</br>`));
                            $(`#listOfCountries`).append(input);
                            updateButton.on("click", updateCountry);
                            deleteButton.on("click", deleteCountry);
                            showTownsButton.on("click", loadTowns);
                        }

                        
                    }
        }

                    async function loadTowns() {
                        let parent = $(this).parent();
                        let id = $(this).parent().data("id");
                            let request = {
                                method: "GET",
                                url: baseUrl + endPoint + "/" + id,
                                headers
                            }

                            $.get(request)
                             .then(displayTowns);
                             
                               function displayTowns(data) {
                                let townSplit = data.town.split(",");
                                    for(let value of townSplit) {
                            let $deleteTownButton = $(`<button id="deleteTown">DeleteTown</button>`);
                            let $editTownButton = $(`<button id="deleteTown">UpdateTown</button>`);
                            let $addTownButton = $(`<button id="deleteTown">AddTown</button>`);
                            parent.append($(`<div id="allTowns">
                                        <label>Town</label>
                                        <input id="townName" value="${value}"></input>
                                        </div>`));
                                        parent.append($editTownButton);
                                        parent.append($deleteTownButton);
                                        parent.append($addTownButton);
                                        parent.append($(`</br>`));
                                        $editTownButton.on("click", updateTown);
                                        $deleteTownButton.on("click", deleteTown);
                                        $addTownButton.on("click", addTown);
                                    }
                           
                                        function addTown() {
                                        let $confirmTownButton = $(`<button id="deleteTown">Confirm Town</button>`);
                                        parent.append($(`<div id="allTowns">
                                        <label>Town</label>
                                        <input id="townName"></input>
                                        </div>`));
                                        parent.append($confirmTownButton);
                                        parent.append($(`</br>`));
                                        $confirmTownButton.on("click", updateTown);
                                        }
                                
                                        function updateTown() {
                                            let allTowns = $(`#allTowns input`);
                                            let towns = [];
                                            
                                               for(let value of allTowns) {
                                                  towns.push($(value).val());
                                               } 
                                    
                                               let result = towns.join(",");
                                               let update = {
                                                   country: data.country,
                                                   town: result
                                               };

                                              let request ={
                                                  method: "PUT",
                                                  url: baseUrl + endPoint + "/" + id,
                                                  data:JSON.stringify(update),
                                                  headers
                                              }

                                              $.get(request)
                                                .then(loadCountries);
                                        }

                                        function deleteTown() {
                                            
                                            let allTowns = $(`#allTowns input`);
                                            let currentTown = $(`#townName`).val();
                                            
                                            let towns = [];
                                               for(let value of allTowns) {
                                                if($(value).val() !== currentTown) {
                                                    towns.push($(value).val());
                                                }
                                               } 
                                    
                                               let result = towns.join(",");
                                               let update = {
                                                   country: data.country,
                                                   town: result
                                               };

                                              let request ={
                                                  method: "PUT",
                                                  url: baseUrl + endPoint + "/" + id,
                                                  data:JSON.stringify(update),
                                                  headers
                                              }

                                              $(this).parent().remove();
                                              $.get(request)
                                                .then(loadCountries);
                                        }
                                    
                        }
                    }          

                    function updateCountry() {
            let id = $(this).parent().data("id");
            let country = $(this).parent().find(`#country`).val();
                        
                let request = {
                    method: "GET",
                    url: baseUrl + endPoint + "/" + id,
                    headers
                };

                $.get(request)
                    .then((data) => {
                        let newCountry = {
                            country,
                            town:data.town
                        }
            
                        let request = {
                            method: "PUT",
                            url: baseUrl + endPoint + "/" + id,
                            headers,
                            data: JSON.stringify(newCountry)
                        }
                        $.get(request)
                            .then(loadCountries);
                    });
           
                    }


                    function deleteCountry() {
            let id = $(this).parent().data("id");
            let request = {
                method: "DELETE",
                url:baseUrl + endPoint + "/" + id,
                headers
            };

            $.get(request)
                .then(loadCountries);
                    }

                    function addCountry() {
            let countryName = $(`#countryName`).val();
            let countryTown = $(`#countryTown`).val();
           
            let country = {
                country: countryName,
                town: countryTown
            }

            let request = {
                method: "POST",
                url: baseUrl + endPoint,
                data: JSON.stringify(country),
                headers
            }

            $.get(request)
                .then(loadCountries);

                    }

}


