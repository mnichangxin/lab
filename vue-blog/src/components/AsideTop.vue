<!-- 左侧边栏组件-上部分 -->

<template>
    <div class="aside-top">
        <div class="avatar">
            <img src="" class="avatar-img"/>    
        </div> 
    </div>
</template>

<script>
    export default {
        name: 'AsideTop'
    }
</script> 

<style>
    .aside-top {
        position: relative;
        height: 25%;
        background-color: #444444;
    }
    .avatar {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 100px;
        height: 100px;
        transform: translate(-50%, 50%);
        border: 1px solid #ccc;
        border-radius: 50%;
    }
    .avatar-img {
        width: 100%;
        height: 100%;
    }
</style>