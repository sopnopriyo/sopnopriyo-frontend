<template>
  <section class="form-box">
    <h1>Contact Me</h1>
    <form @submit="save()">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="contact.name" class="form-control" id="name" type="text" name="Name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="contact.email" class="form-control" id="email" type="email" name="Email" />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="contact.message" class="form-control" id="message" name="Message"></textarea>
      </div>
      <input class="btn btn-primary" type="submit" value="Submit" />
    </form>
  </section>
</template>
<style lang="scss" scoped>
.form-box {
  max-width: 500px;
  margin: auto;
  padding: 50px;
  background: #ffffff;
  border: 10px solid #f2f2f2;
}

h1,
p {
  text-align: center;
}

input,
textarea {
  width: 100%;
}
</style>
<script>
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PROD_API;

export default {
  head: {
    title: "Sopnopriyo - let's get in touch",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Need anything built, want to work together or simply want to have a chat? Drop me an e-mail at sopnopriyo@gmail.com or simply fill out the form below and I will reply to you soon!"
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Sopnopriyo - let's get in touch"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Need anything built, want to work together or simply want to have a chat? Drop me an e-mail at sopnopriyo@gmail.com or simply fill out the form below and I will reply to you soon!"
      },
      { hid: "og:type", name: "og:type", content: "website" },
      {
        hid: "og:url",
        name: "og:url",
        content: "https://sopnopriyo.com/contact"
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://sopnopriyo.com/img/opengraph/home.jpg"
      }
    ]
  },
  data: () => ({
    valid: false,
    alert: {
      show: false,
      type: "success",
      message: ""
    },
    contact: {
      name: "",
      email: "",
      message: "",
      date: new Date().toISOString()
    },
    nameRules: [v => !!v || "Name is required"],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    messageRules: [v => !!v || "Body is required"]
  }),
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        axios
          .post("/messages", this.contact)
          .then(response => {
            this.alert.show = true;
            this.alert.type = "success";
            this.alert.message = "Your message has been sent successfully !";
            this.$refs.form.reset();
          })
          .catch(err => {
            this.alert.show = true;
            this.alert.type = "error";
            this.alert.message =
              "Sorry, an error has been encountered while sending your message.";
            this.$refs.form.reset();
          });
      }
    }
  }
};
</script>


