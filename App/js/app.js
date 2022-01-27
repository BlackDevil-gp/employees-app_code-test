    // 
    // Clear table
    // 
    function clearTable() {
        document.getElementById('results').innerHTML = '';
    }
   
   // 
    // Hide the employees
    // 
    $("#hide").on("click", function(e) {

        clearTable();
        document.getElementById('hide').classList.add('d-none');

    });


    // 
    // Show the employees from API
    // 
    $("#show").on("click", function(e) {
        var timer;

        $.ajax({
            type: "GET",
            url: "http://dummy.restapiexample.com/api/v1/employees",

            error: function(e) {
                clearTable();
                errorMsg();
            },

            success: function(response) {

                if (response.status == 'success') {

                    clearTimeout(timer);
                    clearTable();
                    document.getElementById('show').classList.add('disabled');
                    document.getElementById('hide').classList.add('d-none');

                    for (i = 0; i < response.data.length; i++) {
                        row(i);
                    };

                    function row(i) {
                        setTimeout(function() {

                            var responseJSON =
                                `<tr>
                                    <th scope="row">${i+1}</th>
                                    <td>${response.data[i].employee_name}</td>
                                    <td>${response.data[i].employee_salary}</td>
                                    <td>${response.data[i].employee_age}</td>
                                    <td><img class="prof-img" src="${response.data[i].profile_image}"></td>
                                </tr>`

                            var table = document.getElementById('results');

                            table.innerHTML += responseJSON;

                            if (i+1 == response.data.length) {
                                document.getElementById('show').classList.remove('disabled');
                                document.getElementById('hide').classList.remove('d-none');
                            }

                        }, 70 * i);

                    }

                } else {
                    clearTable();
                    errorMsg();
                }

            }

        });

        // 
        // The error message
        // 
        function errorMsg() {
            var responseJSON =
                `<tr>
                    <th colspan="5" class="text-center text-danger">Something went wrong! Please try again.</th>
                </tr>`

            var table = document.getElementById('results');

            table.innerHTML += responseJSON;

            timer = setTimeout(function() {
                clearTable();
            }, 5000);
        }

        e.preventDefault();
    });