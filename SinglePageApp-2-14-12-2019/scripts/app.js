const handlers = {};

$(() => {

    const app = Sammy(`#root`, function() {
        this.use(`Handlebars`, `hbs`);

        this.get(`#/home`, handlers.getHome);
        this.get(`#/signUp`, handlers.getSignUp);
        this.get(`#/logout`, handlers.logoutUser);
        this.get(`#/signIn`, handlers.getSignIn);
        this.get(`#/organizeEvent`, handlers.getOrganizeEvent);
        this.get(`#/moreInfo/:id`, handlers.getEventInfo);
        this.get(`#/editEvent/:id`, handlers.getEditInfo);
        this.get(`#/closeEvent/:id`, handlers.closeEvent);
        this.get(`#/joinEvent/:id`, handlers.joinEvent);
        this.get(`#/showProfile`, handlers.getShowProfile);


        this.post(`#/signUp`, handlers.signUpUser);
        this.post(`#/signIn`, handlers.signInUser);
        this.post(`#/organizeEvent`, handlers.organizeEvent);
        this.post(`#/editEvent`, handlers.editEvent);
    });
    
   app.run(`#/home`);
});


