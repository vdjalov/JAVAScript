
    function google() {
        swal({
            title: "Leave this site?",
            text: "If you click 'OK', you will be redirected to https://www.google.com",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "OK",
            closeOnConfirm: false
          },
          function(){
            window.location.href = "http://www.google.com";
          });
    }

    function facebook() {
        swal({
            title: "Leave this site?",
            text: "If you click 'OK', you will be redirected to https://www.facebook.com",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "OK",
            closeOnConfirm: false
          },
          function(){
            window.location.href = "http://www.facebook.com";
          });
    }

