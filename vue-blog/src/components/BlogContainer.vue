<template>
    <div class="blog-container">
        <Navigation></Navigation>
        <aside-left></aside-left>
        <aside-right></aside-right>
    </div>
</template>

<script>
    import Navigation from './Navigation.vue'
    import AsideLeft from './AsideLeft.vue'
    import AsideRight from './AsideRight.vue'

    export default {
        name: 'BlogContainer'
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>