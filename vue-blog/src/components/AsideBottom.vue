<!-- 左侧边栏组件-下部分 -->

<template>
    <div class="aside-bottom">
        <AsideText></AsideText>
        <AsideCategory></AsideCategory>
        <AsideLink></AsideLink>
    </div>
</template>

<script>
    import AsideText from './AsideText.vue'
    import AsideCategory from './AsideCategory.vue'
    import AsideLink from './AsideLink.vue'

    export default {
        name: 'AsideBottom',
        components: {
            AsideText,
            AsideCategory,
            AsideLink
        }
    }
</script> 

<style>
    .aside-bottom {
        padding: 100px 40px 20px;
    }
</style>