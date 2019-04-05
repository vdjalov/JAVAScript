function solve() {
    addStudentButton.on("click", addStudent);
   
    const baseUrl = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students"
    const username = "guest";
    const password = "guest";
    const basic64Auth = btoa(username + ":" + password);
    const headers = {
        "Authorization": `Basic ${basic64Auth}`,
        "Content-Type": "application/json"
    };
    
    extractStudents(); // Loading database into the available table
        function extractStudents() {
            let request = {
                method: "GET",
                url: baseUrl,
                headers
            };

            $.get(request)
                .then((data) => {
                  $("#results tr:not(:first)").remove();
                    return data;
                })
                .then(loadStudents)
                .catch(displayError);
            }
        
        function loadStudents(data) {
            
           Object.entries(data).sort((a, b) => a[1].ID - b[1].ID)
                               .forEach(value => {
                    tr = $(`<tr>
                        <td>${value[1].ID}</td>
                        <td>${value[1].FirstName}</td>
                        <td>${value[1].LastName}</td>
                        <td>${value[1].FacultyNumber}</td>
                        <td>${value[1].Grade}</td>
                        </tr>`);
                         $(`#results`).append(tr);
                    });
        }
        
        function addStudent() {
           
            let id = Number($("#studentId").val());
            let firstName =$("#firstName").val() ;
            let lastName = $("#lastName").val();
            let facNumber = $("#facultyNumber").val();
            let grade = Number($("#grade").val());

            if(+id && firstName.trim() !== "" && lastName.trim() !== "" 
                && facNumber !== "" && checkIfNumbers(facNumber) && +grade) {
                    let student = {
                        ID: id,
                        FirstName: firstName,
                        LastName: lastName,
                        FacultyNumber: facNumber,
                        Grade: grade
                    }

                   let request = {
                    method: "POST",
                    url: baseUrl,
                    headers,
                    data: JSON.stringify(student)
                   };

                   $.get(request) 
                        .then(extractStudents)
                        .catch(displayError);
                }
        }

        // Checking if a string of numbers as requested
        function checkIfNumbers(facNumber) {
            let regex =/[0-9]+/g;
            return regex.test(facNumber);
        }

        // Consoling potential errors
        function displayError(err) {
            console.log(err.message);
        }
}
