function loadRepos() {
    let username = $("#username").val();
    let url = `https://api.github.com/users/${username}/repos`;
    let ul = $("#repos");
    

    $.ajax({
        method: "GET",
        url: url,
        success: onLoadResponse,
        error: onErrorResponse,    
    });

        function onLoadResponse (data) {
            console.log(data);
         
            ul.empty();

            data.forEach(element => {
                let a = $(`<a href = "` + element.html_url + `">${element.full_name}</a>`);
                let li = $(`<li></li>`);
                li.append(a);
                
                ul.append(li);
            });
        }

        function onErrorResponse() {
            ul.empty();
            let li = $(`<li>Error</li>`)
            ul.append(li);
       }
}