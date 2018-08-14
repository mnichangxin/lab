<!-- 左侧边栏组件-上部分 -->

<template>
    <div class="aside-top">
        <div class="avatar">
            <img v-bind:src="src_avatar" class="avatar-img" />    
        </div> 
    </div>
</template>

<script>
    import src_avatar from '../assets/icon/head.png'

    export default {
        name: 'AsideTop',
        data() {
            return {
                src_avatar: src_avatar
            }
        }
    }
</script> 

<style>
    @keyframes rotation{
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .aside-top {
        position: relative;
        z-index: 0;
        height: 25%;
        background-color: #444444;
    }
    .avatar {
        position: absolute;
        z-index: 100;
        left: 50%;
        bottom: 0;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-bottom: -50px;
        border-radius: 50%;
        
    }
    .avatar:hover {
        animation: rotation 2s linear infinite;
    }
    .avatar-img {
        width: 100%;
        height: 100%;
    }
</style>