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
                    'Android',
                    'IOS',
                    '算法'
                ]
            }
        }
    }
</script> 

<style>
    .aside-category {
        margin-top: 30px;
        padding: 5px 0;
        border: 5px solid #444; 
    }
    .aside-category-item {
        padding: 5px 0;
        color: #444;
        text-align: center;
        cursor: pointer;
    }
    .aside-category-item:hover {
        color: #ffffff;
        background-color: #444;
        transition: .2s ease;
    }
</style>