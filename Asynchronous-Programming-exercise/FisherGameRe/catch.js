function attachEvents() {
const baseUrl = "https://baas.kinvey.com/appdata/kid_HkkAw4MtV/fishCatches"
  const username = "vlad";
  const password = "12345";
  const basic64Auth = btoa(username + ":" + password);
  const headers = {
      "Authorization": `Basic ${basic64Auth}`,
      "Content-Type": "application/json"
  };


$(`.load`).on(`click`, function() {
    $(`#catches`).empty();
    let request = {
        method: `GET`,
        url: baseUrl,
        headers
    };

    $.get(request)
        .then(function(data) {
            console.log(data);
            for(let value of data) {
            let $div = $(` <div class="catch" data-id="${value._id}">
                <label>Angler</label>
                <input type="text" class="angler" value="${value.angler}"/>
                <label>Weight</label>
                <input type="number" class="weight" value="${value.weight}"/>
                <label>Species</label>
                <input type="text" class="species" value="${value.species}"/>
                <label>Location</label>
                <input type="text" class="location" value="${value.location}"/>
                <label>Bait</label>
                <input type="text" class="bait" value="${value.bait}"/>
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${value.captureTime}"/>
            </div>`);
            let updateButton = $(`<button class="update">Update</button>`);
            updateButton.on("click", updateCatch);
            let deleteButton = $(`<button class="delete">Delete</button>`);
            deleteButton.on("click", deleteCatch);
            $div.append(updateButton);
            $div.append(deleteButton);
            $(`#catches`).append($div);
            }
        });
});

    function updateCatch() {
        let id = $(this).parent().data(`id`);
        let angler = $(this).parent().find(`input.angler`).val();
        let weight = $(this).parent().find(`input.weight`).val();
        let species = $(this).parent().find(`input.species`).val();
        let location = $(this).parent().find(`input.location`).val();
        let bait = $(this).parent().find(`input.bait`).val();
        let captureTime = $(this).parent().find(`input.captureTime`).val();

        let updateRequest = {
            method: `PUT`,
            url: baseUrl + `/${id}`,
            data: JSON.stringify({
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            }),
            headers
        }
        $.ajax(updateRequest);
    }

    function deleteCatch() {
        let id = $(this).parent().data(`id`);
        let deleteRequest = {
            method: `DELETE`,
            url: baseUrl + `/${id}`,
            headers
        }
        $.ajax(deleteRequest);
    }

   $(`#aside`).find(`button.add`).on(`click`, function() {
       console.log("OK");
    
        let currentCatch = {
            angler: $("#addForm input.angler").val(), 
            weight: $("#addForm input.weight").val(), 
            species: $("#addForm input.species").val(),
            location: $("#addForm input.location").val(),
            bait: $("#addForm input.bait").val(),
            captureTime: $("#addForm input.captureTIme").val()
        };
        
          let request = {
             method: "POST",
             url: baseUrl,
             headers,
             data: JSON.stringify(currentCatch)
          };
          $.ajax(request);
   });
}
