function attachEvents() {
    
    Promise.all([$.get("./contact-info.hbs"), $.get("./contact-list.hbs")])
        .then(function([contactListPartialInfo, contactList]) { 
            Handlebars.registerPartial(`contactInfo`, contactListPartialInfo);
            let template = Handlebars.compile(contactList);
            let result = template({
                contacts
            });
            
            $(`body`).append(result);
        })

}


function showDetails(id) {
    $(`#${id}`).toggle();
}