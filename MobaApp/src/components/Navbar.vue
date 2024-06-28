<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="@/components/images/MOBAlogo2.png" alt="GameOn" height="30">
          MOBAOnt
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Play</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Explore</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Connect</a>
            </li>
            <li class="nav-item">
              <a class="btn btn-primary" href="#">Join Now</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  .navbar-brand img {
    margin-right: 5px;
  }
  .btn-primary {
    background-color: #6c63ff;
    border-color: #6c63ff;
  }
  </style>
  