const userServices = (() => {
    
    function save(data) {
        sessionStorage.setItem(`username`, data.username);
        sessionStorage.setItem(`authtoken`, data._kmd.authtoken);
        sessionStorage.setItem(`creator`, data._acl.creator);
    }


    function filter(data) {
        let creator = sessionStorage.creator;
        data = data.filter(el =>el._acl.creator != creator);
        return data;
    }
    function registerUser(username, password) {
        let data = {
            username, password
        }
        return kinvey.post(`user`, ``, `basic`, data);
    }


    function loginUser(username, password) {
        let data = {
            username,
            password
        };
        return kinvey.post(`user`, `login`, `basic`, data);
    }


    function logout() {
        return kinvey.post(`user`, `_logout`, `kinvey`);
    }


    function getDatabase() {
        return kinvey.get(`appdata`, `pets`, `kinvey`);
    }


    function getPetById(id) {
        return kinvey.get(`appdata`, `pets/${id}`, `kinvey`);
    }

    

    return {
        registerUser,
        save,
        loginUser,
        logout,
        getDatabase,
        filter,
        getPetById,


    }

})();