const notify = (() => {

    function showSuccess(message) {
        $(`#infoBox span`).text(message);
        $(`#infoBox`).fadeIn();
        $(`#infoBox`).fadeOut(3000);
    };

    function showError(message) {
        $(`#errorBox span`).text(message);
        $(`#errorBox`).fadeIn();
        $(`#errorBox`).fadeOut(3000);
    };


    return {
        showSuccess,
        showError,
    }
})();