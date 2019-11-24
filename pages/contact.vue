<template>
  <div class="container">
    <div class="row align-items-center justify-content-center">
      <section class="col-xs-12 col-md-6 contact-form">
        <h1>Contact Me</h1>
        <form @submit="save()">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="contact.name" class="form-control" id="name" type="text" name="Name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="contact.email"
              class="form-control"
              id="email"
              type="email"
              name="Email"
            />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea v-model="contact.message" class="form-control" id="message" name="Message"></textarea>
          </div>
          <div class="form-group">
            <input class="btn btn-primary" type="submit" value="Send" />
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.row {
  height: 80vh;
}

.contact-form {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
<script>
import axios from "axios";

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


