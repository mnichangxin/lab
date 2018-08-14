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
        float: left;
        width: 300px;
        height: 100%;
        box-shadow: 0px 8px 0 #e6e6e6fd;
        background-color: #fff;
    }
</style>