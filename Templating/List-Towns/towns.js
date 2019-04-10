
function attachEvents() {

    $(`#btnLoadTowns`).on("click", getTowns);

        function getTowns() {
           let towns = $(`#towns`).val().split(", ");
           // get template
           let template = $(`#towns-template`).html(); 
            // compile template
            let compiledTemplate = Handlebars.compile(template);
            // create context
            let rendered = compiledTemplate({
                towns
            });
            //add to html
            $(`#root`).html(rendered);
        }

}