function solution() {

    $.get(`./template.hbs`)
        .then(parseAndAppend);

    function parseAndAppend(data) {
        const template = Handlebars.compile(data); // returns a function
        const rendered = template({
        isLogged: false,   // We need to add the extra property and supply it to handlebars
        name: "Luke",
        power: "Force"
        });
        
        $(`#target`).append(rendered);
    }
}