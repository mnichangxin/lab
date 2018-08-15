<!-- 右侧主展示组件 -->

<template>
    <div class="main-section">
        <ArticleList></ArticleList>
        <Footer></Footer>
    </div>
</template>

<script>
    import ArticleList from './ArticleList.vue'
    import Footer from './Footer.vue'

    export default {
        name: 'MainSection',
        components: {
            ArticleList,
            Footer
        }
    }
</script>

<style>
    .main-section {
        padding: 30px;
        height: 100%;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
        overflow-y: scroll;
    }
</style>