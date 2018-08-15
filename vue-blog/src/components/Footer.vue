<!-- 页脚组件 -->

<template>
    <footer class="footer">
        本站由&nbsp;<a href=".">浮生若梦</a>&nbsp;纯手工打造；
        由&nbsp;<a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>&nbsp;引擎强力驱动.
    </footer>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style>
    .footer {
        margin-top: 25px;
        padding-top: 20px;
        text-align: center;
        font-size: 16px;
    }
    .footer a {
        color: #1296db;
    }
</style>