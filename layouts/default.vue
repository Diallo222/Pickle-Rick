<script setup lang="ts"></script>

<template lang="pug">
    .container-fluid.bg-rick
        Navbar
        NuxtPage
</template>

<style>
body {
  font-family: "Montserrat", serif;
}
.bg-rick {
  background-image: url("../assets/rick.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

::-webkit-scrollbar {
  display: none;
}
</style>
