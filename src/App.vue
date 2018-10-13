<template>
	<frontend v-if="!loggedIn"></frontend>
  <admin-panel v-else></admin-panel>
</template>
<style lang="scss">
</style>
<script>
import Frontend from "./layout/Frontend"
import AdminPanel from "./layout/AdminPanel"
export default {
    data: () => ({
        drawer: true,
        items: [{
                icon: 'fas fa-tachometer-alt',
                path: 'dashboard',
                text: 'Dashboard'
            },
            {
                icon: 'fas fa-user',
                path: 'manageuser',
                text: 'Users'
            },
            {
                icon: 'fab fa-blogger',
                path: 'manageblog',
                text: 'Blog'
            },
            {
                icon: 'fas fa-archive',
                path: 'manageportfolio',
                text: 'Portfolio'
            },
            {
                icon: 'fas fa-envelope',
                path: 'managecontact',
                text: 'Message'
            }
        ]
    }),
    props: {
        source: String
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    },
    created: () => {
        document.title = "Sopnopriyo"
    },
    components: {
        Frontend,
        AdminPanel
    }
};
</script>