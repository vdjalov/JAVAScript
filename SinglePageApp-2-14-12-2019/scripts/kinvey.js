const kinvey = function() {
    const baseURl = `https://baas.kinvey.com/`;
    const appKey = `kid_HkkAw4MtV`;
    const appSecret = `83ef85bb891e450f949cf2389ab80977`;


    function getAuth(auth) {
        if(auth == `basic`) {
            return {
                "Authorization":`Basic ${btoa(appKey + ':' + appSecret)}`
            };
        }else {
            return {
                "Authorization":`Kinvey ${sessionStorage.authtoken}`
            };
        }
    };


    function makeURL(collection, endpoint) {
        return baseURl + collection + `/` + appKey + `/` + endpoint;
    };


    function post(collection, endpoint, auth, data) {
        let request = {
            method: `POST`,
            url: makeURL(collection, endpoint),
            headers: getAuth(auth),
            data,
        }
        return $.get(request);
    };


    function put(collection, endpoint, auth, data) {
        let request = {
            method: `PUT`,
            url: makeURL(collection, endpoint),
            headers: getAuth(auth),
            data
        };
        return $.get(request);
    }

    function get(collection, endpoint, auth) {
        let request = {
            method: `GET`,
            url: makeURL(collection, endpoint),
            headers: getAuth(auth)
        }
        return $.get(request);
    };

    function remove(collection, endpoint, auth) {
        let request = {
            method: `DELETE`,
            url: makeURL(collection, endpoint),
            headers: getAuth(auth)
        }
        return $.get(request);
    }


    return {
        post,
        get,
        put,
        remove,
    };


}();

