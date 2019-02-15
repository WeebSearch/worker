<template>
  <div class="base">
    <div class="login">
      <div class="box">
        <b-field class="login-label" label="Name">
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field class="login-label" label="Password">
          <b-input v-model="password"></b-input>
        </b-field>
        <button class="button is-primary is-fullwidth"
        :disabled="!canLogin()">
          Login
        </button>
        <!--<br>-->
        <!--<b-field label="Login with" class="login-with">-->
          <!--<button class="button is-fullwidth is-info">Google</button>-->
          <!--<button class="button is-fullwidth is-outlined">Github</button>-->
          <!--<button class="button is-fullwidth"></button>-->
        <!--</b-field>-->
      </div>
    </div>
  </div>
</template>

<script>
  import wallpaper from "@/assets/weebsearch_login.jpg";
  import BInput from "buefy/src/components/input/Input";
  import BLoading from "buefy/src/components/loading/Loading";
  import google from "@/assets/google.png";
  import BIcon from "buefy/src/components/icon/Icon";

  export default {
    name: "Login",
    components: { BIcon, BLoading, BInput },
    data: () => ({
      name: "",
      password: "",
      wallpaper,
      google
    }),
    methods: {
      canLogin() {
        return this.name && this.password;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../variables.scss";

  label {
    color: $foreground-color !important;
  }

  .login-with {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.75rem;
    grid-template-rows: 1fr 1fr 1fr;
  }

  .login {
    max-width: 400px;
    max-height: 400px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .base {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .75) 100%);
    min-width: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }

  .cover-background {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-image: url("~@/assets/weebsearch_login.jpg");
    background-repeat: no-repeat;
    background-position: 80% 20%;
    background-size: cover;
  }
</style>
