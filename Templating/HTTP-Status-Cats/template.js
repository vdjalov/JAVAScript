$(function() {
    renderCatTemplate();
    function renderCatTemplate() {
        $.get("./catsTemplate.hbs")
            .then(renderCat)
            .catch((error) => {
                error.message;
            });

                function renderCat(data) {
                    let compiledTemplate = Handlebars.compile(data);
                    let rendered = compiledTemplate({
                        cats: window.cats
                    });
                  
                    $(`#allCats`).html(rendered);
                }
            }
}());

    function showHideInfo(id) {
        let div = $(`#${id}`);
        let text =  div.prev().text();
            if(text === "Show status code") {
                div.prev().text("Hide status code");
            } else {
                div.prev().text("Show status code");
            }
        $(`#${id}`).toggle();
    }
