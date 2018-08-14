<!-- 左侧边栏组件 -->

<template>
    <div class="aside">
        <AsideTop></AsideTop>
        <AsideBottom></AsideBottom>
    </div>
</template>

<script>
    import AsideTop from './AsideTop.vue'
    import AsideBottom from './AsideBottom.vue'

    export default {
        name: 'Aside',
        components: {
            AsideTop,
            AsideBottom
        }
    }
</script> 

<style>
    .aside {
        width: 300px;
        height: 100%;
        box-shadow: 1px 5px 0 #ccc;
    }
</style>