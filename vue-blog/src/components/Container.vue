<!-- 顶层容器组件 -->

<template>
    <div class="blog-container">
        <Aside></Aside>
        <Article></Article>
    </div>
</template>

<script>
    import Aside from './Aside.vue'
    import Article from './Article.vue'

    export default {
        name: 'BlogContainer',
        components: {
            Aside,
            Article
        }
    }
</script>

<style>
    .blog-container {
        height: 100%;
        background-color: #e0e0e0;
    }
</style>