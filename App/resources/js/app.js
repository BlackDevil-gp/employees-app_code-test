    
    /* Clear all the table */ 
    function clearTable() {
        document.getElementById('results').innerHTML = '';
        document.getElementById('clear').classList.add('d-none');
    }
   
    /* Clear the list of employees by the button */
    $("#clear").on("click", function(e) {
        clearTable();
    });


    /* Show the employees from API */ 
    $("#show").on("click", function() {
        /* Take the table's id */
        var table = document.getElementById('results');

        $.ajax({
            type: "GET",
            url: "http://dummy.restapiexample.com/api/v1/employees",

            error: function() {
                /* Send error message if something goes wrong */
                errorMsg();
            },

            success: function(response) {
                /* Check if response return 'success' */
                if (response.status === 'success') {
                    /* Clear the table before showing new request */
                    clearTable();
                    /* Disable buttons */
                    document.getElementById('show').classList.add('disabled');

                    for (i = 0; i < response.data.length; i++) {
                        /* Pass the response to a function */
                        row(i, response);
                    };

                } else {
                    /* Show error if response is not success */
                    errorMsg();
                }
            }
        });

        /* 
        *  This function is getting the response
        *  and showing the results in the table
        *  with some delay
        */
        function row(i, response) {
            setTimeout(function() {

                var responseJSON =
                    `<tr>
                        <th scope="row">${i+1}</th>
                        <td>${response.data[i].employee_name}</td>
                        <td>${response.data[i].employee_salary}</td>
                        <td>${response.data[i].employee_age}</td>
                        <td><img class="prof-img" src="${response.data[i].profile_image}"></td>
                    </tr>`

                table.innerHTML += responseJSON;

                /* Enable the buttons when it shows all the results */
                if (i+1 === response.data.length) {
                    document.getElementById('show').classList.remove('disabled');
                    document.getElementById('clear').classList.remove('d-none');
                }
            /* Time between each result */
            }, 70 * i);
        }

        /* The error message */ 
        function errorMsg() {         
            clearTable();

            var responseJSON =
                `<tr>
                    <th colspan="5" class="text-center text-danger">Something went wrong! Please try again.</th>
                </tr>`

            table.innerHTML = responseJSON;
        }    
    });