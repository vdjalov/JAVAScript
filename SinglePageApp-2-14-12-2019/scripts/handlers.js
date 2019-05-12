
handlers.getHome = function getHome(ctx) {
   ctx.username = userServices.checkIfUsernameExists();
   if(userServices.checkIfUsernameExists()) {
    userServices.getFromDatabase("")
        .then(function(data) {
        ctx.loadPartials({
            header: `../templates/common/header.hbs`,
            footer: `../templates/common/footer.hbs`,
        })
        .then(function() {
        if(data.length == 0) {
            ctx.loggedIn == true;
        } else {
            ctx.data = data;
        }
            this.partial(`../templates/home.hbs`);
        });
    });
   } else {
    ctx.loadPartials({
        header: `../templates/common/header.hbs`,
        footer: `../templates/common/footer.hbs`,
    })
    .then(function() {
        this.partial(`../templates/home.hbs`);
    });
   }
};


handlers.getSignUp = function getSignUp(ctx) {
    ctx.loadPartials({
        header: `../templates/common/header.hbs`,
        footer: `../templates/common/footer.hbs`
    })
    .then(function() {
        this.partial(`../templates/signUp/signUpPage.hbs`);
    });
};


handlers.signUpUser = function signUpUser(ctx) {
    let {username, password, rePassword} = ctx.params;
    userServices.signUpUser(username, password)
        .then(function(data) {
            let authtoken = data._kmd.authtoken;
            let creator = data._acl.creator;
            userServices.saveSession(username, authtoken, creator);
            notify.onSuccess(`User registration successful.`)
            ctx.redirect(`#/home`);
        })
        .catch(function(err) {
            notify.onError(err.responseJSON.error);
        });
};


handlers.logoutUser = function logoutUser(ctx) {
    userServices.logoutUser()
    .then(function() {
        sessionStorage.clear();
        notify.onSuccess(`Logout successful.`)
        ctx.redirect(`#/home`);
    })
    .catch(function(err) {
        notify.onError(err.responseJSON.error);
        });
};


handlers.getSignIn = function signIn(ctx) {
    ctx.username = userServices.checkIfUsernameExists;
    ctx.loadPartials({
        header: `../templates/common/header.hbs`,
        footer: `../templates/common/footer.hbs`
    })
    .then(function() {
        this.partial(`../templates/signIn/signInPage.hbs`);
    })
    .catch(function(err) {
        notify.onError(err.responseJSON.error);
     });;
};


handlers.signInUser = function signInUser(ctx) {
    let {username, password} = ctx.params;
    userServices.signInCurrentUser(username, password)
        .then(function(data) {
            userServices.saveSession(username, data._kmd.authtoken, data._acl.creator);
            notify.onSuccess(`Login successful.`);
            ctx.redirect(`#/home`);
        })
        .catch(function(err) {
            notify.onError(err.responseJSON.error);
        });
};


handlers.getOrganizeEvent = function getOrganizeEvent(ctx) {
    ctx.username = userServices.checkIfUsernameExists;
    ctx.loadPartials({
        header: `../templates/common/header.hbs`,
        footer: `../templates/common/footer.hbs`
    })
    .then(function() {
        this.partial(`../templates/organizeEvent/organizeEventPage.hbs`);
    });

};


handlers.organizeEvent = function organizeEvent(ctx) {
    let{name, dateTime, description, imageURL} = ctx.params;
    userServices.submitOrganizedEvent(name, dateTime, description, imageURL, 0)
        .then(function() {
            ctx.redirect(`#/home`);
        });
};


handlers.getEventInfo = function getEventInfo(ctx) {
    let id = ctx.params.id;
    ctx.username = sessionStorage.username;
        userServices.getFromDatabase(id)
            .then(function(data) {
                ctx.loadPartials({
                    header: `../templates/common/header.hbs`,
                    footer: `../templates/common/footer.hbs`
                })
                .then(function() {
                    if(sessionStorage.creator == data._acl.creator) {
                        ctx.creator = true;
                    }
                    ctx.data = data;
                    this.partial(`../templates/showMoreInfoEvent/moreInfo.hbs`);
                })
            });
};


handlers.getEditInfo = function getEditInfo(ctx) {
    ctx.username = userServices.checkIfUsernameExists();
    let id = ctx.params.id;
    userServices.getFromDatabase(id)
        .then(function(data) {
            ctx.loadPartials({
                header: `../templates/common/header.hbs`,
                footer: `../templates/common/footer.hbs`
            })
            .then(function() {
                ctx.data = data;
                this.partial(`../templates/editEvent/editEventPage.hbs`);
            });
        });
};


handlers.editEvent = function editEvent(ctx) {
    let id = ctx.app.last_location[1].split(`/`)[3];
    
    let lastLocation = `#/moreInfo/` + id;
    let {name, dateTime, description, imageURL, organizer, peopleInterestedIn} = ctx.params;
    userServices.updateEventEntry(id, name, dateTime, description, imageURL, peopleInterestedIn)
        .then(function(){
            notify.onSuccess(`Successfully edited.`);
            ctx.redirect(`${lastLocation}`);
        });
};

// Remove&Delete event
handlers.closeEvent = function closeEvent(ctx) {
    let id = ctx.params.id;
    userServices.deleteEvent(id)
        .then(function(){
            ctx.redirect(`#/home`);
    });
};

handlers.joinEvent = function joinEvent(ctx) {
    let id = ctx.params.id;
    userServices.updateAttendants(id);
};


handlers.getShowProfile = function getShowProfile(ctx) {
    userServices.getFromDatabase(``)
    .then(function(data) {
        let creator = sessionStorage.creator;
        let sortedData = data
            .filter(el=> el._acl.creator == creator)
            .sort((a, b) => +b.interestedPeople - +a.interestedPeople);

           if(sortedData.length > 0) {
             ctx.eventsOrganized = `Organizer of ${sortedData.length} events.`;
           } else {
             ctx.eventsOrganized = `No events`;
           }

        ctx.loadPartials({
            header: `../templates/common/header.hbs`,
            footer: `../templates/common/footer.hbs`
        })
        .then(function() {
            console.log(sortedData);
            ctx.username = sessionStorage.username;
            ctx.data = sortedData;
            this.partial(`../templates/showProfile/showProfilePage.hbs`);
        });
    });
  
}