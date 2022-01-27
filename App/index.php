<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Employees Application</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/custom.css" rel="stylesheet">

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

    <link rel="icon" href="/image/svg/favicon.svg" type="image/x-icon">

</head>

<body>
    <!-- Background Image -->
    <div class="bg-img">
        <img class="w-100" src="/image/bg_img.jpg" alt="office-image">
    </div>

    <!-- Title -->
    <div class="p-2 relative-items title-style">
        <h1 class="text-center">Employees Application</h1>
    </div>

    <!-- Buttons -->
    <div class="container mt-5 relative-items">
        <div class="d-flex flex-wrap justify-content-between">

            <button id="show" class="btn btn-outline-success text-white fw-bold px-4">Show me</button>
            <button id="hide" class="btn btn-outline-danger text-white fw-bold px-4 d-none">Hide</button>

        </div>
    </div>

    <!-- Table -->
    <div class="container mt-3 relative-items">
        <table class="table table-striped border table-hover" style="box-shadow: 0 0 6px 0px black;">

            <thead style="background: #e1e1e1;">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Age</th>
                    <th scope="col">Image</th>
                </tr>
            </thead>

            <tbody id="results" class="tbody-style">

            </tbody>

        </table>
    </div>

</body>

<script src="js/app.js"></script>

</html>