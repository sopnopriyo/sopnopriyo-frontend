<template>
  <v-layout column>
    <header class="jumbotron text-center">
      <div class="header-content">
        <h1
          class="headline font-weight-small mb-4"
        >Currently delivering digital transformation powered by creativity at Isobar Singapore.</h1>
      </div>
    </header>
    <v-container>
      <div class="row align-items-center">
        <div class="col-md-3 col-sm-12 col-xs-12">
          <v-img src="img/shahin.jpg" aspect-ratio="1" class="home-shahin-image"></v-img>
        </div>
        <div class="col-md-9 col-sm-12 col-xs-12 home-text-body">
          I'm a young Software Engineer specialized in complete life cycle of Web Development.
          I've received a Bachelor degree with distinction in Software Engineering from University of Malaya, Malaysia in 2018.
          Currently, I'm working as a Software Engineer at Isobar Singapore. Here I'm involved in plan, design, implement and deploying robust web application.
          During my career of {{inYears}} year and {{inMonths}} month, I have worked on quite a number of projects using a lot of cutting edge technologies but my favorite stack right now is Vue.js on the frontend and Spring Boot on the backend.
          I have always been studying to improve my skills, reading books and press about the new development trends and best practices.
          I learn fast, I'm an excellent teammate and problem solver. I like to learn from my teammates and also to help them to grow whenever I can.
        </div>
      </div>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-timeline align-top>
            <v-timeline-item
              v-for="(timeline, i) in timelines"
              :color="timeline.color"
              :icon="timeline.icon"
              :key="i"
              fill-dot
            >
              <v-card :color="timeline.color" dark>
                <v-card-title class="subheading">
                  {{timeline.organization}} &nbsp;
                  <span class="caption">{{timeline.year}}</span>
                </v-card-title>
                <v-card-text class="white text--primary">
                  <p>{{timeline.description}}</p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-text-body {
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  text-align: justify;
  text-justify: inter-word;
}
</style>
<script>
export default {
  head: {
    title:
      "Sopnopriyo - Currently delivering digital transformation powered by creativity at Isobar Singapore.",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
      },
      {
        hid: "og:title",
        name: "og:title",
        content:
          "Sopnopriyo - Currently delivering digital transformation powered by creativity at Isobar Singapore."
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
      },
      { hid: "og:type", name: "og:type", content: "website" },
      { name: "og:url", content: "https://sopnopriyo.com/" },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://sopnopriyo.com/img/opengraph/home.jpg"
      }
    ]
  },
  data: () => {
    return {
      d1: new Date(2017, 9, 1),
      d2: new Date(),
      timelines: [
        {
          organization: "Isobar, Singapore",
          year: "2019.06 - Present",
          description:
            "Delivering digital transformation, powered by creativity. Isober helps its clients to solve complex business challenges through digital marketing, ecosystems and products, driving digital strength and brand loyalty. Isobar clients include Coca-Cola, adidas, Enterprise, P&G, Philips and Huawei.",
          color: "red lighten-1",
          icon: "fas fa-briefcase"
        },
        {
          organization: "Uilicious Pte. Ltd, Singapore",
          year: "2018.01 - 2019.05",
          description:
            "Working as a Software Engineer. Since it's a start up , I'm doing everything including building Web Services and implementing responsive Web UI, testing the software and providing technical support to its clients.",
          color: "red lighten-1",
          icon: "fas fa-briefcase"
        },
        {
          organization: "University of Malaya, Malaysia",
          year: "2014.09 - 2018.02",
          description:
            "I've studied Bachelor degree in Software Engineering and passed with honours with distniction.",
          color: "purple darken-1",
          icon: "fas fa-graduation-cap"
        },
        {
          organization: "Hilti Asia IT Services, Malaysia",
          year: "2016.08 - 01.2017",
          description:
            "Worked as a Software Developer intern. I was involved in plan, design, build and test Web Services by following the standard microservice architecture",
          color: "red lighten-2",
          icon: "fas fa-briefcase"
        },
        {
          organization: "University of Malaya, Malaysia",
          year: "2016.02 - 2016.07",
          description:
            "Taught students how to implement different data structures, for example, Stack, Queue, LinkedList, Searching and Sorting Techniques , Binary Search Tree and so on.",
          color: "indigo lighten-1",
          icon: "fas fa-chalkboard-teacher"
        },
        {
          organization: "Fusionex International, Malaysia",
          year: "2015.07 - 2015.10",
          description:
            "Worked as a Software Developer intern. My responsibility was to design and develop customer facing website and reusable plugins.",
          color: "red lighten-2",
          icon: "fas fa-briefcase"
        },
        {
          organization:
            "Birshreshtha Munshi Abdur Rouf Public College, Bangladesh",
          year: "2011 - 2013",
          description:
            "I've passed Higher Secondary School major in Science and secured GPA 5.00 out of 5.00 in the HSC public examination",
          color: "indigo",
          icon: "fas fa-school"
        },
        {
          organization: "Gangni Pilot High School, Bangladesh",
          year: "2009 - 2011",
          description:
            "I've passed Secondary School major in Science and secured GPA 5.00 out of 5.00 in the SSC public examination",
          color: "indigo lighten-1",
          icon: "fas fa-school"
        }
      ]
    };
  },
  computed: {
    inMonths() {
      var d1Y = this.d1.getFullYear();
      var d2Y = this.d2.getFullYear();
      var d1M = this.d1.getMonth();
      var d2M = this.d2.getMonth();

      var inMonths = d2M + 12 * d2Y - (d1M + 12 * d1Y);

      if (inMonths >= 12) {
        inMonths = inMonths % 12;
      }
      return inMonths;
    },

    inYears() {
      return this.d2.getFullYear() - this.d1.getFullYear();
    }
  }
};
</script>
