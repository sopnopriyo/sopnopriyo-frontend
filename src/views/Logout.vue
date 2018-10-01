<template>
	<div>
	</div>
</template>

<script>
export default {
    created() {
        return this.$store
            .dispatch('destroyToken')
            .then(response => {
                this.$router.push({ name: 'home' });
            });
    }
};
</script>