    /* Global Var */
    var showMoreBtn = document.getElementById('showMore');


    /* Clear all the table */ 
    function clearTable() {
        document.getElementById('results').innerHTML = '';
        document.getElementById('clear').classList.add('d-none');
        document.getElementById('showMore').classList.add('d-none');
    }
   
    /* Clear the list of employees by the button */
    $("#clear").on("click", function(e) {
        clearTable();
    });

     /* Add to Show More Button animation */
    function showMoreBtnAnimationON() {
        showMoreBtn.classList.add('disabled');
        showMoreBtn['firstElementChild'].classList.add('spinner-border');
    }

    /* Remove from Show More button the animation */
    function showMoreBtnAnimationOFF() {
        showMoreBtn.classList.remove('disabled');
        showMoreBtn['firstElementChild'].classList.remove('spinner-border');
    }

    /* Show More function */
    $("#showMore").on('click', function () {
        var hiddenRows = $('#results tr.d-none');
        var resultsRow = 5; /* How many results will show every time you press show more */

        showMoreBtnAnimationON();

        for (i=0; i < resultsRow; i++) {
            showHiddenRows(i, resultsRow);
        }

        /* 
        *  This function will show
        *  the results in the table
        *  with some delay
        */
        function showHiddenRows(i, resultsRow) {

            setTimeout (function() {

                if ($('#results tr.d-none').length !== 0) {

                    hiddenRows[i].classList.remove('d-none');

                    if (i+1 == resultsRow) {
                        showMoreBtnAnimationOFF();
                    }

                } else { /* When showing all the results remove the Show More button */

                    document.getElementById('showMore').classList.add('d-none');

                    showMoreBtnAnimationOFF();
                }
                /* Loading time between each result */
            }, 200 * i);
        }
      });


    /* Show the employees from API */ 
    $("#show").on("click", function() {

        var table = document.getElementById('results');
        var showValue = $('#showOptions :selected').val();
        var displayNone = '';

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
                    /* Add to Show More Button animation */
                    showMoreBtnAnimationON();

                    for (i = 0; i < response.data.length; i++) {
                        /* Pass the response to a function */
                        results(i, response);
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
        *  with some delay and showing how many results you choose
        */
        function results(i, response) {

            setTimeout(function() {

                /* 
                *  Show the results you had choose
                *  and the other remain results will
                *  hide with class 'd-none' = display:none;
                *  and show the button of Show More or hide it
                *  when you choose all results
                */
                if (i+1 > showValue) {
                    displayNone = "d-none";
                    showMoreBtn.classList.remove('d-none');
                } else if (showValue == 'all') {
                    displayNone = '';
                    showMoreBtn.classList.add('d-none')
                }

                var responseJSON =
                    `<tr class="${displayNone}">
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
                    showMoreBtnAnimationOFF();
                }

            /* Loading time between each result */
            }, 80 * i);
            
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