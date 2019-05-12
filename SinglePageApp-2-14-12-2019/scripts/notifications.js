const notify = function () {

    function onSuccess(message) {
        $(`#successBox`).text(message);
        $(`#successBox`).fadeIn();
        $(`#successBox`).fadeOut(3000);
    };


    function onError(message) {
        $(`#errorBox`).text(message);
        $(`#errorBox`).fadeIn();
        $(`#errorBox`).fadeOut(3000);
    };


    $(document).on({  // show loading every time an ajax query is pending
        ajaxStart: () => $(`#loadingBox`).fadeIn(),
        ajaxStop: () => $(`#loadingBox`).fadeOut()
    });

    return {
        onSuccess,
        onError,
        
    }

}();