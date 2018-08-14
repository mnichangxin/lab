<!-- 左侧边栏组件-昵称&个性签名 -->

<template>
    <ul class="aside-text">
        <p class="nickname">浮生若梦</p>
        <p class="feature">浮生若梦，稍纵即逝......</p>
    </ul>
</template>

<script>
    export default {
        name: 'AsideText'
    }
</script> 

<style>
    .nickname, .feature {
        font-family: 'Courier New', Courier, monospace;
        text-align: center;
    }
    .nickname {
        font-weight: bold;
        font-size: 20px;
    }
    .feature {
        margin-top: 15px;
        font-size: 14px;
        color: #888888;
    }
</style>