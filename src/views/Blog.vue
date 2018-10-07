<template>
    <v-container class="mt-5">
        <v-flex xs12>
            <v-layout row class="mt-3">
                <v-flex xs12>
                    <v-card flat v-for="post in posts" :key="post.id" class="grey--text text--darken-2">
                        <span style="font-size:32px;" class="mt-3">{{ post.title }}</span>
                        <div class="mt-3">
                            <span style="color:grey"> Created on </span>
                            <strong>01.02.2018</strong>
                        </div>
                        <v-img :src="post.image" height="400px" class="mt-3"></v-img>
                        <v-card-text style="font-size:16px;">{{ post.description }}</v-card-text>
                        <v-card-actions class="mb-3">
                            <v-btn :href="post.link" flat style="color:#5277AC;">READ MORE</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-container>
</template>
<script>
export default {
	data: () =>{
		return {
			posts: [
				{
					id: "001",
					title: "Asynchronous programming in Java 8",
					image: "https://arpitprod.github.io/Vuetify-Blog-Template/public/Blog_pic2.jpg",
					description: `To be honest, understanding the flow of asynchronous programming in Java 8 took me a bit longer. Usually people call me a fast learner but the reason why it took me longer to understand the asynchronous programming in Java 8 is because I did not find the appropriate resource to learn it from. Well, the official documenation from Oracle is there but that is too brief. The heart of java Asynchronous programming is CompletetableFuture and CompletionStage . So they have almost 59 methods which are used depending on the situation and as a beginner someone needs to understand which one to use when and how to design the chain. So, I found the following resources very helpful `,
					link: ""
				},
				{
					id:"002",
					title: "Asynchronous programming in Java 8",
					image: "https://arpitprod.github.io/Vuetify-Blog-Template/public/Blog_pic2.jpg",
					description: `To be honest, understanding the flow of asynchronous programming in Java 8 took me a bit longer. Usually people call me a fast learner but the reason why it took me longer to understand the asynchronous programming in Java 8 is because I did not find the appropriate resource to learn it from. Well, the official documenation from Oracle is there but that is too brief. The heart of java Asynchronous programming is CompletetableFuture and CompletionStage . So they have almost 59 methods which are used depending on the situation and as a beginner someone needs to understand which one to use when and how to design the chain. So, I found the following resources very helpful `,
					link: ""
				},
			]
		}
	}
}
</script>

