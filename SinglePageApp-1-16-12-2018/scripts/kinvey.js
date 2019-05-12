const kinvey = (() => {
    const appKey = `kid_HkkAw4MtV`;
    const appSecret = `83ef85bb891e450f949cf2389ab80977`;
    const baseUrl = `https://baas.kinvey.com/`;

    function makeAuth(auth) {
        if(auth == `basic`) {
            return {
                "Authorization": `Basic ${btoa(appKey + `:` + appSecret)}`
            }
        } else {
            return {
                "Authorization": `Kinvey ${sessionStorage.getItem(`authtoken`)}`
            }
        }
    };


    function makeRequest(method, collection, endpoint, auth) {
        return {
            method,
            url: baseUrl + collection + `/` + appKey + `/` + endpoint,
            headers: makeAuth(auth)
        }
    };


    function post(collection, endpoint, auth, data) {
        let request = makeRequest(`POST`, collection, endpoint, auth); // Build the request 
        request.data = data;
        return $.get(request);
    }


    function get(collection, endpoint, auth) {
        let request = makeRequest(`GET`, collection, endpoint, auth);
        return $.get(request);
        
    }


    function update(data, id) {
        let request = {
            url: baseUrl + `appdata/` + appKey + `/pets/` + id,
            data,
            method: "PUT",
            headers: makeAuth("kinvey")
        };
        return $.get(request);
    }


    function remove(id) {
        let request = {
            method: `DELETE`,
            url: baseUrl + `appdata/` + appKey + `/pets/` + id,
            headers: makeAuth(`kinvey`)
        };
        return $.get(request);
    }

    return {
        post,
        get,
        update,
        remove,
    }

})();