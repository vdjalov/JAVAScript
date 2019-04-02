function attachEvents() {
  
    $(`#submit`).on("click", submitToBase);  // send button
    $(`#refresh`).on("click", refreshChat);
    let url = `https://messenger-91a03.firebaseio.com/.json`;
    function submitToBase() {
        let authorName = $(`#author`).val();
        let msgText = $(`#content`).val();
        let time = Date.now();

    if(authorName !== "" && msgText !== "") {
        let message = {
            author: authorName,
            content: msgText,
            timestamp: time,
        };
      
        $.ajax({
            method:"POST",
            url,
            data: JSON.stringify(message),
            //success: () => console.log("Successful"),
        });
      }
    }


    function refreshChat() {
        $.ajax({
            method:"GET",
            url,
            success: onLoadRequest,
        });

        function onLoadRequest(data) {
            let text = "";
            for(let [key, value] of Object.entries(data)) {
               let author = value.author;
               let content = value.content;
              text+= (`${author}: ${content}\n`);
            }
            $("#messages").text(text);
         }
    }
}