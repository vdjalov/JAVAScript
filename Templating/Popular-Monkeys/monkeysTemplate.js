$(function() {
    loadMonkeys();

    async function loadMonkeys() {
        let allMonkeysData = await $.get("./allMonkeys.hbs");
        let monkeyData = await $.get("./monkey.hbs");

        let allMonkeysTemplate = Handlebars.compile(allMonkeysData);
        let monkeyTemplate = Handlebars.compile(monkeyData);

        Handlebars.registerPartial("monkey", monkeyTemplate);

        let rendered = allMonkeysTemplate({
            monkeys: monkeys
        });

        $(`.monkeys`).html(rendered);
    }
}());

    function showInfo(id) {
        $(`#${id}`).toggle();
    }