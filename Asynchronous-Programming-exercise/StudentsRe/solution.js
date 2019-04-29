function solve() {
    
let username = `guest`;
let password = `guest`;
let base64Auth = btoa(username + `:` + password);
let url = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students";
const headers = {
    "Authorization": `Basic ${base64Auth}`,
    "Content-Type": "application/json"
};

loadData();
    function loadData() {
        let request = {
            method: `GET`,
            url,
            headers
        }

        $.get(request)
            .then(function(data) {
                $("#results tr:not(:first)").remove();
                return data;
            })
            .then(function(data) {
               for(let i = 0; i < data.length; i++) {
                   let element = data[i];

                   let elementId = element._id;
                   let id = element.ID;
                   let firstName = element.FirstName;
                   let lastName = element.LastName;
                   let facultyNumber = element.FacultyNumber;
                   let grade = element.Grade;
                  
                   let tr = $(`<tr data-id="${elementId}"></tr>`);
                   $(tr).append(`<td>${id}</td>`);
                   $(tr).append(`<td>${firstName}</td>`);
                   $(tr).append(`<td>${lastName}</td>`);
                   $(tr).append(`<td>${facultyNumber}</td>`);
                   $(tr).append(`<td>${grade}</td>`);
                   $(`#results`).append(tr);
               }
            });
    }

        $(`button`).on(`click`, function() {
            let id = Number($("#studentId").val());
            let firstName =$("#firstName").val() ;
            let lastName = $("#lastName").val();
            let facNumber = $("#facultyNumber").val();
            let grade = Number($("#grade").val());


            if(firstName.trim() != "" && lastName.trim() != "" 
                    && facNumber.trim() != "") {
                        let student = {
                            ID: id,
                            FirstName: firstName,
                            LastName: lastName,
                            FacultyNumber: facNumber,
                            Grade: grade
                        };

                        let addStudentRequest = {
                            method: "POST",
                            url,
                            data: JSON.stringify(student),
                            headers
                        };
                        $.get(addStudentRequest)
                            .then(loadData)
                    }
           
        });

}