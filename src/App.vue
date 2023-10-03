<script setup>

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/Guerra">Guerra!!!!</router-link>
        </li>
      </ul>
    </div>

  </nav>

  <hr>


  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
</style>
