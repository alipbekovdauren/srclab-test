<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="csrf_token" content="{{ csrf_token() }}" />
  <link rel="stylesheet" href="/css/style.css">
  <title>Сократитель ссылок</title>
</head>
<body>
  <form id="form" action="">
    <input id="input" name="original" placeholder="Ссылка" type="text">
    <button id="button">Сократить</button>
  </form>

  <ul class="error_list"></ul>
  
  <ul class="link_list"></ul>

  <script src="/js/script.js"></script>
</body>
</html>