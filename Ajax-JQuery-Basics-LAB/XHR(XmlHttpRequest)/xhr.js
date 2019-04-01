function loadRepos() {

    let result = document.getElementById("res");
    let req = new XMLHttpRequest();
    let url = "https://api.github.com/users/testnakov/repos";

    
    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            result.textContent = req.responseText;
        }
    };

    req.open("GET", url, true);
    req.send();
}