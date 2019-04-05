function attachEvents() {
  const baseUrl = "https://baas.kinvey.com/appdata/kid_HkkAw4MtV/fishCatches"
  const username = "vlad";
  const password = "12345";
  const basic64Auth = btoa(username + ":" + password);
  const headers = {
      "Authorization": `Basic ${basic64Auth}`,
      "Content-Type": "application/json"
  };

  $(`.load`).on("click", loadCatches);
  $(`.add`).on("click", addCatch);
    
   function loadCatches() {
     
        let request =  {
            method: "GET",
            url: baseUrl,
            headers
        };
      
         $.get(request)
             .then((data) => {
                $(`#catches`).empty();
                return data;
             })
             .then(displayCatches);
            
        
        function displayCatches (data){
                
                for(let value of data) {
                    let id = value._id;
                    let angler = value.angler;
                    let weight = value.weight;
                    let bait = value.bait;
                    let captureTime = value.captureTime;
                    let location = value.location;
                    let species = value.species;

                   
                 let $div = $(` <div class="catch" data-id="${id}">
                <label>Angler</label>
                <input type="text" class="angler" value="${angler}"/>
                <label>Weight</label>
                <input type="number" class="weight" value="${weight}"/>
                <label>Species</label>
                <input type="text" class="species" value="${species}"/>
                <label>Location</label>
                <input type="text" class="location" value="${location}"/>
                <label>Bait</label>
                <input type="text" class="bait" value="${bait}"/>
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${captureTime}"/>
            </div>`);
            let updateButton = $(`<button class="update">Update</button>`);
            updateButton.on("click", updateCatch);
            let deleteButton = $(`<button class="delete">Delete</button>`);
            deleteButton.on("click", deleteCatch);
            $div.append(updateButton);
            $div.append(deleteButton);
            $(`#catches`).append($div);
                }
            }
        }

        function addCatch() {
             let currentCatch = {
                 angler: $("#addForm input.angler").val(), 
                 weight: $("#addForm input.weight").val(), 
                 species: $("#addForm input.bait").val(),
                 location: $("#addForm input.captureTime").val(),
                 bait: $("#addForm input.location").val(),
                 captureTime: $("#addForm input.species").val()
             };
             
               let request = {
                  method: "POST",
                  url: baseUrl,
                  headers,
                  data: JSON.stringify(currentCatch)
               };

               $.ajax(request)
                    .then(loadCatches);
        }

        function updateCatch() {
            let catchId = $(this).parent().data("id");
            let angler = $(this).parent().find(`input.angler`).val();
            let weight = $(this).parent().find(`input.weight`).val();
            let bait = $(this).parent().find(`input.bait`).val();
            let captureTime = $(this).parent().find(`input.captureTime`).val();
            let location = $(this).parent().find(`input.location`).val();
            let species = $(this).parent().find(`input.species`).val();
        
            let catchUpdate = {
                angler,
                weight,
                bait,
                captureTime,
                location,
                species
            };

            let request = {
                method: "PUT",
                url: baseUrl + "/" + catchId,
                headers,
                data: JSON.stringify(catchUpdate)
            };

            $.get(request)
                 .then(loadCatches);
        }
        
         function deleteCatch() {
            let catchId = $(this).parent().data(`id`);
            let request = {
                method: "DELETE",
                url: baseUrl + "/" + catchId,
                headers,
            };

            $.get(request)
                .then(loadCatches);
        }
}