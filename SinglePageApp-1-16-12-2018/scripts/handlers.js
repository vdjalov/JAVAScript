let currentURL = "";
let currentPetId = "";
    handlers.getHome = function getHome(ctx) {
        currentURL = location.href;
       
        if(sessionStorage.username) {
            ctx.username = sessionStorage.username;
            ctx.authtoken = sessionStorage.authtoken;
            userServices.getDatabase()
                .then(function(data) {
                   data = userServices.filter(data);
                   ctx.pets = data;
                })
                .then(function() {
                    ctx.loadPartials({
                        header: `../templates/common/header.hbs`,
                        footer: `../templates/common/footer.hbs`,
                    })
                    .then(function() {
                        this.partial(`../templates/home/home.hbs`);
                    })
                })
        } else {
            ctx.loadPartials({
                header: `../templates/common/header.hbs`,
                footer: `../templates/common/footer.hbs`,
            })
            .then(function() {
                this.partial(`../templates/home/home.hbs`);
            })
        }


       
    };

    handlers.getLogin = function getLogin(ctx) {
        ctx.loadPartials({
            header: `../templates/common/header.hbs`,
            footer: `../templates/common/footer.hbs`,
            loginForm: `../templates/login/loginForm.hbs`
        })
        .then(function() {
            this.partial(`../templates/login/loginPage.hbs`);
        })
    };


    handlers.getRegister = function getRegister(ctx) {
        ctx.loadPartials({
            header: `../templates/common/header.hbs`,
            footer: `../templates/common/footer.hbs`,
            registerForm: `../templates/register/registerForm.hbs`
        })
        .then(function() {
            this.partial(`../templates/register/registerPage.hbs`);
        })
    }

    handlers.registerUser = function registerUser(ctx) {
        let {username, password, repeatPassword} = ctx.params;
        if(username.length >= 3 && password.length >= 6 
            && username.trim() !== "" && password.trim() !== "") {
        userServices.registerUser(username, password)
            .then(function(data) {
                userServices.save(data);
                notify.showSuccess(`User registration successful.`);
                ctx.redirect(`#/home`);
            });
        } else if (username.length < 3) {
                notify.showError(`Username must be at least 3 symbols`);
        } else if (password.length < 6) {
                notify.showError(`Password must be at least 6 symbols`);
        }
      };


    handlers.loginUser = function loginUser(ctx) {
        let {username, password} = ctx.params;
        userServices.loginUser(username, password)
            .then(function(data) {
                userServices.save(data);
                notify.showSuccess(`Login successful.`)
                ctx.redirect(`#/home`);
            })
            .catch(function (err) {
                notify.showError(err.responseJSON.description);
            });
    };  


    handlers.logoutUser = function logoutUser(ctx) {
        userServices.logout()
            .then(function() {
                sessionStorage.clear();
                notify.showSuccess(`Logout successful.`);
                ctx.redirect(`#/home`);
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
    };

    handlers.petThatPet = function petThatPet(ctx) {
        let id = ctx.params.petId.slice(0);
        userServices.getPetById(id)
            .then(function(data) {
                
                petServices.updateLikes(data)
                    .then(function() {
                        let redirect = currentURL.split(`#`)[1];
                        
                      ctx.redirect(`#${redirect}`);
                      
                    })
                    .catch(function(err) {
                        notify.showError(err.responseJSON.description);
                    });
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
    };


    handlers.getAddPet = function addPet(ctx) {
        ctx.username = sessionStorage.username;
        ctx.loadPartials({
            header: `../templates/common/header.hbs`,
            footer: `../templates/common/footer.hbs`,
            addPetForm: "../templates/addPet/addPetForm.hbs"
        })
        .then(function() {
            this.partial(`../templates/addPet/addPetPage.hbs`);
        });
    };


    handlers.createPet = function createPet(ctx) {
        let {name, description, imageURL, category} = ctx.params;
        let creator = sessionStorage.creator;
        petServices.createNewPet(name, description, imageURL, category, creator)
            .then(function() {
                notify.showSuccess(`Pet created.`)
                ctx.redirect(`#/home`);
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
    };


    handlers.getSpecificCategory = function getSpecificCategory(ctx) {
        currentURL = location.href;
        let category = ctx.params.All;
        let result = [];
            petServices.getDatabase()
            .then(function(data) {
                if(category == "All") {
                    result = data;
                } else {
                    result = data.filter(el => el.category == category);
                }
                
                if(sessionStorage.username) {
                    ctx.username = sessionStorage.username;
                }

                ctx.loadPartials({
                    header: `../templates/common/header.hbs`,
                    footer: `../templates/common/footer.hbs`,
                })
                .then(function() {
                    ctx.pets = result;
                    this.partial(`../templates/home/home.hbs`);
                });
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
    };


    handlers.getOnlyMyPets = function getOnlyMyPets(ctx) {
        let creator = sessionStorage.creator;
        currentURL = location.href;
        if(sessionStorage.username) {
            ctx.username = sessionStorage.username;
        }
        petServices.getDatabase()
            .then(function(data) {
                let finalData = data.filter(el => el._acl.creator == creator);
                ctx.loadPartials({
                    myPetsHeader: `../templates/myPet/myPetsHeader.hbs`,
                    myPetsFooter: `../templates/myPet/myPetsFooter.hbs`,
                })
                .then(function() {
                    ctx.pets = finalData;
                    this.partial(`../templates/myPet/myPetsPage.hbs`);
                });
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
    };


    handlers.getEditPet = function getEditPet(ctx) {
        let id = ctx.params.id;
       
        currentPetId = id;
        userServices.getPetById(id)
            .then(function(data) {
               
                ctx.loadPartials({
                    header: `../templates/myPet/myPetsHeader.hbs`,
                    footer: `../templates/myPet/myPetsFooter.hbs`,
                    petToEditForm: `../templates/myPet/editMyPet/petToEditForm.hbs`
                })
                .then(function() {
                    ctx.name = data.name;
                    ctx.likes = data.likes;
                    ctx.imageURL = data.imageURL;
                    ctx.description = data.description;
                    this.partial(`../templates/myPet/editMyPet/editMyPetPage.hbs`);
                });
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
    };


     handlers.editPet = function editPet(ctx) {
         
         let description = ctx.params.description;
         userServices.getPetById(currentPetId)
            .then(function(data) {
                let currentData = {
                    name: data.name,
                    description,
                    likes: data.likes,
                    imageURL: data.imageURL
                };
                petServices.updateCurrentPet(currentPetId, currentData)
                    .then(function() {
                        ctx.redirect(`#/myPets`);
                    });
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
     };


    handlers.getDeletePet = function getDeletePet(ctx) {
            let id = ctx.params.id;
            userServices.getPetById(id)
                .then(function (data) {
                   ctx.loadPartials({
                    myPetsFooter: `../templates/myPet/myPetsFooter.hbs`,
                    myPetsHeader: `../templates/myPet/myPetsHeader.hbs`
                   })
                   .then(function() {
                       ctx.name = data.name;
                       ctx.likes = data.likes;
                       ctx.imageURL = data.imageURL;
                       ctx.description = data.description;
                       this.partial(`../templates/myPet/deletePet/deleptePetForm.hbs`)
                   });
                })
                .catch(function(err) {
                    notify.showError(err.responseJSON.description);
                });
    };


    handlers.deletePet = function deletePet(ctx) {
        let arr = ctx.app.last_location[1].split(`/`);
        let id = arr[arr.length - 1];
        petServices.deleteCurrentPet(id)
            .then(function() {
                notify.showSuccess(`Pet removed successfully!`);
                ctx.redirect(`#/myPets`);
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
    };


    handlers.getDetailsPet = function getDetailsPet(ctx) {
        let id = ctx.params.id;
        userServices.getPetById(id)
            .then(function (data) {
               ctx.loadPartials({
                myPetsFooter: `../templates/myPet/myPetsFooter.hbs`,
                myPetsHeader: `../templates/myPet/myPetsHeader.hbs`
               })
               .then(function() {
                   ctx.name = data.name;
                   ctx.likes = data.likes;
                   ctx.imageURL = data.imageURL;
                   ctx.description = data.description;
                   ctx.id = data._id;
                   this.partial(`../templates/myPet/showDetails/detailsPage.hbs`);
               });
            })
            .catch(function(err) {
                notify.showError(err.responseJSON.description);
            });
    }





    