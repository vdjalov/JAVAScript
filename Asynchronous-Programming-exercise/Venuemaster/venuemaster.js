function attachEvents() {
    const baseUrl = "https://baas.kinvey.com/";
    const user = "guest";
    const password = "pass";
    const base64Auth = btoa(user + ":" + password);
    const headers = {
        "Authorization": "Basic " + base64Auth
    };
   
    let length;
    $(`#getVenues`).on(`click`, loadVenues);

        function loadVenues() {
            let venueDate = $(`#venueDate`).val();
            let request= {
                method: "POST",
                url: baseUrl + `rpc/kid_BJ_Ke8hZg/custom/calendar?query=${venueDate}`,
                headers
            };

            $.get(request)
                .then(loadAvailableVenues);

                function loadAvailableVenues(data) {
                  length = data.length;
                    for(let i = 0; i < data.length; i++) {
        
                        let request = {
                            method: "GET", 
                            url: baseUrl + `appdata/kid_BJ_Ke8hZg/venues/${data[i]}`,
                            headers 
                        };

                        $.get(request)
                            .then(displayAvailableVenues);
                            function displayAvailableVenues(data) {
                              let template = 
                               $(`<div class="venue" id="${data._id}">`);
                              let infoButton = $(`<span class="venue-name"><input class="info" type="button" value="More info">${data.name}</span>`);
                              template.append(infoButton);
                              template.append($(`<div class="venue-details" style="display: none;">
                                <table>
                                  <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
                                  <tr>
                                    <td class="venue-price">${data.price} lv</td>
                                    <td><select class="quantity">
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select></td>
                                    <td>
                                    <input class="purchase" 
                                    name=${data.name} type="button" value="Purchase" id="purchaseButton${i}">
                                    </td>
                                  </tr>
                                </table>
                                <span class="head">Venue description:</span>
                                <p class="description">${data.description}</p>
                                <p class="description">Starting time: ${data.startingHour}</p>
                              </div>
                            </div>
                            `));
                  
                             $(`#venue-info`).append(template);
                             $(infoButton).find("input").on("click", showInfo);
                          }
                    }

                    
                  

                    function showInfo() {
                       $(`.venue-details`).hide();
                       $(this).parent().parent().find('.venue-details').show();
                        for(let i = 0; i < length; i++) {
                          let purchaseButton = document.getElementById(`purchaseButton${i}`);
                          purchaseButton.addEventListener("click", purchaseTickets);
                        }
                    }

                    function purchaseTickets() {
                       let id = $(this).parent().parent().parent().parent().parent().parent().attr("id");
                       let quantity = $(this).parent().parent().find(".quantity").val();
                       let price = $(this).parent().parent().find(`.venue-price`).text();
                       let name = $(this).attr(`name`);
                       let finalPrice = price.split(" ")[0];
                       let total = +quantity * +finalPrice;
                       $('#venue-info').html(`<span class="head">Confirm purchase</span>
                       <div class="purchase-info">
                         <span>${name}</span>
                         <span>${quantity} x ${price}</span>
                         <span>Total: ${total} lv</span>
                         <input type="button" value="Confirm" id="confirm">
                       </div>
                      //  `);

                        
                       $('#venue-info #confirm').on("click", () => {
                        let request = {
                          method: "POST",
                          url: baseUrl + `rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${quantity}`,
                          headers
                          };
                     
                      
                      $.get(request)
                        .then(displayHtml);
                          function displayHtml(data) {
                            $('#venue-info').append("You may print this page as your ticket" + data.html);
                              
                          }
                       });
                       
                
                    }
                  
                }

        }


}