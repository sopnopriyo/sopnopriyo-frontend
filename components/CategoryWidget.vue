<template>
    <div class="card my-4">
        <h5 class="card-header">Categories</h5>
        <div class="card-body">
        <div class="row">
            <div class="col-lg-6">
                <ul class="list-unstyled mb-0">
                    <li v-for="(item, index) in itemFirstHalf" :key="index">
                        <nuxt-link :to="'/blog/category/'+item">{{item}}</nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="col-lg-6">
                <ul class="list-unstyled mb-0">
                    <li v-for="(item, index) in itemSecondHalf" :key="index">
                        <nuxt-link :to="'/blog/category/'+item">{{item}}</nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
    computed: {
        itemFirstHalf() {
            let yourArray = this.$store.state.header.blogMenuItems;
            let halfWayThough = Math.floor(yourArray.length / 2)
            return yourArray.slice(0, halfWayThough);
        },
        itemSecondHalf() {
            let yourArray = this.$store.state.header.blogMenuItems;
            let halfWayThough = Math.floor(yourArray.length / 2)
            return yourArray.slice(halfWayThough, yourArray.length);
        },
    },
}
</script>