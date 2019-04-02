function solve() {
    const baseUrl = "https://judgetests.firebaseio.com/schedule/";
    let currentStopId = "depot";
    let currentData;

    function depart() {
        $.ajax({
            url: baseUrl + currentStopId + ".json",
            method: "GET",
            success: loadStop,
            error: showError,
        });
    }
        function showError() {
            $(".info").text(`Error`);
            $(`#arrive`).attr("disabled", true);
            $(`#depart`).attr("disabled", true);
        }

        function loadStop(data) {
            currentData = data;
            $(".info").text(`Next stop ${data.name}`);
            switchButtons("depart", "arrive");
        }

        function arrive() {
            $(".info").text(`Arriving at ${currentData.name}`);
            currentStopId = currentData.next;
            switchButtons("arrive", "depart");
        }

        function switchButtons(disable, enable) {
            $(`#${disable}`).attr("disabled", true);
            $(`#${enable}`).attr("disabled", false);
        }

return {
    depart,
    arrive
};
}
