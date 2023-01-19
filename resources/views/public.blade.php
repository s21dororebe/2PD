<!doctype html>
<html lang="lv">
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
</head>
<body>
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <h5 class="my-0 mr-md-auto font-weight-normal">{{ $title }}</h5>
    <a class="btn btn-outline-primary" style="margin-left: 74rem;" href="/login">Admin</a>
</div>

<main class="container">
    <div id="root"></div>
</main>

<footer class="pt-4 my-md-5 pt-md-5 border-top">
    <div class="col-12 col-md">
        <small class="d-block mb-3 text-muted" style="margin-left: 5rem;">Rebeka Tretjaka, VeA, 2022</small>
    </div>
</footer>

<script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>
