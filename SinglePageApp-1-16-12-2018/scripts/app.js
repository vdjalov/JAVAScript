const handlers = {};
$(() => {

    const app = Sammy(`#container`, function(ctx) {
        this.use(`Handlebars`, `hbs`);

        // Home Page handlers
        this.get(`#/home`, handlers.getHome);
        this.get(`#/login`, handlers.getLogin);
        this.get(`#/register`, handlers.getRegister); 
        this.get(`#/logout`, handlers.logoutUser);
        this.get(`#/addPet`, handlers.getAddPet);
        this.get(`#/pet/:petId`, handlers.petThatPet); // update likes
        this.get(`#/category/:All`, handlers.getSpecificCategory);
        this.get(`#/category/:Cat`, handlers.getSpecificCategory);
        this.get(`#/category/:Dog`, handlers.getSpecificCategory);
        this.get(`#/category/:Reptile`, handlers.getSpecificCategory);
        this.get(`#/category/:Parrot`, handlers.getSpecificCategory);
        this.get(`#/category/:Other`, handlers.getSpecificCategory);
        this.get(`#/myPets`, handlers.getOnlyMyPets); // load only the logged in user pets
        this.get(`#/edit/:id`, handlers.getEditPet);
        this.get(`#/delete/:id`, handlers.getDeletePet);
        this.get(`#/details/:id`, handlers.getDetailsPet);


        this.post(`#/register`, handlers.registerUser);
        this.post(`#/login`, handlers.loginUser);
        this.post(`#/addPet`, handlers.createPet)
        this.post(`#/save`, handlers.editPet);
        this.post(`#/confirmDelete`, handlers.deletePet);
    });

    app.run(`#/home`);
});

 