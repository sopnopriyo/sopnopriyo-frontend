(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{413:function(t,e,o){var content=o(456);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(13).default)("b1c4bf04",content,!0,{sourceMap:!1})},455:function(t,e,o){"use strict";var n=o(413);o.n(n).a},456:function(t,e,o){(t.exports=o(12)(!1)).push([t.i,".form-box[data-v-0a34db0c]{max-width:500px;margin:auto;padding:50px;background:#fff;border:10px solid #f2f2f2}h1[data-v-0a34db0c],p[data-v-0a34db0c]{text-align:center}input[data-v-0a34db0c],textarea[data-v-0a34db0c]{width:100%}",""])},525:function(t,e,o){"use strict";o.r(e);var n=o(15),r=o.n(n),c={head:{title:"Sopnopriyo - let's get in touch",meta:[{hid:"description",name:"description",content:"Need anything built, want to work together or simply want to have a chat? Drop me an e-mail at sopnopriyo@gmail.com or simply fill out the form below and I will reply to you soon!"},{hid:"og:title",name:"og:title",content:"Sopnopriyo - let's get in touch"},{hid:"og:description",name:"og:description",content:"Need anything built, want to work together or simply want to have a chat? Drop me an e-mail at sopnopriyo@gmail.com or simply fill out the form below and I will reply to you soon!"},{hid:"og:type",name:"og:type",content:"website"},{hid:"og:url",name:"og:url",content:"https://sopnopriyo.com/contact"},{hid:"og:image",name:"og:image",content:"https://sopnopriyo.com/img/opengraph/home.jpg"}]},data:function(){return{valid:!1,alert:{show:!1,type:"success",message:""},contact:{name:"",email:"",message:"",date:(new Date).toISOString()},nameRules:[function(t){return!!t||"Name is required"}],emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+/.test(t)||"E-mail must be valid"}],messageRules:[function(t){return!!t||"Body is required"}]}},methods:{save:function(){var t=this;this.$refs.form.validate()&&r.a.post("/messages",this.contact).then((function(e){t.alert.show=!0,t.alert.type="success",t.alert.message="Your message has been sent successfully !",t.$refs.form.reset()})).catch((function(e){t.alert.show=!0,t.alert.type="error",t.alert.message="Sorry, an error has been encountered while sending your message.",t.$refs.form.reset()}))}}},m=(o(455),o(41)),component=Object(m.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"form-box"},[o("h1",[t._v("Contact Me")]),t._v(" "),o("form",{on:{submit:function(e){return t.save()}}},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.contact.name,expression:"contact.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",name:"Name"},domProps:{value:t.contact.name},on:{input:function(e){e.target.composing||t.$set(t.contact,"name",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.contact.email,expression:"contact.email"}],staticClass:"form-control",attrs:{id:"email",type:"email",name:"Email"},domProps:{value:t.contact.email},on:{input:function(e){e.target.composing||t.$set(t.contact,"email",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"message"}},[t._v("Message")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.contact.message,expression:"contact.message"}],staticClass:"form-control",attrs:{id:"message",name:"Message"},domProps:{value:t.contact.message},on:{input:function(e){e.target.composing||t.$set(t.contact,"message",e.target.value)}}})]),t._v(" "),o("input",{staticClass:"btn btn-primary",attrs:{type:"submit",value:"Submit"}})])])}),[],!1,null,"0a34db0c",null);e.default=component.exports}}]);