
function loadCommits() {

    let username = $(`#username`).attr(`value`);
    let repository = $(`#repo`).attr(`value`);
    let url = `https://api.github.com/repos/${username}/${repository}/commits2`;

    let request = {
        method: `GET`,
        url,
    };

        $.get(request) 
            .then(function (data) {
                data.forEach(element => {
                    let li = $(`<li>${element.commit.author.name}: ${element.commit.message}</li>`);
                    $(`#commits`).append(li);
                });
             })
             .catch((error) => { // If the url is wrong the catch clause will grab it!
                let li = $(`<li>Error: ${error.status} (${error.statusText})</li>`);
                 $(`#commits`).append(li);
             });
}