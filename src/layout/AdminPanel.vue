<template>
    <v-app id="inspire" dark>
        <v-navigation-drawer v-model="drawer" fixed clipped app>
            <v-list dense>
                <v-list-tile v-for="item in computedItems" :key="item.text" :to="item.path">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="red" dense fixed clipped-left app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="mr-5 align-center">
                <span class="title">Sopnopriyo</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn color="red" @click="performLogout()">Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </v-content>
    </v-app>
</template>

<style lang="scss">
</style>
<script>
export default {
    data: () => ({
        drawer: true,
        menuItems: [
            { icon: 'fas fa-tachometer-alt', path: 'dashboard', text: 'Dashboard' },
            { icon: 'fab fa-blogger', path: 'manageblog', text: 'Blog' },
		],
		adminMenus: [
 			{ icon: 'fas fa-user', path: 'manageuser', text: 'Users' },
            { icon: 'fas fa-archive', path: 'manageportfolio', text: 'Portfolio' },
			{ icon: 'fas fa-envelope', path: 'viewmessage', text: 'Message' },
			{ icon: 'far fa-laptop-code', path: 'apidefination', text: 'API Specification' }
		]
	}),
	computed: {
		computedItems() {
			let authUser = this.$store.getters.authUser;
			var isAdmin = false;
			
			var allMenus = []; 
			if (authUser) {
				if(authUser.authorities.includes('ROLE_ADMIN')) {
					allMenus = this.menuItems.concat(this.adminMenus)
				} else {
					allMenus = this.menuItems;
				}
			}
			return allMenus;
		}
	},
	methods: {
		performLogout() {
			this.$store
            .dispatch('destroyToken')
            .then(response => {
                this.$router.push({ name: 'home' });
            });
		}
	}
};
</script>