// Fixing load button
let url = "https://phonebook-70f4e.firebaseio.com/.json";
function solveLoad() {
        
        $.ajax({
            method: "GET", 
            url,
            success: onLoadResponse,
        });
      
        function onLoadResponse(data) {
            let ul = $("#phonebook");
            ul.empty();
                Object.entries(data).forEach(element => {
                let deleteButton = $(`<button>Delete</button>`).on("click", remove);
                let name = element[1].person;
                let phone = element[1].phone;
                let li = $(`<li>${name}: ${phone}</li>`);
                li.append(deleteButton);
                ul.append(li);
            });

            function remove(e) {
                let parent = e.target.parentNode;
                let nameToDelete = parent.textContent.split(":")[0].trim();
                $.ajax({
                    method: "GET", 
                    url,
                    success: onLoadRemove,
                });
              
                function onLoadRemove(currentData) {
                            for(let [key, obj] of Object.entries(currentData)) {
                               
                                if(obj.person.trim() == nameToDelete) {
                                    let currentURL = `https://phonebook-70f4e.firebaseio.com/${key}/.json`;
                                    $.ajax({
                                        method: "DELETE",
                                        url: currentURL,
                                    });
                                    break;
                                }
                            }
                    }
               parent.remove();
            }
        }
}


// Fixing create button
function solveCreate() {
     let person = $(`#person`).val();
     let phone = $(`#phone`).val();
        if(person !== "" && phone !== "") {
     let obj = {
        person: person,
        phone: phone,
     };
        $.ajax({
            method: "POST",
            url,
            data: JSON.stringify(obj),
            success: (data) => console.log(data),
        });
         $(`#person`).val("");
         $(`#phone`).val("");
    }
}