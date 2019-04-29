let url = `https://baas.kinvey.com/appdata/kid_HkkAw4MtV/countriesAndTowns`;
let headers = {"Authorization": "Basic a2lkX0hra0F3NE10VjowZTc0MDYxNzc0OTU0OWEzYWE5MjI2ZGYyOGU0ZGU4ZA=="}
function solve() {
    $(`#add`).on(`click`, addCountry);
    
    let request = {
        method: `GET`,
        url,
        headers
    }
        $(`#result`).empty();
        $.get(request)
            .then(function(data) {
               data.forEach(element => {
                let div = $(`<div></div>`);
                let updateButton = $(`<button>Update</button>`).on(`click`, updateCountry);
                let deleteButton = $(`<button>Delete</button>`).on(`click`, deleteCountry);
                let showTowns = $(`<button>Show towns</button>`).on(`click`, loadTowns);
                $(div).append($(`<label>Country:</label>`));
                $(div).append($(`<input type="text" data-id="${element._id}" value="${element.country}"></div>`));
                $(div).append(updateButton);
                $(div).append(deleteButton);
                $(div).append($(showTowns));
                $(div).append($(`<span></span>`)); 
                $(`#result`).append(div);
               });
        });
}


// Load towns
function loadTowns() {
    let countryId = $(this).prev().prev().prev().data(`id`);
    let townsSpan = $(this).next();
    $(townsSpan).empty();
    $.get({
        method: `GET`,
        url: url + `/` + countryId,
        headers
    })
    .then(function(data) {
        if(data.town != undefined) {
        let allTowns = data.town.split(`, `).filter(town => town.trim() != "");
        for(let i = 0; i < allTowns.length; i++) {
            let addCurrentTown = $(`<button>Add Town</button>`).on(`click`, addTown);
            let updateCurrentTown = $(`<button>UpdateTown</button>`).on(`click`, updateTown);
            let deleteCurrentTown = $(`<button>Delete Town</button>`).on(`click`, deleteTown);
            let currentDiv = $(`<div data-id=${i}></div>`);
            $(currentDiv).append(`<label>Town: </label>`);
            $(currentDiv).append(`<input type="text" value=${allTowns[i]}></input>`);
            $(currentDiv).append(addCurrentTown);
            $(currentDiv).append(updateCurrentTown);
            $(currentDiv).append(deleteCurrentTown);
            townsSpan.append(currentDiv);
        }
     } else {
         console.log(`No towns!`);
     }
    });
}

function addTown() {
  let townsSpan = $(this).parent().parent();
  let currentDiv = $(`<div></div>`)
  let confirmButton = $(`<button>Confirm</button>`).on(`click`, confirmNewTown);
  $(currentDiv).append(`<label>Town: </label>`);
  $(currentDiv).append(`<input type="text">`);
  $(currentDiv).append(confirmButton);
  townsSpan.append(currentDiv);

    function confirmNewTown() {
        let countryId = $(this).parent().parent().prev().prev().prev().prev().data(`id`);
        let countryName = $(this).parent().parent().prev().prev().prev().prev().val();
        let townName = $(this).prev().val();
       
        $.get({
            method: `GET`, 
            url: url + `/` + countryId,
            headers
        })
        .then(function(data) {
           let towns = data.town.split(`, `).filter(el => el.trim() != "");
           towns.push(townName);
           let result = towns.join(`, `);
          
           $.get({
            method:`PUT`,
            url: url + `/` + countryId,
            headers,
            data: {country: countryName, town: result}
           })
           .then(solve());

        });

    }
}

function updateTown() {
    let countryId = $(this).parent().parent().prev().prev().prev().prev().data(`id`); 
    let countryName = $(this).parent().parent().prev().prev().prev().prev().val();
    let townToUpdate = $(this).prev().prev().val();
    let index = $(this).parent().data(`id`);
  
    $.get({
        method: `GET`,
        url: url + `/` + countryId,
        headers
    })
    .then(function(data) {
        let updatedTowns = [];
        let townSplit = data.town.split(`, `).filter(el => el.trim() != "");
        for(let i = 0; i < townSplit.length; i++) {
            let town = townSplit[i];
            if(i == index) {
               town = townToUpdate;
            }
            updatedTowns.push(town);
        }
       let allTowns = updatedTowns.join(`, `);
        
        $.get({
            method: `PUT`,
            url: url + `/` + countryId,
            data: {country: countryName, town: allTowns},
            headers 
        });
    });


}

function deleteTown() {
  let countryId = $(this).parent().parent().prev().prev().prev().prev().data(`id`); 
  let countryName = $(this).parent().parent().prev().prev().prev().prev().val();
  let townToDelete = $(this).prev().prev().prev().val();

    $(this).parent().remove();
    $.get({
        method: `GET`,
        url: url + `/` + countryId,
        headers
    })
    .then(function(data) {
        let result = data.town.split(`, `).filter(el => el !== townToDelete).join(", ");
        $.get({
            method: `PUT`,
            data:{country: countryName, town: result},
            url: url + `/` + countryId,
            headers,
        });
    });

}
// Delete a country 
function deleteCountry() {
    let countryId = $(this).prev().prev().data(`id`);
    
    $.get({
        method: `DELETE`,
        url: url + `/` + countryId,
        headers
    })
    .then(function() {
        solve();
    });
}


// Update a country name 
function updateCountry() {
   let countryName = $(this).prev().val();
   let countryId = $(this).prev().data(`id`);
  
        $.get({
        method: `GET`,
        url: url + `/` + countryId,
        headers
    })
    .then(function(data) {
        allTowns = data.town;
        
    let countryNameUpdateRequest = {
        method: `PUT`,
        url: url + `/` + countryId,
        headers,
        data: {country: countryName, town: data.town}
    };
   
    $.get(countryNameUpdateRequest)
        .then(solve)
    });
 }

 // Adding a country
 function addCountry() {
    let currentCountry = $(`#getCountry`).val();
    let isExisting = false;
    if(currentCountry.trim() != "") {
     $.get({
         method: `GET`,
         url,
         headers
        })
        .then(function (data) {
             data.forEach(element => {
                 if(element.country == currentCountry) {
                     isExisting = true;
                 }
             });
           if(!isExisting) {
               $.get({
                 method: `POST`,
                 headers,
                 url,
                 data:{country:currentCountry}
               })
               .then(solve);
           }
           $(`#getCountry`).val("")
        });
    }
 }