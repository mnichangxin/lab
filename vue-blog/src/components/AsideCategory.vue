<!-- 左侧边栏组件-分类列表 -->

<template>
    <ul class="aside-category">
        <li class="aside-category-item" v-for="(item, index) in category" v-bind:key="index">{{ item }}</li>
    </ul>
</template>

<script>
    export default {
        name: 'AsideCategory',
        data() {
            return {
                category: [
                    '主页',
                    '前端',
                    '后端',
                    '算法'
                ]
            }
        }
    }
</script> 

<style>
    .aside-category {
        margin-top: 30px;
    }
    .aside-category-item {
        padding: 5px 0;
        text-align: center;
        cursor: pointer;
    }
</style>