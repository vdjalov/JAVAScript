function attachEvents() {

    const baseUrl = "https://baas.kinvey.com/appdata/kid_S1htVfcmm";
    const kinveyUsername = "peter";
    const kinveyPassword = "p";
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const authHeaders = { "Authorization": "Basic " + base64auth};


    $(`#btnLoadPosts`).on(`click`, function() {
        let request = {
            method: `GET`,
            url: baseUrl + `/posts`,
            headers: authHeaders
        };

        $.get(request)
            .then(function(data) {
                data.forEach(element => {
                    let option = $(`<option value="${element._id}">${element.title}</option>`)
                    $(`#posts`).append(option);
                });
            });
    });

    $(`#btnViewPost`).on(`click`, function(event) {
        let postId = $(`#posts`).val();
        
        let requestId = {
            method: `GET`, 
            url: baseUrl + `/posts/${postId}`,
            headers: authHeaders
        };
        
        let reqComments = {
            method: `GET`,
            url: baseUrl +  `/comments/?query={"post_id":"${postId}"}`,
            headers: authHeaders
        };    

        let reqOne = $.get(requestId);
        let reqTwo = $.get(reqComments);

            Promise.all([reqOne, reqTwo]) // Resolves the "reqOne" and "reqTwo" and then continues on!
                    .then(function([post, comments]) {
                        console.log(post);
                        console.log(comments);
                        $("#post-title").text(post.title);
                        $("#post-body").text(post.body);
                        $("#post-comments").empty();
                            for (let comment of comments) {
                                let commentItem = $("<li>")
                                    .text(comment.text);
                                    $("#post-comments")
                                     .append(commentItem);
                            }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
       
    });

}