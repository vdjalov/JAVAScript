const userServices = function() {

    function saveSession(username, authtoken, creator) {
        sessionStorage.setItem(`username`, username);
        sessionStorage.setItem(`authtoken`, authtoken);
        sessionStorage.setItem(`creator`, creator);
    }


    function checkIfUsernameExists() {
        return sessionStorage.username;
    }

    function signUpUser(username, password) {
        let data = {
            username,
            password
        }
        return kinvey.post(`user`, ``, `basic`, data);
    }


    function logoutUser() {
        return kinvey.post(`user`, `_logout`,`kinvey`);
    };


    function signInCurrentUser(username, password) {
        let data = {
            username,
            password
        };
        return kinvey.post(`user`, `login`, `basic`, data);
    };


    function submitOrganizedEvent(name, dateTime, description, imageURL, interestedPeople) {
        let data = {
            name, 
            dateTime,
            description,
            imageURL,
            interestedPeople,
            organizer: sessionStorage.username,
        };
        return kinvey.post(`appdata`, `eventScheduler`, `kinvey`, data);
    };


    function updateEventEntry(id,  name, dateTime, description, imageURL, peopleInterestedIn) {
        let data = {
            name, 
            dateTime,
            imageURL,
            description,
            interestedPeople: peopleInterestedIn
        };
        return kinvey.put(`appdata`,`eventScheduler/${id}`, `kinvey`, data);
    }


    function deleteEvent(id) {
        return kinvey.remove(`appdata`, `eventScheduler/${id}`, `kinvey`);
    }


    function updateAttendants(id) {
        getFromDatabase(id)
            .then(function(data) {
                let interestedPeople = (+data.interestedPeople + 1) + "";
                let newData = {
                    name: data.name,
                    dateTime: data.dateTime,
                    description: data.description,
                    imageURL: data.imageURL,
                    organizer: data.organizer,
                    interestedPeople,
                };
             kinvey.put(`appdata`,`eventScheduler/${id}`, `kinvey`, newData)
                .then(function() {
                    notify.onSuccess(`Event joined successfully.`);
                    window.location.href = `#/moreInfo/${id}`;
                });
            });
    }


    function getFromDatabase(id) {
        return kinvey.get(`appdata`,`eventScheduler/${id}`, `kinvey`);
    }

    return {
        signUpUser,
        saveSession,
        logoutUser,
        signInCurrentUser,
        checkIfUsernameExists,
        submitOrganizedEvent,
        getFromDatabase,
        updateEventEntry,
        deleteEvent,
        updateAttendants,

    };
}();

