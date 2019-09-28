<template>
  <div class="login">
    <h1>Login</h1>
    <p v-if="authError">Authentication Failed !</p>
    <form @submit.prevent="performlogin()">
      <input
        type="text"
        v-model="fields.username.value"
        name="u"
        placeholder="Username"
        required="required"
      />
      <input
        type="password"
        v-model="fields.password.value"
        name="p"
        placeholder="Password"
        required="required"
      />
      <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 42%;
  margin: -150px 0 0 -150px;
  background: #e6e8eb;

  @include sm {
    left: 36%;
  }
}
.login h1 {
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-align: center;
}
.login p {
  text-align: center;
  color: red;
}

form {
  padding: 20px;
  border-radius: 5px;
}

input {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;

  border: none;
  outline: none;
  padding: 10px;
  font-size: 13px;

  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.2);
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
}
input:focus {
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4),
    0 1px 1px rgba(255, 255, 255, 0.2);
}
.btn {
  background: #b5cd60;
  border: 0;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
.btn:hover {
  background: #16aa56;
}
</style>
<script>
export default {
  data: () => {
    return {
      fields: {
        username: {
          value: "",
          rules: [v => !!v || "Username is required"]
        },
        password: {
          value: "",
          rules: [v => !!v || "Password is required"]
        }
      },
      authError: false
    };
  },
  created() {},
  methods: {
    performlogin() {
      this.$store
        .dispatch("auth/setAuth", {
          username: this.fields.username.value,
          password: this.fields.password.value
        })
        .then(response => {
          window.location.replace("/admin/dashboard");
        })
        .catch(error => {
          this.authError = true;
        });
    }
  }
};
</script>


