let baseURL = "https://baas.kinvey.com/";
let username = `guest`;
    let password = `pass`;
    let base64Auth = btoa(username + `:` + password);
    let headers = {
        "Authorization": "Basic " + base64Auth,
    };
function attachEvents() {
    $(`#getVenues`).on(`click`, getVenues);
        function getVenues() {
            $(`#venue-info`).empty();
            let date = $(`#getVenues`).prev().val();
          $.get({
              method: `POST`,
              url:baseURL + `rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`,
              headers
          })
          .then(function(data) {
              for(let i = 0; i < data.length; i++) {
                  let id = data[i];
                    $.get({
                        method: `GET`,
                        url: baseURL + `appdata/kid_BJ_Ke8hZg/venues/${id}`,
                        headers
                    })
                    .then(function(venue) {
                      $(`#venue-info`).append($(`<div class="venue" id="${venue._id}">
                      <span class="venue-name"><input class="info" type="button" value="More
                      info" data-id="${i}" onclick="showInfo(this)">${venue.name}</span>
                      <div class="venue-details" id="-${i}"style="display: none;">
                      <table>
                      <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
                      <tr>
                      <td class="venue-price">${venue.price} lv</td>
                      <td><select class="quantity">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      
                      Page 21 of 22 Follow us:
                      © Software University Foundation. This work is licensed under the CC-BY-NC-SA license.
                      
                      <option value="4">4</option>
                      <option value="5">5</option>
                      </select></td>
                      <td><input class="purchase" type="button" id="--${i}" onclick="purchaseTickets(this)" value="Purchase"></td>
                      </tr>
                      </table>
                      <span class="head">Venue description:</span>
                      <p class="description">${venue.description}</p>
                      <p class="description">Starting time: ${venue.startingHour}</p>
                      </div>
                      </div>`));
                    })
              }
            
          })
          .catch((err) => {
            console.log(err);
          });
        }    

}

let venueId = '';
let qty = 0;
function purchaseTickets(event) {
    let id = $(event).attr("id");
    let select = $(`#${id}`).parent().prev().children()[0];
    qty = +$(select).val();
    let price = +$(`#${id}`).parent().prev().prev().text().split(" ")[0];
    let name = $(`#${id}`).parent().parent().parent().parent().parent().prev().text();
    venueId = $(`#${id}`).parent().parent().parent().parent().parent().parent().attr(`id`);
   
    $(`#venue-info`).empty();
    $(`#venue-info`).append(
    `<span class="head">Confirm purchase</span>
    <div class="purchase-info">
    <span>${name}</span>
    <span>${qty} x ${price}</span>
    <span>Total: ${+qty * +price} lv</span>
    <input type="button" onclick="confirmPurchase()"value="Confirm">
    </div>`);

}

function confirmPurchase() {
    if(venueId != `` && qty > 0) {
        $.get({
            method: `POST`,
            url: baseURL + `rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${venueId}&qty=${qty}`,
            headers,
        })
        .then(function(data) {
            $(`#venue-info`).empty();
            $(`#venue-info`).append("You may print this page as tour ticket" + data.html);
        })
    }
}

function showInfo(event) {
    let id = $(event).data(`id`);
    $(`.venue-details`).hide();
    $(`#-${id}`).show();
}