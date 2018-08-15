<!-- 顶层容器组件 -->

<template>
    <div class="blog-container">
        <Aside></Aside>
        <MainSection></MainSection>
    </div>
</template>

<script>
    import Aside from './Aside.vue'
    import MainSection from './MainSection.vue'

    export default {
        name: 'BlogContainer',
        components: {
            Aside,
            MainSection
        }
    }
</script>

<style>
    .blog-container {
        position: relative;
        padding-left: 300px;
        height: 100%;
        background-color: #e0e0e0;
        overflow: hidden;
    }
</style>