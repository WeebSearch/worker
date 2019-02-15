<template>
  <div class="top-wrapper">
    <div class="nav-section">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img :src="image"/>
          </a>
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item" :key="link" v-for="link in links">
              <router-link :key="link" :to=link.toLowerCase()>
                {{ link }}
              </router-link>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <router-link
                  to="/login"
                  class="button is-outlined"
                >
                  Login
                </router-link>
                <router-link
                  to="/signup"
                  class="button is-primary "
                >
                  Sign up
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import image from "@/assets/weebsearch.png";

  export default {
    name: "Navbar",
    data: () => ({
      links: ["Home", "Animes", "Profile"],
      image
    })
  }
</script>

<style scoped lang="scss">
  @import "../variables";

  .navbar {
    background-color: $background-dark !important;
    width: 65%;
  }

  .nav-section {
    background-color: $background-dark !important;
    width: 100vw;
    display: flex;
    justify-content: center;
  }

  a {
    color: $text-color;
    &:hover {
      color: white;
    }
  }


</style>
