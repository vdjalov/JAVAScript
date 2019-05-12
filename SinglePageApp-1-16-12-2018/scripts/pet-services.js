const petServices =  (() => {

    function updateLikes(res) {
        let likes = (+res.likes + 1) + "";
        let data = {
        name: res.name, 
        category: res.category,
        description: res.description,
        imageURL: res.imageURL,
        likes,
        }

        return kinvey.update(data, res._id);
    }


    function createNewPet(name, description, imageURL, category, creator) {
        let data = {
            name, 
            description,
            _acl:{creator},
            imageURL,
            category,
            likes: "0"
        };
       return kinvey.post(`appdata`, `pets`, `kinvey`, data);
    }


    function deleteCurrentPet(id) {
        return kinvey.remove(id);
    }


    function updateCurrentPet(data, id) {
        return kinvey.update(id, data);
    }


    function getDatabase() {
           return kinvey.get(`appdata`, `pets`, `kinvey`)
    }


    return {
        updateLikes,
        createNewPet,
        getDatabase,
        updateCurrentPet,
        deleteCurrentPet,

        
    }
})();